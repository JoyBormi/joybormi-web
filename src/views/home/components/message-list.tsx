import { FC, Fragment } from "react"
import { ChatQuestion } from "@/components/shared/chat-question"
import { ChatResponse } from "@/components/shared/chat-response"
import { ProjectList } from "@/components/shared/project-list"
import { Button } from "@/components/ui/button"
import { Message } from "@/stores/chat.store"
import { FeedBackResponse } from "@/types/chat.types"
import { ModeSelector } from "./mode-selector"

interface MessageListProps {
  messages: Message[]
  suggestedQuestions: string[]
  isStreaming: boolean
  mode: string
  onSendQuestion: (question: string) => void
  onSelectMode: (mode: string) => void
  onSendFeedback: (
    messageId: string,
    sessionId: string,
    feedback: "like" | "dislike" | null
  ) => Promise<FeedBackResponse>
  sessionId: string
}

const MessageList: FC<MessageListProps> = ({
  messages,
  suggestedQuestions,
  isStreaming,
  mode,
  onSendQuestion,
  onSelectMode,
  onSendFeedback,
  sessionId,
}) => {
  return (
    <Fragment>
      {messages?.map((message, index) => {
        if (message.type === "question") {
          return <ChatQuestion key={message.id} content={message.content} />
        }

        return (
          <ChatResponse
            key={message.id}
            content={message.content}
            feedback={message.feedback}
            isFirstMessage={index === 0}
            onToggleLike={async () => {
              const newFeedback = message.feedback === "like" ? null : "like"
              return await onSendFeedback(message.id, sessionId, newFeedback)
            }}
            onToggleDisLike={async () => {
              const newFeedback = message.feedback === "dislike" ? null : "dislike"
              return await onSendFeedback(message.id, sessionId, newFeedback)
            }}
          >
            {message.recommended_catalogs && message.recommended_catalogs?.length > 0 && (
              <ProjectList recommended_catalogs={message.recommended_catalogs} />
            )}

            {/* Show suggested questions only for the latest response */}
            {suggestedQuestions && suggestedQuestions.length > 0 && index === messages.length - 1 && !isStreaming && (
              <div className="mt-3 flex w-full flex-col gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="default"
                    onClick={() => onSendQuestion(question)}
                    className="shadow-1 h-fit min-h-12 w-full items-start justify-start bg-white text-start"
                  >
                    <p className="body-1 text-navy-500">Q.</p>
                    {question}
                  </Button>
                ))}
              </div>
            )}

            {/* Show mode selector for initial selection or when API suggests mode switch */}
            {!isStreaming &&
              (message.showSessionSwitchButton ||
                (messages.length <= 2 && index === messages.length - 1 && message.type === "answer")) && (
                <ModeSelector onSelectMode={onSelectMode} mode={mode} />
              )}
          </ChatResponse>
        )
      })}
    </Fragment>
  )
}

export { MessageList }
