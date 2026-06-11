import { Locale } from "@/i18n/config"

export type PublicLegalDocumentType = "TERMS" | "PRIVACY"

export type PublicLegalDocument = {
  id: string
  type: PublicLegalDocumentType
  version: string
  language: Locale
  title: string
  content: string
  isActive: boolean
  createdAt: string
}
