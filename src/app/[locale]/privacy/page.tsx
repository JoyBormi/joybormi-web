import { setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { LegalPage } from "@/views/legal/legal-page"

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  return <LegalPage type="PRIVACY" locale={locale as Locale} />
}
