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
  p: ({ children }) => <p className="mb-2 leading-relaxed break-words last:mb-0">{children}</p>,

  h1: ({ children }) => (
    <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{children}</h1>
  ),

  h2: ({ children }) => <h2 className="text-foreground mt-4 mb-2 text-2xl font-semibold tracking-tight">{children}</h2>,

  h3: ({ children }) => <h3 className="text-foreground mt-4 mb-2 text-xl font-semibold tracking-tight">{children}</h3>,

  ul: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>,

  ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>,

  li: ({ children }) => <li className="pl-1 break-words">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="border-primary/30 bg-primary/5 text-foreground/80 my-8 rounded-r-lg border-l-4 px-6 py-4 italic">
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="border-border my-8 w-full overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-muted/50 border-border border-b">{children}</thead>,

  tr: ({ children }) => <tr className="border-border border-b last:border-0">{children}</tr>,

  th: ({ children }) => <th className="text-foreground px-4 py-3 font-semibold">{children}</th>,

  td: ({ children }) => <td className="text-muted-foreground px-4 py-3">{children}</td>,

  strong: ({ children }) => <strong className="text-foreground font-bold">{children}</strong>,

  em: ({ children }) => <em className="italic">{children}</em>,

  hr: () => <hr className="border-border my-12" />,

  code: ({ children }) => (
    <code className="bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-sm font-medium break-words">
      {children}
    </code>
  ),

  pre: ({ children }) => (
    <pre className="bg-muted my-8 max-w-full overflow-x-auto rounded-xl p-6 font-mono text-sm leading-relaxed">
      {children}
    </pre>
  ),

  a: ({ children, href }) => {
    const isExternal = href?.startsWith("http")
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="text-primary hover:text-primary/80 decoration-primary/30 hover:decoration-primary font-medium underline underline-offset-4 transition-colors"
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
    return <div className={cn("jb-rich-content", className)} dangerouslySetInnerHTML={{ __html: content }} />
  }

  return (
    <div className={cn("text-muted-foreground text-lg [overflow-wrap:anywhere] break-words", className)}>
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
