// lib/seo.ts
import type { Metadata } from "next"
import { defaultLocale, Locale, locales } from "@/i18n/config"

const SITE_URL = "https://joybormiapp.uz"

const HREFLANG: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
  uz: "uz-UZ",
}

const APP_NAME: Record<Locale, string> = {
  ru: "JoyBormi",
  en: "JoyBormi",
  uz: "JoyBormi",
}

const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  ru: "JoyBormi — сервис онлайн-бронирования ресторанов, кафе, салонов и других заведений. Быстро находите и резервируйте лучшие места.",
  en: "JoyBormi is an online booking platform for restaurants, cafés, salons and more. Discover and reserve the best places instantly.",
  uz: "JoyBormi — restoranlar, kafelar, salonlar va boshqa joylarni onlayn bron qilish platformasi. Eng yaxshi joylarni tez toping va band qiling.",
}

const DEFAULT_KEYWORDS: Record<Locale, string[]> = {
  ru: ["онлайн бронирование", "бронь ресторанов", "кафе бронь", "резерв столика", "JoyBormi"],
  en: ["online booking", "restaurant reservation", "table reservation", "booking platform", "JoyBormi"],
  uz: ["online bron qilish", "restoran bron", "stol bron qilish", "joy band qilish", "JoyBormi"],
}

const TWITTER_HANDLE = "@joybormi"
const AUTHOR = "JoyBormi"
const ORGANIZATION_NAME = "JoyBormi"

function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`
}

export function meta(opts: {
  locale: Locale | string
  pathname: string
  title: string
  description?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
  canonicalOverride?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const {
    locale,
    pathname,
    title,
    description,
    image,
    keywords,
    noIndex = false,
    canonicalOverride,
    type = "website",
    publishedTime,
    modifiedTime,
  } = opts

  const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale

  const canonicalPath = canonicalOverride ? abs(canonicalOverride) : abs(`/${resolvedLocale}${pathname}`)

  const fullTitle = `${title} | ${APP_NAME[resolvedLocale]}`

  const desc = description ?? DEFAULT_DESCRIPTION[resolvedLocale]

  const baseKeywords = DEFAULT_KEYWORDS[resolvedLocale] ?? []
  const allKeywords = Array.from(new Set([...baseKeywords, ...(keywords ?? [])]))

  const ogImage = image ? abs(image) : abs("/og-image.png")

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: fullTitle,
    description: desc,
    keywords: allKeywords,

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    publisher: ORGANIZATION_NAME,

    alternates: {
      canonical: canonicalPath,
      languages: {
        "ru-RU": abs(`/ru${pathname}`),
        "en-US": abs(`/en${pathname}`),
        "uz-UZ": abs(`/uz${pathname}`),
        "x-default": abs(`/en${pathname}`),
      },
    },

    openGraph: {
      type,
      title: fullTitle,
      description: desc,
      siteName: APP_NAME[resolvedLocale],
      url: canonicalPath,
      locale: HREFLANG[resolvedLocale],
      alternateLocale: Object.values(HREFLANG).filter((lang) => lang !== HREFLANG[resolvedLocale]),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },

    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : undefined,

    other: {
      "theme-color": "#ffffff",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  }

  return metadata
}
