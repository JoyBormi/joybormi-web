import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { routing } from "@/i18n/routing"

import { meta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import RootProvider from "@/providers/root"
import { pretendard } from "../font"

import "@styles/globals.css"

type LayoutProps = {
  children: React.ReactNode
  params: { locale: string }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
  colorScheme: "light",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const locale = params.locale as Locale

  const t = await getTranslations({ locale })

  const keywords = t.raw("meta.keywords") as string[]

  return meta({
    locale,
    pathname: "/",
    title: t("meta.title"),
    description: t("meta.description"),
    keywords,
  })
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = params.locale as Locale

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(pretendard.variable)}>
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  )
}
