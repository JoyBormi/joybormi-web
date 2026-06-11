import { headers } from "next/headers"

import type { ShareLinkType, SharePreviewPayload } from "./public-link"
import { buildSharePreviewApiPath, normalizeSharePart } from "./public-link"

async function getRequestOrigin() {
  const headerStore = await headers()
  const forwardedHost = headerStore.get("x-forwarded-host")
  const host = forwardedHost ?? headerStore.get("host")
  const protocol = headerStore.get("x-forwarded-proto") ?? "https"

  if (!host) {
    return "https://joybormiapp.uz"
  }

  return `${protocol}://${host}`
}

function resolveHttpUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return null
  }

  try {
    const url = new URL(value)

    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null
  } catch {
    return null
  }
}

function normalizePreviewPayload(value: unknown, type: ShareLinkType, id: string): SharePreviewPayload | null {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : null
  const title = typeof source?.title === "string" ? source.title.trim() : ""
  const subtitle = typeof source?.subtitle === "string" ? source.subtitle.trim() : ""
  const image = resolveHttpUrl(source?.image)

  if (!title) {
    return null
  }

  return {
    type,
    id: normalizeSharePart(id),
    title,
    subtitle,
    image,
  }
}

export async function fetchSharePreview(type: ShareLinkType, id: string, locale: string) {
  const requestUrl = new URL(buildSharePreviewApiPath(type, id), await getRequestOrigin())
  requestUrl.searchParams.set("locale", locale)

  try {
    const response = await fetch(requestUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Accept-Language": locale,
      },
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as { data?: unknown } | unknown
    const normalized = normalizePreviewPayload(
      payload && typeof payload === "object" && "data" in payload ? (payload as { data?: unknown }).data : payload,
      type,
      id
    )

    return normalized
  } catch {
    return null
  }
}
