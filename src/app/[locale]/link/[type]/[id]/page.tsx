import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { routing } from "@/i18n/routing"

const SITE_URL = "https://joybormiapp.uz"
const APP_SCHEME = "joy-bormi-app://"
const FALLBACK_URL = `${SITE_URL}/`

const SUPPORTED_LINK_TYPES = ["brand", "worker"] as const

type LinkType = (typeof SUPPORTED_LINK_TYPES)[number]
type QueryValue = string | string[] | undefined

type LinkPageParams = {
  locale: string
  type: string
  id: string
}

interface LinkMetadataProps {
  params: Promise<LinkPageParams>
  searchParams: Promise<Record<string, QueryValue>>
}

interface LinkPageProps {
  params: Promise<LinkPageParams>
}

function isLinkType(value: string): value is LinkType {
  return SUPPORTED_LINK_TYPES.includes(value as LinkType)
}

function firstQueryValue(value: QueryValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? ""
  }

  return value ?? ""
}

function safeDecode(value: QueryValue): string {
  const raw = firstQueryValue(value)

  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString()
}

function normalizeId(id: string) {
  try {
    return encodeURIComponent(decodeURIComponent(id))
  } catch {
    return encodeURIComponent(id)
  }
}

function buildAppUrl(type: LinkType, id: string) {
  return `${APP_SCHEME}link/${type}/${normalizeId(id)}`
}

function resolveImageUrl(value: string) {
  if (!value) {
    return undefined
  }

  try {
    const parsed = new URL(value, SITE_URL)
    const isHttp = parsed.protocol === "http:" || parsed.protocol === "https:"

    return isHttp ? parsed.toString() : undefined
  } catch {
    return undefined
  }
}

function translateOrFallback(t: Awaited<ReturnType<typeof getTranslations>>, key: string, fallback: string) {
  try {
    return t(key)
  } catch {
    return fallback
  }
}

export async function generateMetadata({ params, searchParams }: LinkMetadataProps): Promise<Metadata> {
  const { locale, type, id } = await params
  const query = await searchParams

  const safeLocale: Locale = hasLocale(routing.locales, locale) ? (locale as Locale) : routing.defaultLocale
  const t = await getTranslations({ locale: safeLocale })

  const safeType: LinkType = isLinkType(type) ? type : "brand"
  const defaultTitle =
    safeType === "brand"
      ? translateOrFallback(t, "link.metaTitleBrand", "JoyBormi brand")
      : translateOrFallback(t, "link.metaTitleWorker", "JoyBormi specialist")
  const title = safeDecode(query.title) || defaultTitle
  const subtitle = safeDecode(query.subtitle)
  const description =
    safeDecode(query.description) || subtitle || translateOrFallback(t, "link.metaDescription", "Open in JoyBormi")
  const image = resolveImageUrl(safeDecode(query.image))

  const shareUrl = toAbsoluteUrl(`/link/${safeType}/${normalizeId(id)}`)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: shareUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: shareUrl,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

const LinkForwardPage = async ({ params }: LinkPageProps) => {
  const { locale, type, id } = await params

  const safeLocale: Locale = hasLocale(routing.locales, locale) ? (locale as Locale) : routing.defaultLocale
  setRequestLocale(safeLocale)
  const t = await getTranslations({ locale: safeLocale })

  if (!isLinkType(type)) {
    notFound()
  }

  const appUrl = buildAppUrl(type, id)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-xl font-semibold">{translateOrFallback(t, "link.openingTitle", "Opening JoyBormi...")}</h1>
      <p className="text-sm text-neutral-600">
        {translateOrFallback(
          t,
          "link.openingDescription",
          "If the app did not open, continue with one of the links below."
        )}
      </p>
      <div className="mt-2 flex flex-col items-center gap-2">
        <a id="deep-link" href={appUrl} className="text-sm font-medium text-blue-600 underline">
          {translateOrFallback(t, "link.openInApp", "Open in app")}
        </a>
        <Link id="fallback-link" href={FALLBACK_URL} className="text-sm text-neutral-700 underline">
          {translateOrFallback(t, "link.openWebsite", "Open website")}
        </Link>
      </div>

      <Script id="deep-link-launch" strategy="afterInteractive">
        {`
            (function () {
              var deepLinkEl = document.getElementById("deep-link");
              var fallbackEl = document.getElementById("fallback-link");
              var deepLink = deepLinkEl && deepLinkEl.getAttribute("href");
              var fallback = fallbackEl && fallbackEl.getAttribute("href");

              if (!deepLink || !fallback) {
                return;
              }

              var start = Date.now();
              var didHide = false;

              function onVisibilityChange() {
                if (document.hidden) {
                  didHide = true;
                }
              }

              document.addEventListener("visibilitychange", onVisibilityChange, { once: true });

              window.location.replace(deepLink);

              setTimeout(function () {
                if (!didHide && Date.now() - start < 2200) {
                  window.location.replace(fallback);
                }
              }, 1200);
            })();
          `}
      </Script>
    </main>
  )
}

export default LinkForwardPage
