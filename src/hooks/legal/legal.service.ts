import { Locale } from "@/i18n/config"
import { agent } from "@/lib/agent"

import type { PublicLegalDocument, PublicLegalDocumentType } from "./types"

export const getLatestPublicLegalDocument = async (
  type: PublicLegalDocumentType,
  language: Locale
): Promise<PublicLegalDocument> =>
  await agent.get<PublicLegalDocument>(`/public/legals/latest/${type}`, {
    params: { language },
  })
