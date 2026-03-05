import { SessionMode } from "@/hooks/chat"

export const CATALOG_QUERY_INTENTS = ["product_query", "company_query"] as const
export type CatalogQueryIntent = (typeof CATALOG_QUERY_INTENTS)[number]

export interface FaqItem {
  seq: number
  id: string
  question: string
  answer: string
  aliases: string[]
  version: number
  code: string
  audience: string
  question_norm: string
  tags: string[]
  source: string
  source_row: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SessionModeResponse {
  content: string // response [tailored to session mode]
  session_id: string
  message_id: string // bot response message id
  user_message_id: string
  session_type: SessionMode
  suggested_questions: string[]
}

export interface RateSessionResponse {
  session_id: string
  session_rating: number
}

export interface BootstrapSessionRequest {
  user_id?: string
  session_id?: string
}

export interface BootstrapSessionResponse {
  status: number
  message: string
  data: {
    user_id: string
    session_id: string
    user_name: string
  }
}

export interface DefaultResponse<T> {
  status: number
  message: string
  data: T
}

export interface ChatHistoryMessage {
  id: string
  session_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
  feedback: "like" | "dislike" | null
  recommended_catalogs?: StreamContext[]
}

export interface ChatHistoryResponse {
  status: number
  message: string
  data: ChatHistoryMessage[]
}

export interface FaqListResponse {
  status: number
  message: string
  data: FaqItem[]
}

export interface FeedBackRequest {
  message_id: string
  session_id: string
  feedback: "like" | "dislike" | null
}

export interface FeedBackResponse {
  status: number
  message: string
  data: {
    message_id: string
    feedback: "like" | "dislike" | null
  }
}

export interface StreamContext {
  name: string
  lang: "en" | "ko"
  company_name: string | null
  external_id: string
  image_url: string
  booth_number: string
  type: "product" | "company"
}
export interface StreamStageData {
  stage: string
  message: string
  detail?: Record<string, unknown>
}

export interface StreamTokenData {
  delta: string
}

export interface StreamContextData {
  session?: {
    id: string
    user_id?: string
    title?: string | null
  }
  request?: {
    content?: string
    lang?: string
    intent?: string
  }
  recommended_catalogs?: StreamContext[]
}

export interface StreamModelData {
  model?: string
  intent?: string
  route?: string
  rag_used?: boolean
  faq_used?: boolean
}

export interface StreamFinalData {
  final: {
    request_id: string
    response_id: string
    answer: string
    suggested_questions?: string[]
    session_switch_suggestion?: {
      target_mode: string
      reason: string
      prompt: string
      show_button: boolean
    }
    show_session_switch_button?: boolean
  }
}
