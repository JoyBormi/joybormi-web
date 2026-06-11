import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Footer } from "@/components/shared/footer"
import { Locale } from "@/i18n/config"
import { routing } from "@/i18n/routing"

import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema, meta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import RootProvider from "@/providers/root"
import { pretendard } from "../font"

import "@styles/globals.css"

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params
  const locale = hasLocale(routing.locales, params.locale) ? params.locale : routing.defaultLocale

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

export default async function RootLayout(props: LayoutProps) {
  const params = await props.params

  const { children } = props

  const locale = params.locale as Locale

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const organizationSchema = generateOrganizationSchema(locale)
  const websiteSchema = generateWebsiteSchema(locale)
  const localBusinessSchema = generateLocalBusinessSchema(locale)

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(pretendard.variable)}>
        <RootProvider locale={locale}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  )
}
