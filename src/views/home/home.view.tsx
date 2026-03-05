"use client"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { ChatResponse } from "@/components/shared/chat-response"
import { Header } from "@/components/shared/header"
import { useBootstrapSession, useChatFeedback, useChatHistory, useChatStream } from "@/hooks/chat"
import { chatService } from "@/services/chat.service"
import { Message, useChatStore } from "@/stores/chat.store"
import { type ChatHistoryMessage, type FeedBackRequest } from "@/types/chat.types"
import { ChatInput, MessageList } from "./components"

interface HomeViewProps {
  initialChatHistory?: ChatHistoryMessage[]
}

const mapHistoryMessageToStore = (message: ChatHistoryMessage): Message => ({
  id: message.id,
  type: message.role === "user" ? "question" : "answer",
  content: message.content,
  feedback: message.feedback,
  recommended_catalogs: message.recommended_catalogs,
})

const HomeView: FC<HomeViewProps> = ({ initialChatHistory }) => {
  const [inputValue, setInputValue] = useState("")
  const [hasHydrated, setHasHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  // Zustand store
  const {
    mode_hint,
    messages,
    sessionId,
    suggestedQuestions,
    setMode,
    setUserId,
    addMessage,
    setMessages,
    setSessionId,
    setSuggestedQuestions,
    startStreaming,
  } = useChatStore()

  // Hooks
  const { sendMessage, error, isStreaming, currentStreamingMessage, currentStageMessage } = useChatStream({
    k: 20,
    dim: 1024,
    mode_hint,
  })
  const { mutateAsync: sendFeedback } = useChatFeedback()
  const { mutateAsync: bootstrapSession } = useBootstrapSession()
  const { data: chatHistory } = useChatHistory(sessionId, initialChatHistory)

  const handleChatHistory = useCallback(
    async (sessionId: string) => {
      // Load chat history from SSR or fetch if not provided
      if (chatHistory && chatHistory.length > 0) {
        setMessages(chatHistory.map(mapHistoryMessageToStore))
      } else {
        // Fetch chat history if not provided via SSR
        try {
          const history = await chatService.getChatHistory(sessionId)
          setMessages(history.map(mapHistoryMessageToStore))
        } catch (historyError) {
          console.error("Failed to load chat history:", historyError)
        }
      }
    },
    [chatHistory, setMessages]
  )

  const initializeChat = useCallback(async () => {
    try {
      // Local storage ids
      const userId = useChatStore.getState().userId
      const sessionId = useChatStore.getState().sessionId

      // Bootstrap session (handles all creation/reuse logic)
      const bootstrap = await bootstrapSession({
        user_id: userId || undefined,
        session_id: sessionId || undefined,
      })

      setUserId(bootstrap.data.user_id)
      setSessionId(bootstrap.data.session_id)

      handleChatHistory(bootstrap.data.session_id)
    } catch (error) {
      console.error("Failed to initialize chat:", error)
    }
  }, [bootstrapSession, setUserId, setSessionId, handleChatHistory])

  // Handle category button click
  const handleCategoryClick = useCallback(
    async (category: string) => {
      if (!sessionId) return

      const selectedMode = category === "FAQ" ? "faq" : "chat"

      try {
        const response = await chatService.setSessionMode(sessionId, selectedMode)

        // Update mode in store
        setMode(selectedMode)

        // Add the user's mode selection message
        addMessage({
          id: response.user_message_id,
          type: "question",
          content: category,
        })

        // Add the bot's response message
        addMessage({
          id: response.message_id,
          type: "answer",
          content: response.content,
        })

        // Set suggested questions if any
        if (response.suggested_questions && response.suggested_questions.length > 0) {
          setSuggestedQuestions(response.suggested_questions)
        }
      } catch (error) {
        console.error("Failed to set session mode:", error)
      }
    },
    [sessionId, setMode, addMessage, setSuggestedQuestions]
  )

  // Ensure store is hydrated from localStorage
  useEffect(() => {
    // Wait for Zustand persist to rehydrate
    const unsubscribe = useChatStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })

    // Check if already hydrated
    if (useChatStore.persist.hasHydrated()) {
      setHasHydrated(true)
    }

    return unsubscribe
  }, [])

  // Initialize user and session using bootstrap - only once on mount
  useEffect(() => {
    if (hasHydrated && !isInitializedRef.current) {
      isInitializedRef.current = true
      initializeChat()
    }
  }, [hasHydrated, initializeChat])

  // Auto-scroll to bottom when messages change or streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isStreaming, currentStreamingMessage])

  const sendMessageFeedback = useCallback(
    async (messageId: string, feedback: FeedBackRequest["feedback"]) => {
      if (!sessionId) {
        throw new Error("No session ID available")
      }

      return await sendFeedback({
        message_id: messageId,
        session_id: sessionId,
        feedback,
      })
    },
    [sessionId, sendFeedback]
  )

  return (
    <div className="relative flex h-screen max-w-120 flex-col overflow-x-hidden">
      <Header />

      {/* BODY */}
      <div className="flex flex-col overflow-x-hidden overflow-y-auto px-5 pb-24">
        {/* Display conversation messages */}
        <ul className="flex flex-col gap-5">
          {sessionId && messages && (
            <MessageList
              messages={messages}
              suggestedQuestions={suggestedQuestions}
              isStreaming={isStreaming}
              mode={mode_hint}
              onSendQuestion={async (question) => {
                addMessage({
                  id: Date.now().toString(),
                  type: "question",
                  content: question,
                })
                setSuggestedQuestions([])

                // Start streaming immediately for optimistic UI
                startStreaming()

                await sendMessage(question)
              }}
              onSelectMode={handleCategoryClick}
              onSendFeedback={async (messageId, _sessionId, feedback) => await sendMessageFeedback(messageId, feedback)}
              sessionId={sessionId}
            />
          )}
        </ul>

        {/* Show streaming content with stage */}
        {isStreaming && (
          <ChatResponse content={currentStreamingMessage} isStreaming={true} stageMessage={currentStageMessage} />
        )}

        {/* Show error if any */}
        {error && <div className="body-1 text-red-500">{error}</div>}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT SECTION */}
      {hasHydrated && mode_hint !== "undecided" && (
        <ChatInput
          value={inputValue}
          disabled={!sessionId || isStreaming}
          onChange={setInputValue}
          onSubmit={async () => {
            if (!inputValue.trim() || !sessionId) return

            addMessage({
              id: Date.now().toString(),
              type: "question",
              content: inputValue,
            })
            setSuggestedQuestions([])

            const messageToSend = inputValue
            setInputValue("")

            // Start streaming immediately for optimistic UI
            startStreaming()

            await sendMessage(messageToSend)
          }}
        />
      )}
    </div>
  )
}

export { HomeView }
