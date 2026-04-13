export type ShareLinkType = "brand" | "worker" | "service"

export type ShareLinkSegment = "b" | "w" | "s"

export interface SharePreviewPayload {
  type: ShareLinkType
  id: string
  title: string
  subtitle: string
  image?: string | null
}

export const WEB_SHARE_ORIGIN = "https://www.joybormiapp.uz"

export const SHARE_TYPE_SEGMENTS: Record<ShareLinkType, ShareLinkSegment> = {
  brand: "b",
  worker: "w",
  service: "s",
}

export const SHARE_SEGMENT_TYPES: Record<ShareLinkSegment, ShareLinkType> = {
  b: "brand",
  w: "worker",
  s: "service",
}

export const normalizeSharePart = (value: string) => value.trim().replace(/^\/+|\/+$/g, "")

export const encodeSharePart = (value: string) => encodeURIComponent(normalizeSharePart(value))

export const resolveShareLinkType = (value?: string | null): ShareLinkType | null => {
  switch (normalizeSharePart(value ?? "").toLowerCase()) {
    case "b":
    case "brand":
      return "brand"
    case "w":
    case "worker":
      return "worker"
    case "s":
    case "service":
      return "service"
    default:
      return null
  }
}

export const buildShareWebUrl = (type: ShareLinkType, id: string) => {
  const normalizedType = SHARE_TYPE_SEGMENTS[type]
  const normalizedId = encodeSharePart(id)

  return `${WEB_SHARE_ORIGIN}/link/${normalizedType}/${normalizedId}`
}

export const buildSharePreviewApiPath = (type: ShareLinkType, id: string) => {
  const normalizedType = SHARE_TYPE_SEGMENTS[type]
  const normalizedId = encodeSharePart(id)

  return `/api/share-preview/${normalizedType}/${normalizedId}`
}

