import React from "react"
import ReactMarkdown, { defaultUrlTransform } from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

type RichContentProps = {
  content: string
  className?: string
}

const MarkdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,

  h1: ({ children }) => <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{children}</h1>,

  h2: ({ children }) => <h2 className="mt-4 mb-2 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>,

  h3: ({ children }) => <h3 className="mt-4 mb-2 text-xl font-semibold tracking-tight text-foreground">{children}</h3>,

  ul: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>,

  ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>,

  li: ({ children }) => <li className="pl-1">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-primary/30 bg-primary/5 px-6 py-4 italic text-foreground/80 rounded-r-lg">
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="my-8 w-full overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-muted/50 border-b border-border">{children}</thead>,

  tr: ({ children }) => <tr className="border-b border-border last:border-0">{children}</tr>,

  th: ({ children }) => <th className="px-4 py-3 font-semibold text-foreground">{children}</th>,

  td: ({ children }) => <td className="px-4 py-3 text-muted-foreground">{children}</td>,

  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,

  em: ({ children }) => <em className="italic">{children}</em>,

  hr: () => <hr className="my-12 border-border" />,

  code: ({ children }) => (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm font-medium text-foreground">{children}</code>
  ),

  pre: ({ children }) => (
    <pre className="my-8 overflow-x-auto rounded-xl bg-muted p-6 font-mono text-sm leading-relaxed">{children}</pre>
  ),

  a: ({ children, href }) => {
    const isExternal = href?.startsWith("http")
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80 decoration-primary/30 hover:decoration-primary"
      >
        {children}
      </a>
    )
  },
}

export const RichContent: React.FC<RichContentProps> = ({ content, className }) => {
  if (!content) return null

  // Detect if the content is likely HTML
  const isHtml = /<[a-z][\s\S]*>/i.test(content)

  if (isHtml) {
    return (
      <div
        className={cn("jb-rich-content", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className={cn("text-muted-foreground text-lg", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
        urlTransform={(url) => {
          if (url.startsWith("tel:")) return url
          return defaultUrlTransform(url)
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
