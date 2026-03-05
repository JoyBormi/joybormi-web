// lib/seo.ts
import type { Metadata } from "next"
import { Locale } from "@/i18n/config"

const SITE_URL = "https://joybormi.uz"

const HREFLANG: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
}

const APP_NAME: Record<Locale, string> = {
  ko: "엑스매치",
  en: "JoyBormi",
}

const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  ko: "엑스매치는 혁신적인 디지털 경험을 창조하는 크리에이티브 에이전시입니다. 웹 개발, 모바일 앱, UI/UX 디자인, 브랜드 전략을 통해 비즈니스 성장을 지원합니다.",
  en: "JoyBormi is a creative agency crafting innovative digital experiences. We specialize in web development, mobile apps, UI/UX design, and brand strategy to drive business growth.",
}

const DEFAULT_KEYWORDS: Record<Locale, string[]> = {
  ko: [
    "크리에이티브 에이전시",
    "웹 개발",
    "모바일 앱 개발",
    "UI/UX 디자인",
    "브랜드 전략",
    "디지털 마케팅",
    "웹사이트 제작",
    "앱 디자인",
    "디지털 에이전시",
    "엑스매치",
  ],
  en: [
    "creative agency",
    "web development",
    "mobile app development",
    "UI/UX design",
    "brand strategy",
    "digital marketing",
    "website design",
    "app design",
    "digital agency",
    "JoyBormi",
  ],
}

const TWITTER_HANDLE = "@joybormi"
const AUTHOR = "JoyBormi"
const ORGANIZATION_NAME = "JoyBormi"
const ORGANIZATION_LOGO = `${SITE_URL}/logo/logo_header_exmatch_black_mobile.png`

function abs(path: string) {
  return `${SITE_URL}${path}`
}
/**
 * Generate comprehensive SEO metadata for pages
 *
 * @param locale string "ko" | "en"
 * @param pathname string "/work/123"
 * @param title string "JoyBormi"
 * @param description string "JoyBormi – Creative agency. Design, development, brand experiences."
 * @param image string "https://joybormi.uz/og-image.png"
 * @param keywords string[] Additional keywords for this page
 * @param noIndex boolean false => means do show in search results, true => means do not show in search results
 * @param canonicalOverride string "https://joybormi.uz/ko/work/123" , means override the canonical path
 * @param type string "website" | "article" | "profile" - OpenGraph type
 * @param publishedTime string ISO date for articles
 * @param modifiedTime string ISO date for articles
 * @returns Metadata
 */
export function meta(opts: {
  locale: Locale
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
    noIndex,
    canonicalOverride,
    type = "website",
    publishedTime,
    modifiedTime,
  } = opts

  const canonicalPath = canonicalOverride ?? `/${locale}${pathname}`

  const fullTitle = `${title} | ${APP_NAME[locale]}`

  const desc = description ?? DEFAULT_DESCRIPTION[locale]

  const baseKeywords = DEFAULT_KEYWORDS[locale] ?? DEFAULT_KEYWORDS.en

  const allKeywords = [...baseKeywords, ...(keywords ?? [])]

  const ogImage = image ? (image.startsWith("http") ? image : abs(image)) : abs("/og-image.png")

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
        [HREFLANG.ko]: abs(`/ko${pathname}`),
        [HREFLANG.en]: abs(`/en${pathname}`),
        "x-default": abs(`/ko${pathname}`),
      },
    },

    openGraph: {
      type,
      title: fullTitle,
      description: desc,
      siteName: APP_NAME[locale],
      url: abs(canonicalPath),
      locale: HREFLANG[locale],
      alternateLocale: locale === "ko" ? [HREFLANG.en] : [HREFLANG.ko],
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

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // Add other verification codes as needed
    },

    other: {
      "theme-color": "#ffffff",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  }

  return metadata
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: ORGANIZATION_LOGO,
    description: DEFAULT_DESCRIPTION[locale],
    sameAs: [
      // Add your social media URLs here
      // "https://twitter.com/joybormi",
      // "https://www.linkedin.com/company/joybormi",
      // "https://www.instagram.com/joybormi",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Korean", "English"],
    },
  }
}

/**
 * Generate JSON-LD structured data for WebSite
 */
export function generateWebsiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME[locale],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION[locale],
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : abs(item.url),
    })),
  }
}

/**
 * Generate JSON-LD structured data for Article/BlogPosting
 */
export function generateArticleSchema(opts: {
  locale: Locale
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
  url: string
}) {
  const { locale, title, description, image, datePublished, dateModified, authorName, url } = opts

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : abs(image),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName ?? ORGANIZATION_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : abs(url),
    },
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  }
}

/**
 * Generate JSON-LD structured data for CreativeWork (Portfolio/Project)
 */
export function generateCreativeWorkSchema(opts: {
  locale: Locale
  name: string
  description: string
  image: string
  dateCreated: string
  url: string
  keywords?: string[]
}) {
  const { locale, name, description, image, dateCreated, url, keywords } = opts

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image: image.startsWith("http") ? image : abs(image),
    dateCreated,
    creator: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    url: url.startsWith("http") ? url : abs(url),
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
  }
}
