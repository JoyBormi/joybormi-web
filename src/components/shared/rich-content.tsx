import React from "react"
import ReactMarkdown, { defaultUrlTransform } from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

type RichContentProps = {
  content: string
}

const PHONE_REGEX = /\b(?:\+?\d{1,3}[-.\s]?)?\d{2,4}[-.\s]\d{3,4}[-.\s]\d{4}\b/g

const UTM_PATTERN = /utm/i

const normalizeExternalHref = (href?: string): string => {
  const value = (href || "").trim()
  if (!value) return "#"

  if (/^(?:[a-z][a-z\d+\-.]*:|#|\/)/i.test(value)) {
    return value
  }

  return `https://${value}`
}

const isPhoneHref = (href: string): boolean => href.startsWith("tel:")

const linkifyPhoneNumbers = (text: string): string =>
  text.replace(PHONE_REGEX, (phone) => {
    const tel = phone.replace(/[^\d+]/g, "")
    return `[${phone}](tel:${tel})`
  })

const getSoftHiddenUrlParts = (text: string) => {
  const matchIndex = text.search(UTM_PATTERN)

  if (matchIndex === -1) return null

  const visibleEnd = matchIndex > 0 && text[matchIndex - 1] === "?" ? matchIndex - 1 : matchIndex

  return {
    visible: text.slice(0, visibleEnd),
    hidden: text.slice(visibleEnd),
  }
}

const getPlainText = (children: React.ReactNode): string =>
  React.Children.toArray(children)
    .filter((child): child is string | number => typeof child === "string" || typeof child === "number")
    .join("")
    .trim()

const MarkdownComponents: Components = {
  p: ({ children }) => <p className="body-1 wrap-break-word whitespace-pre-line">{children}</p>,

  h1: ({ children }) => <h1 className="title">{children}</h1>,

  h2: ({ children }) => <h2 className="subtitle">{children}</h2>,

  h3: ({ children }) => <h3 className="subtitle">{children}</h3>,

  ul: ({ children }) => <ul className="body-1 ml-4 list-disc">{children}</ul>,

  ol: ({ children }) => <ol className="body-1 ml-4 list-decimal">{children}</ol>,

  li: ({ children }) => <li className="body-1 wrap-break-word">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="body-1 border-l-4 border-gray-300 pl-3 text-gray-500">{children}</blockquote>
  ),

  table: ({ children }) => (
    <div className="my-2 w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 text-left">{children}</table>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,

  tbody: ({ children }) => <tbody>{children}</tbody>,

  tr: ({ children }) => <tr className="border-b border-gray-200">{children}</tr>,

  th: ({ children }) => <th className="body-2 border border-gray-200 px-3 py-2 font-semibold">{children}</th>,

  td: ({ children }) => <td className="body-2 border border-gray-200 px-3 py-2">{children}</td>,

  strong: ({ children }) => <strong className="font-bold">{children}</strong>,

  em: ({ children }) => <em className="italic">{children}</em>,

  hr: () => <hr className="my-3 border-gray-200" />,

  code: ({ children }) => <code className="caption-1 rounded bg-gray-100 px-1 py-0.5">{children}</code>,

  pre: ({ children }) => <pre className="caption-1 overflow-x-auto rounded bg-gray-100 p-2">{children}</pre>,

  a: ({ children, href }) => {
    const normalizedHref = normalizeExternalHref(href)
    const telLink = isPhoneHref(normalizedHref)

    const childText = getPlainText(children)
    const softHiddenUrlParts = childText ? getSoftHiddenUrlParts(childText) : null

    return (
      <a
        href={normalizedHref}
        target={telLink ? undefined : "_blank"}
        rel={telLink ? undefined : "noreferrer"}
        className="break-all text-blue-600 underline"
      >
        {softHiddenUrlParts ? softHiddenUrlParts.visible : children}
      </a>
    )
  },
}

export const RichContent: React.FC<RichContentProps> = ({ content }) => {
  const parsedContent = linkifyPhoneNumbers(content)

  return (
    <div className="body-1 text-foreground prose prose-sm mt-2.5 max-w-none wrap-break-word">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
        urlTransform={(url) => {
          if (url.startsWith("tel:")) return url
          return defaultUrlTransform(url)
        }}
      >
        {parsedContent}
      </ReactMarkdown>
    </div>
  )
}
