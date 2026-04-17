import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { defaultLocale, Locale, locales } from "@/i18n/config"

const SITE_URL = appConfig.app.urls.site
const SITE_URL_OBJ = new URL(SITE_URL)

const HREFLANG: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
}

const BRAND_NAME = appConfig.app.name
const LEGAL_NAME = appConfig.app.name
const BRAND_DOMAIN = "joybormiapp.uz"
const ORGANIZATION_NAME = appConfig.app.name
const TWITTER_HANDLE = "@joybormi"
const AUTHOR = appConfig.app.name
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`
const ORGANIZATION_LOGO = `${SITE_URL}/images/logo-transparent.png`

const CONTACT_EMAIL = appConfig.app.email
const CONTACT_PHONE = appConfig.app.phone[0]

const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  ru: "JoyBormi — сервис онлайн-бронирования ресторанов, кафе, салонов и других заведений в Узбекистане. Быстро находите и резервируйте лучшие места.",
  en: "JoyBormi is an online booking platform for restaurants, cafés, salons and more in Uzbekistan. Discover and reserve the best places instantly.",
  uz: "JoyBormi — O'zbekistonda restoranlar, kafelar, salonlar va boshqa joylarni onlayn bron qilish platformasi. Eng yaxshi joylarni tez toping va band qiling.",
}

const DEFAULT_KEYWORDS: Record<Locale, string[]> = {
  ru: ["онлайн бронирование", "бронь ресторанов", "кафе бронь", "резерв столика", "JoyBormi"],
  en: ["online booking", "restaurant reservation", "table reservation", "booking platform", "JoyBormi"],
  uz: ["online bron qilish", "restoran bron", "stol bron qilish", "joy band qilish", "JoyBormi"],
}

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "")
}

function abs(path: string) {
  return new URL(path, SITE_URL_OBJ).toString()
}

function resolveLocale(locale: Locale | string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}

function getAlternateLocales(locale: Locale, noIndex?: boolean) {
  if (noIndex) {
    return []
  }

  return Object.values(HREFLANG).filter((value) => value !== HREFLANG[locale])
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
  ogTitle?: string
  ogDescription?: string
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
    ogTitle,
    ogDescription,
  } = opts

  const resolvedLocale = resolveLocale(locale)
  const canonicalUrl = canonicalOverride ? (canonicalOverride.startsWith("http") ? canonicalOverride : abs(canonicalOverride)) : abs(pathname)
  const fullTitle = title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`
  const desc = description ?? DEFAULT_DESCRIPTION[resolvedLocale]
  const baseKeywords = DEFAULT_KEYWORDS[resolvedLocale] ?? []
  const allKeywords = Array.from(new Set([...baseKeywords, ...(keywords ?? [])]))
  const ogImage = image ? (image.startsWith("http") ? image : abs(image)) : DEFAULT_OG_IMAGE
  const articleMeta: Record<string, string> =
    type === "article" && publishedTime
      ? {
          "article:author": AUTHOR,
          "article:published_time": publishedTime,
          "article:modified_time": modifiedTime ?? publishedTime,
        }
      : {}

  return {
    metadataBase: SITE_URL_OBJ,
    applicationName: BRAND_NAME,
    title: fullTitle,
    description: desc,
    keywords: allKeywords,
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    publisher: ORGANIZATION_NAME,
    category: "Booking Services",
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? desc,
      siteName: ORGANIZATION_NAME,
      url: canonicalUrl,
      locale: HREFLANG[resolvedLocale],
      alternateLocale: getAlternateLocales(resolvedLocale, noIndex),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle ?? fullTitle,
          type: "image/png",
        },
      ],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [AUTHOR],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? desc,
      images: [ogImage],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    other: {
      "theme-color": "#ffffff",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=no",
      "og:image:alt": ogTitle ?? fullTitle,
      "geo.region": "UZ",
      "geo.placename": "Tashkent",
      ICBM: "41.2995, 69.2401",
      "hreflang-self": abs(pathname === "/" ? "/" : `/${trimSlashes(pathname)}`),
      ...articleMeta,
    },
  }
}

export function generateOrganizationSchema(locale: Locale | string) {
  const resolvedLocale = resolveLocale(locale)
  const localizedDescription = DEFAULT_DESCRIPTION[resolvedLocale]

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION_NAME,
    legalName: LEGAL_NAME,
    alternateName: [BRAND_DOMAIN, "JoyBormi"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION_LOGO,
    },
    image: DEFAULT_OG_IMAGE,
    description: localizedDescription,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: [...Object.values(appConfig.app.social)],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        availableLanguage: ["English", "Russian", "Uzbek"],
        areaServed: "UZ",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tashkent, Uzbekistan",
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
      postalCode: "100000",
      addressCountry: "UZ",
    },
    knowsLanguage: ["en", "ru", "uz"],
  }
}

export function generateWebsiteSchema(locale: Locale | string) {
  const resolvedLocale = resolveLocale(locale)

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    alternateName: [BRAND_DOMAIN, "JoyBormi"],
    description: DEFAULT_DESCRIPTION[resolvedLocale],
    inLanguage: HREFLANG[resolvedLocale],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  }
}

export function generateLocalBusinessSchema(locale: Locale | string) {
  const resolvedLocale = resolveLocale(locale)

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tashkent, Uzbekistan",
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
      postalCode: "100000",
      addressCountry: "UZ",
    },
    areaServed: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    serviceType: [
      "Online booking",
      "Restaurant reservation",
      "Salon booking",
      "Café reservation",
      "Table reservation",
    ],
    priceRange: "$$",
    description: DEFAULT_DESCRIPTION[resolvedLocale],
    sameAs: [...Object.values(appConfig.app.social)],
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema(opts: {
  locale: Locale | string
  url: string
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime: string
  keywords?: string[]
}) {
  const { locale, url, title, description, image, publishedTime, modifiedTime, keywords } = opts
  const resolvedLocale = resolveLocale(locale)
  const imageUrl = image ? (image.startsWith("http") ? image : abs(image)) : DEFAULT_OG_IMAGE

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: AUTHOR,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORGANIZATION_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_LOGO,
      },
    },
    articleSection: "Booking Articles",
    inLanguage: HREFLANG[resolvedLocale],
    keywords: keywords?.filter(Boolean).join(", "),
    url,
  }
}
