import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"
import { MarketingView } from "@/views/marketing/marketing.view"

type MarketingPageProps = {
  params: Promise<{ locale: string }>
}

type FaqItem = {
  question: string
  answer: string
}

export async function generateMetadata({ params }: MarketingPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const keywords = t.raw("meta.marketing.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/marketing",
    title: t("meta.marketing.title"),
    description: t("meta.marketing.description"),
    keywords,
  })
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.marketing" })
  const faqItems = t.raw("faq.items") as FaqItem[]
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqItems.map((item) => ({
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
      <MarketingView locale={locale as Locale} />
    </>
  )
}
