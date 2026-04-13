import type { Metadata } from "next"
import { NextPage } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
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

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.searchSeo" })
  const seoFaqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HomeView />
    </>
  )
}

export default HomePage
