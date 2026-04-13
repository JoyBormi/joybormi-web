import { NextRequest } from "next/server"

import { appConfig } from "@/config/app.config"
import {
  normalizeSharePart,
  resolveShareLinkType,
  SHARE_TYPE_SEGMENTS,
  type ShareLinkType,
} from "@/lib/share/public-link"

const SHARE_PREVIEW_BACKEND_PATH = "/share-preview"

function resolveBackendUrl(type: ShareLinkType, id: string) {
  return new URL(
    `${SHARE_PREVIEW_BACKEND_PATH}/${SHARE_TYPE_SEGMENTS[type]}/${encodeURIComponent(normalizeSharePart(id))}`,
    appConfig.api.baseURL
  )
}

function resolveImageUrl(value: unknown): string | null {
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

export async function GET(request: NextRequest, context: { params: Promise<{ type: string; id: string }> }) {
  const { type: rawType, id: rawId } = await context.params
  const type = resolveShareLinkType(rawType)
  const id = normalizeSharePart(rawId)

  if (!type || !id) {
    return Response.json(
      {
        error: {
          code: "INVALID_SHARE_LINK",
          message: "Invalid share link type or id",
        },
      },
      { status: 400 }
    )
  }

  const localeFromQuery = request.nextUrl.searchParams.get("locale")?.trim()
  const localeFromHeader = request.headers.get("accept-language")?.split(",")[0]?.trim()
  const locale = localeFromQuery || localeFromHeader || undefined
  const backendUrl = resolveBackendUrl(type, id)

  if (locale) {
    backendUrl.searchParams.set("locale", locale)
  }

  try {
    const upstreamResponse = await fetch(backendUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(locale ? { "Accept-Language": locale } : {}),
      },
    })

    if (!upstreamResponse.ok) {
      return Response.json(
        {
          error: {
            code: "SHARE_PREVIEW_UPSTREAM_ERROR",
            message: `Share preview backend returned ${upstreamResponse.status}`,
          },
        },
        { status: upstreamResponse.status }
      )
    }

    const upstreamPayload = (await upstreamResponse.json()) as { data?: unknown } | unknown
    const source =
      upstreamPayload && typeof upstreamPayload === "object" && "data" in upstreamPayload
        ? (upstreamPayload as { data?: unknown }).data
        : upstreamPayload
    const normalizedSource = source && typeof source === "object" ? (source as Record<string, unknown>) : null
    const title = typeof normalizedSource?.title === "string" ? normalizedSource.title.trim() : ""
    const subtitle = typeof normalizedSource?.subtitle === "string" ? normalizedSource.subtitle.trim() : ""
    const image = resolveImageUrl(normalizedSource?.image)

    if (!title) {
      return Response.json(
        {
          error: {
            code: "SHARE_PREVIEW_MALFORMED_RESPONSE",
            message: "Share preview backend response is missing title",
          },
        },
        { status: 502 }
      )
    }

    return Response.json({
      data: {
        type,
        id,
        title,
        subtitle,
        image,
      },
    })
  } catch (error) {
    console.error("Share preview fetch failed:", error)

    return Response.json(
      {
        error: {
          code: "SHARE_PREVIEW_BACKEND_UNAVAILABLE",
          message: "Share preview backend is unavailable",
        },
      },
      { status: 502 }
    )
  }
}
