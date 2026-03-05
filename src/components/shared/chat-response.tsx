import Image from "next/image"
import React, { Fragment } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { toast } from "sonner"
import { FeedBackResponse } from "@/types/chat.types"
import { ClipboardCopy } from "./clipboard-copy"
import { Loading } from "./loading"
import { DisLikeFilledIcon, DisLikeIcon, LikeFilledIcon, LikeIcon } from "../icons"
import { Button } from "../ui/button"

type ChatResponseProps = {
  content: string | null
  isStreaming?: boolean
  stageMessage?: string | null
  isFirstMessage?: boolean
  onToggleLike?: () => Promise<FeedBackResponse>
  onToggleDisLike?: () => Promise<FeedBackResponse>
  feedback?: "like" | "dislike" | null
  children?: React.ReactNode
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  content,
  isStreaming = false,
  stageMessage,
  isFirstMessage = false,
  onToggleLike,
  onToggleDisLike,
  feedback,
  children,
}) => {
  const handleLike = async () => {
    await onToggleLike?.().then(() => {
      toast.info("의견이 반영되었습니다.")
    })
  }

  console.log("feedback", feedback)

  const handleDislike = async () => {
    await onToggleDisLike?.().then(() => {
      toast.info("의견이 반영되었습니다.")
    })
  }
  return (
    <section className="flex flex-col items-start">
      {/* header */}
      <figure className="flex items-center gap-0.5">
        <div
          style={{
            filter: `
            drop-shadow(0 0 21.246px #FF5966)
            drop-shadow(0 2.361px 9.443px rgba(172, 28, 28, 0.50))
            drop-shadow(0 -0.236px 2.361px rgba(255, 255, 255, 0.50))
          `,
          }}
        >
          <Image src="/images/chat.svg" alt="chat" className="-translate-x-1/3 object-cover" width={55} height={55} />
        </div>
        <figcaption className="body-1 -translate-x-1/3 text-gray-400">KIMES AI</figcaption>
      </figure>

      {/* body */}
      {content && (
        <div className="body-1 text-foreground prose prose-sm mt-2.5 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="body-1">{children}</p>,
              h1: ({ children }) => <h1 className="title">{children}</h1>,
              h2: ({ children }) => <h2 className="subtitle">{children}</h2>,
              h3: ({ children }) => <h3 className="subtitle">{children}</h3>,
              ul: ({ children }) => <ul className="body-1 ml-4 list-disc">{children}</ul>,
              ol: ({ children }) => <ol className="body-1 ml-4 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="body-1">{children}</li>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => <code className="caption-1 rounded bg-gray-100 px-1 py-0.5">{children}</code>,
              pre: ({ children }) => (
                <pre className="caption-1 overflow-x-auto rounded bg-gray-100 p-2">{children}</pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}

      {/* Stage message - shown during streaming */}
      {isStreaming && (
        <div className="mt-2.5 flex flex-col items-start gap-1">
          {!content && <p className="body-2 text-black">{stageMessage}</p>}
          <Loading />
        </div>
      )}
      {children}
      {/* footer - only show when not streaming, content exists, and not first message */}
      {!isStreaming && content && !isFirstMessage && (
        <div className="mt-2.5 flex items-center gap-2.5">
          {onToggleLike && onToggleDisLike && (
            <Fragment>
              <Button variant="icon" type="button" onClick={handleLike}>
                {feedback === "like" ? <LikeFilledIcon className="size-5" /> : <LikeIcon className="size-5" />}
              </Button>
              <Button variant="icon" type="button" onClick={handleDislike}>
                {feedback === "dislike" ? <DisLikeFilledIcon className="size-5" /> : <DisLikeIcon className="size-5" />}
              </Button>
            </Fragment>
          )}
          <ClipboardCopy text={content} />
        </div>
      )}
    </section>
  )
}

export { ChatResponse }
