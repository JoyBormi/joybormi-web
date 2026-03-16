"use client"

import { useLocale } from "next-intl"
import { useMemo, useState } from "react"

import { Header } from "@/components/shared/header"
import { RichContent } from "@/components/shared/rich-content"
import { appConfig } from "@/config/app.config"
import { useGetPublicLegal } from "@/hooks/legal/use-get-public-legal"
import { Locale } from "@/i18n/config"

export default function TermsPage() {
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const language = useMemo(() => locale?.toUpperCase() as Locale, [locale])

  const { data, isLoading, error } = useGetPublicLegal({
    type: "TERMS",
    language,
  })

  return (
    <main className="relative mx-auto max-w-3xl px-6 py-16">
      <Header app={appConfig.app} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="mt-10">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && (error || !data) && <ErrorState />}

        {!isLoading && data && (
          <article className="space-y-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">{data.title}</h1>

              {data.createdAt && (
                <p className="text-muted-foreground text-sm">Last updated: {formatDate(data.createdAt)}</p>
              )}
            </header>

            <RichContent content={data.content} />
          </article>
        )}
      </section>
    </main>
  )
}

/* ----------------------------- */
/* UI States */
/* ----------------------------- */

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-muted h-8 w-2/3 rounded" />
      <div className="bg-muted h-4 w-1/3 rounded" />
      <div className="bg-muted h-4 w-full rounded" />
      <div className="bg-muted h-4 w-full rounded" />
      <div className="bg-muted h-4 w-5/6 rounded" />
    </div>
  )
}

function ErrorState() {
  return <p className="text-muted-foreground">Failed to load terms of service.</p>
}

/* ----------------------------- */
/* Utils */
/* ----------------------------- */

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString()
}
