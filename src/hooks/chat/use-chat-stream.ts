import { useCallback, useState } from "react"

import { chatService } from "@/services/chat.service"
import { useChatStore } from "@/stores/chat.store"
import {
  StreamContext,
  StreamContextData,
  StreamFinalData,
  StreamModelData,
  StreamStageData,
  StreamTokenData,
} from "@/types/chat.types"

export type SessionMode = "chat" | "faq" | "undecided"

interface UseChatStreamOptions {
  k?: number
  dim?: number
  mode_hint?: SessionMode
}

interface SSEEvent {
  event: string
  data: string
}

/**
 * Hook to handle streaming chat messages with SSE parsing
 */
export const useChatStream = (options?: UseChatStreamOptions) => {
  const [error, setError] = useState<string | null>(null)
  const {
    sessionId,
    isStreaming,
    currentStreamingMessage,
    currentStage,
    currentStageMessage,
    startStreaming,
    updateStreamingMessage,
    setStage,
    finishStreaming,
    resetStreaming,
    setSuggestedQuestions,
  } = useChatStore()

  const parseSSEEvent = (line: string): SSEEvent | null => {
    if (line.startsWith("event:")) {
      return { event: line.substring(6).trim(), data: "" }
    }
    if (line.startsWith("data:")) {
      return { event: "", data: line.substring(5).trim() }
    }
    return null
  }

  const sendMessage = useCallback(
    async (message: string, mode?: SessionMode) => {
      if (!sessionId) {
        setError("No session ID available")
        return
      }

      setError(null)
      startStreaming()
      if (mode && options) {
        options.mode_hint = mode
      }
      try {
        const stream = await chatService.sendMessage(sessionId, message, options)
        const reader = stream.getReader()
        const decoder = new TextDecoder()

        let buffer = ""
        let currentEvent = ""
        let accumulatedContent = ""
        let recommended_catalogs: StreamContext[] = []
        let currentIntent: string | null = null

        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (line.trim() === "") continue
            if (line === ": ping") continue

            const parsed = parseSSEEvent(line)
            if (!parsed) continue

            if (parsed.event) {
              currentEvent = parsed.event
            } else if (parsed.data && currentEvent) {
              try {
                switch (currentEvent) {
                  case "stage": {
                    const stageData = JSON.parse(parsed.data) as StreamStageData
                    setStage(stageData.stage, stageData.message)
                    break
                  }
                  case "context": {
                    const contextData = JSON.parse(parsed.data) as StreamContextData
                    recommended_catalogs = contextData.recommended_catalogs ?? []
                    currentIntent = contextData.request?.intent || currentIntent
                    break
                  }
                  case "model": {
                    const modelData = JSON.parse(parsed.data) as StreamModelData
                    currentIntent = modelData.intent || currentIntent
                    break
                  }
                  case "token": {
                    const tokenData = JSON.parse(parsed.data) as StreamTokenData
                    accumulatedContent += tokenData.delta
                    updateStreamingMessage(accumulatedContent)
                    break
                  }
                  case "final": {
                    const finalData = JSON.parse(parsed.data) as StreamFinalData
                    finishStreaming(
                      finalData.final.answer,
                      finalData.final.response_id,
                      finalData.final.show_session_switch_button || false,
                      recommended_catalogs,
                      currentIntent
                    )
                    if (finalData.final.suggested_questions) {
                      setSuggestedQuestions(finalData.final.suggested_questions)
                    }
                    break
                  }
                  case "done": {
                    // Stream is complete
                    break
                  }
                  case "title":
                    // These events can be logged or ignored
                    break
                }
              } catch (parseError) {
                console.error("Failed to parse SSE data:", parseError)
              }
              currentEvent = ""
            }
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to send message"
        setError(errorMessage)
        resetStreaming()
      }
    },
    [
      options,
      sessionId,
      setStage,
      resetStreaming,
      startStreaming,
      finishStreaming,
      updateStreamingMessage,
      setSuggestedQuestions,
    ]
  )

  return {
    error,
    isStreaming,
    currentStage,
    currentStageMessage,
    currentStreamingMessage,
    sendMessage,
  }
}
