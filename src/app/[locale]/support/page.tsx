import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { appConfig } from "@/config/app.config"
import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"
import { SupportView } from "@/views/support/support.view"

type SupportPageProps = {
  params: Promise<{ locale: string }>
}

type FaqItem = {
  question: string
  answer: string
}

export async function generateMetadata({ params }: SupportPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const keywords = t.raw("meta.support.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/support",
    title: t("meta.support.title"),
    description: t("meta.support.description"),
    keywords,
  })
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.support" })
  const faqItems = t.raw("faq.items") as FaqItem[]
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: appConfig.app.name,
      url: appConfig.app.urls.site,
      email: appConfig.app.email,
      telephone: appConfig.app.phone[0],
      sameAs: [appConfig.app.urls.telegram, appConfig.app.social.instagram],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: appConfig.app.email,
          telephone: appConfig.app.phone[0],
          url: appConfig.app.urls.telegram,
          availableLanguage: ["en", "ru", "uz"],
        },
      ],
    },
    subjectOf: faqItems.map((item) => ({
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
      <SupportView locale={locale as Locale} />
    </>
  )
}
