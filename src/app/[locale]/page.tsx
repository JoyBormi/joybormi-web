import type { Metadata } from "next"
import { NextPage } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { getFeaturedMarketPages } from "@/lib/market-pages"
import { meta } from "@/lib/seo"

import { HomeView } from "@/views/home"

interface MetadataParam {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataParam): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const keywords = t.raw("meta.home.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/",
    title: t("meta.home.title"),
    description: t("meta.home.description"),
    keywords,
  })
}

const HomePage: NextPage<{ params: Promise<{ locale: string }> }> = async ({ params }) => {
  const { locale } = await params
  const resolvedLocale = locale as Locale

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.searchSeo" })
  const seoFaqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>
  const seoLinks = getFeaturedMarketPages().map((item) => ({
    href: `/services/${item.city.slug}/${item.category.slug}`,
    title: t("popularLinkTitle", {
      category: item.category.name[resolvedLocale],
      city: item.city.name[resolvedLocale],
    }),
    description: t("popularLinkDescription", {
      category: item.category.name[resolvedLocale].toLowerCase(),
      city: item.city.name[resolvedLocale],
    }),
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: seoFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  // Can be used as SSR fetch
  // let initialChatHistory: ChatHistoryMessage[] = []
  // try {
  //   const cookieStore = await cookies()
  //   const chatSession = cookieStore.get(COOKIE_KEYS.CHAT_SESSION)

  //   if (chatSession?.value) {
  //     initialChatHistory = await chatService.getChatHistory(chatSession.value)
  //   }
  // } catch (error) {
  //   console.error("Failed to fetch chat history for SSR:", error)
  // }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HomeView seoLinks={seoLinks} seoFaqItems={seoFaqItems} />
    </>
  )
}

export default HomePage
