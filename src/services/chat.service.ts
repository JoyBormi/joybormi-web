import Cookies from "js-cookie"
import { appConfig } from "@/config/app.config"
import { COOKIE_KEYS } from "@/constants/cookies"
import { SessionMode } from "@/hooks/chat"
import { Agent, agent } from "@/lib/agent"

import type {
  BootstrapSessionRequest,
  BootstrapSessionResponse,
  ChatHistoryMessage,
  ChatHistoryResponse,
  DefaultResponse,
  FeedBackRequest,
  FeedBackResponse,
  RateSessionResponse,
  SessionModeResponse,
} from "@/types/chat.types"

export class ChatService {
  private readonly agent: Agent

  constructor(agentInstance: Agent = agent) {
    this.agent = agentInstance
  }

  /**
   * Bootstrap user and session for v2 chat
   * Rules:
   * - If user_id is missing -> create anonymous user + undecided session
   * - If user_id exists and session_id is missing -> create new undecided session for that user
   * - If both exist and session age >= 24h (or invalid/mismatched) -> create new undecided session
   * - Otherwise reuse provided session
   */
  async bootstrapSession(request?: BootstrapSessionRequest): Promise<BootstrapSessionResponse> {
    const response = await this.agent.post<BootstrapSessionResponse>("/chat/v2/session/bootstrap", request || {})

    Cookies.set(COOKIE_KEYS.CHAT_SESSION, response.data.session_id)

    return response
  }

  /**
   * Get chat history for a session
   */
  async getChatHistory(sessionId: string, limit: number = 100): Promise<ChatHistoryMessage[]> {
    const queryParams = new URLSearchParams()
    queryParams.append("limit", limit.toString())

    const response = await this.agent.get<ChatHistoryResponse>(
      `/chat/sessions/${sessionId}/messages?${queryParams.toString()}`
    )
    return response.data
  }

  /**
   * @description Set Session mode
   * @param sessionId str
   * @param mode chat | faq
   */

  async setSessionMode(sessionId: string, mode: Omit<SessionMode, "auto">): Promise<SessionModeResponse> {
    const response = await this.agent.post<DefaultResponse<SessionModeResponse>>(
      `/chat/v2/session/${sessionId}/mode?mode=${mode}`
    )
    return response.data
  }

  /**
   * @description Rate session
   * @param sessionId str
   * @param rating number
   */
  async rateSession(sessionId: string, rating: number): Promise<RateSessionResponse> {
    const response = await this.agent.post<DefaultResponse<RateSessionResponse>>(
      `/chat/v2/session/${sessionId}/rate?rating=${rating}`
    )
    return response.data
  }

  /**
   * Send message and get streaming response
   */
  async sendMessage(
    sessionId: string,
    content: string,
    options?: {
      k?: number
      dim?: number
      mode_hint?: string
    }
  ): Promise<ReadableStream<Uint8Array>> {
    const params = new URLSearchParams()
    params.append("k", (options?.k ?? 20).toString())
    params.append("dim", (options?.dim ?? 1024).toString())
    params.append("mode_hint", options?.mode_hint ?? "auto")

    const formData = new URLSearchParams()
    formData.append("content", content)

    const response = await fetch(
      `${appConfig.api.baseURL}/chat/v2/sessions/${sessionId}/message/stream?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/event-stream",
        },
        body: formData.toString(),
      }
    )

    if (!response.ok || !response.body) {
      throw new Error(`Failed to send message: ${response.statusText}`)
    }

    return response.body
  }

  /**
   * Send feedback for a message
   */
  async sendFeedback(request: FeedBackRequest): Promise<FeedBackResponse> {
    const response = await this.agent.post<FeedBackResponse>("/chat/v2/message/feedback", request)
    return response
  }
}

export const chatService = new ChatService()
