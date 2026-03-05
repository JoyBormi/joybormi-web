import { create } from "zustand"
import { persist } from "zustand/middleware"
import { SessionMode } from "@/hooks/chat"
import { CatalogQueryIntent, StreamContext } from "@/types/chat.types"

export interface Message {
  id: string
  type: "question" | "answer"
  content: string
  isStreaming?: boolean
  stage?: string
  session_mode?: SessionMode
  stageMessage?: string
  feedback?: "like" | "dislike" | null
  showSessionSwitchButton?: boolean
  recommended_catalogs?: StreamContext[]
  intent?: CatalogQueryIntent | string | null
}

interface ChatState {
  userId: string | null
  sessionId: string | null
  messages: Message[] | null
  currentStreamingMessage: string | null
  currentStage: string | null
  currentStageMessage: string | null
  isStreaming: boolean
  mode_hint: SessionMode
  suggestedQuestions: string[]
  showSessionSwitchButton: boolean
  setUserId: (userId: string | null) => void
  setSessionId: (sessionId: string | null) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setMode: (mode: SessionMode) => void
  setSuggestedQuestions: (messages: string[]) => void
  setShowSessionSwitchButton: (show: boolean) => void
  updateMessages: ({ id, feedback }: { id: string; feedback: "like" | "dislike" | null }) => void
  updateStreamingMessage: (content: string) => void
  setStage: (stage: string, message: string) => void
  startStreaming: () => void
  finishStreaming: (
    finalContent: string,
    responseId: string,
    showSessionSwitchButton?: boolean,
    recommended_catalogs?: StreamContext[],
    intent?: CatalogQueryIntent | string | null
  ) => void
  resetStreaming: () => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      userId: null,
      sessionId: null,
      messages: null,
      currentStreamingMessage: "",
      currentStage: null,
      currentStageMessage: null,
      isStreaming: false,
      mode_hint: "undecided",
      suggestedQuestions: [],
      showSessionSwitchButton: false,
      setUserId: (userId) => set({ userId }),
      setMode: (mode_hint) => set({ mode_hint }),
      setSessionId: (sessionId) => set({ sessionId }),
      addMessage: (message) =>
        set((state) => ({
          messages: state?.messages ? [...state?.messages, message] : null,
        })),

      setMessages: (messages) => set({ messages }),

      updateMessages: ({ id, feedback }) =>
        set((state) => ({
          messages: state?.messages?.map((message) => (message.id === id ? { ...message, feedback } : message)),
        })),

      updateStreamingMessage: (content) => set({ currentStreamingMessage: content }),
      setSuggestedQuestions(messages) {
        set({ suggestedQuestions: messages })
      },
      setShowSessionSwitchButton: (show) => set({ showSessionSwitchButton: show }),
      setStage: (stage, message) => set({ currentStage: stage, currentStageMessage: message }),

      startStreaming: () =>
        set({
          isStreaming: true,
          currentStreamingMessage: "",
          currentStage: null,
          currentStageMessage: null,
          showSessionSwitchButton: false,
        }),

      finishStreaming: (
        finalContent,
        responseId,
        showSessionSwitchButton = false,
        recommended_catalogs = [],
        intent = null
      ) =>
        set((state) => ({
          isStreaming: false,
          currentStreamingMessage: "",
          currentStage: null,
          currentStageMessage: null,
          showSessionSwitchButton,
          messages: state?.messages
            ? [
                ...state?.messages,
                {
                  id: responseId,
                  type: "answer",
                  content: finalContent,
                  showSessionSwitchButton,
                  recommended_catalogs,
                  intent,
                },
              ]
            : null,
        })),

      resetStreaming: () =>
        set({
          isStreaming: false,
          currentStreamingMessage: "",
          currentStage: null,
          currentStageMessage: null,
          showSessionSwitchButton: false,
        }),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        userId: state.userId,
        sessionId: state.sessionId,
        mode_hint: state.mode_hint,
      }),
    }
  )
)
