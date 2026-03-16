import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { Locale } from "@/i18n/config"
import { getLatestPublicLegalDocument } from "./legal.service"

import type { PublicLegalDocumentType } from "./types"

type UseGetPublicLegalParams = {
  type: PublicLegalDocumentType
  language: Locale
  enabled?: boolean
}

export const useGetPublicLegal = ({ type, language, enabled }: UseGetPublicLegalParams) =>
  useQuery({
    queryKey: [...queryKeys.legal.publicLatest, { type, language }],
    queryFn: () => getLatestPublicLegalDocument(type, language),
    enabled: enabled ?? true,
    staleTime: 1000 * 60 * 5,
  })
