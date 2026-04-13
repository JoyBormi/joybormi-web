import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { routing } from "@/i18n/routing"
import {
  normalizeSharePart,
  resolveShareLinkType,
  SHARE_TYPE_SEGMENTS,
  type ShareLinkType,
} from "@/lib/share/public-link"
import { fetchSharePreview } from "@/lib/share/share-preview"

const SITE_URL = "https://joybormiapp.uz"
const APP_SCHEME = "joy-bormi-app://"
const FALLBACK_URL = `${SITE_URL}/`

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

function firstQueryValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? ""
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
  return normalizeSharePart(id)
}

function resolvePageType(type: string): ShareLinkType | null {
  return resolveShareLinkType(type)
}

function buildAppUrl(type: ShareLinkType, id: string) {
  return `${APP_SCHEME}link/${SHARE_TYPE_SEGMENTS[type]}/${normalizeId(id)}`
}

function resolveImageUrl(value: string) {
  if (!value) return undefined
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

  const safeType: ShareLinkType = resolvePageType(type) ?? "brand"
  const preview = await fetchSharePreview(safeType, id, safeLocale)

  const defaultTitleMap: Record<ShareLinkType, string> = {
    brand: translateOrFallback(t, "link.metaTitleBrand", "JoyBormi brand"),
    worker: translateOrFallback(t, "link.metaTitleWorker", "JoyBormi specialist"),
    service: translateOrFallback(t, "link.metaTitleService", "JoyBormi service"),
  }

  const fallbackTitle = safeDecode(query.title) || defaultTitleMap[safeType]
  const title = preview?.title || fallbackTitle
  const subtitle = preview?.subtitle || safeDecode(query.subtitle)
  const description =
    safeDecode(query.description) || subtitle || translateOrFallback(t, "link.metaDescription", "Open in JoyBormi")
  const image = preview?.image || resolveImageUrl(safeDecode(query.image))
  const shareUrl = toAbsoluteUrl(`/link/${SHARE_TYPE_SEGMENTS[safeType]}/${normalizeId(id)}`)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: shareUrl },
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
    robots: { index: false, follow: false },
  }
}

const LinkForwardPage = async ({ params }: LinkPageProps) => {
  const { locale, type, id } = await params

  const safeLocale: Locale = hasLocale(routing.locales, locale) ? (locale as Locale) : routing.defaultLocale
  setRequestLocale(safeLocale)
  const t = await getTranslations({ locale: safeLocale })

  const safeType = resolvePageType(type)
  if (!safeType) notFound()

  const preview = await fetchSharePreview(safeType, id, safeLocale)
  const appUrl = buildAppUrl(safeType, id)

  const typeLabel =
    safeType === "brand"
      ? translateOrFallback(t, "link.previewBrandLabel", "Brand")
      : safeType === "worker"
        ? translateOrFallback(t, "link.previewWorkerLabel", "Worker")
        : translateOrFallback(t, "link.previewServiceLabel", "Service")

  return (
    <main className="bg-background text-foreground mx-auto flex min-h-screen w-full max-w-sm flex-col items-center justify-center gap-10 px-6 py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {preview?.image ? (
            <Image
              src={preview.image}
              alt={preview.title}
              className="h-20 w-20 rounded-2xl object-cover ring-1 ring-black/10"
              width={80}
              height={80}
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-medium ring-1 ring-black/10">
              {preview?.title?.slice(0, 2).toUpperCase() ?? "JB"}
            </div>
          )}
          <span className="bg-primary text-primary-foreground absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest whitespace-nowrap uppercase">
            {typeLabel}
          </span>
        </div>
        <div className="mt-2 flex flex-col items-center gap-1">
          <h1 className="text-xl leading-snug font-semibold">
            {preview?.title || translateOrFallback(t, "link.openingTitle", "Opening JoyBormi...")}
          </h1>
          {preview?.subtitle && <p className="text-muted-foreground text-sm">{preview.subtitle}</p>}
        </div>
      </div>

      {/* CTA */}
      <div className="flex w-full flex-col items-center gap-3">
        <a
          id="deep-link"
          href={appUrl}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-semibold transition-colors"
        >
          {translateOrFallback(t, "link.openInApp", "Open in JoyBormi")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <Link
          id="fallback-link"
          href={FALLBACK_URL}
          className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
        >
          {translateOrFallback(t, "link.openWebsite", "Open website instead")}
        </Link>
      </div>

      <Script id="deep-link-launch" strategy="afterInteractive">
        {`
          (function () {
            var deepLinkEl = document.getElementById("deep-link");
            var fallbackEl = document.getElementById("fallback-link");
            var deepLink = deepLinkEl && deepLinkEl.getAttribute("href");
            var fallback = fallbackEl && fallbackEl.getAttribute("href");

            if (!deepLink || !fallback) return;

            var start = Date.now();
            var didHide = false;

            function onVisibilityChange() {
              if (document.hidden) didHide = true;
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
