"use client"

import { useLocale, useTranslations } from "next-intl"
import { useMemo } from "react"

import { Header } from "@/components/shared/header"
import { RichContent } from "@/components/shared/rich-content"
import { useGetPublicLegal } from "@/hooks/legal/use-get-public-legal"
import { Locale } from "@/i18n/config"

type LegalViewProps = {
  type: "TERMS" | "PRIVACY"
  errorTitle: string
}

export const LegalView = ({ type, errorTitle }: LegalViewProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const language = useMemo(() => locale?.toUpperCase() as Locale, [locale])

  const { data, isLoading, error } = useGetPublicLegal({
    type,
    language,
  })

  return (
    <main className="jb-landing min-h-screen">
      <Header />

      <section className="mx-auto mt-24 max-w-4xl px-6 pb-24 sm:mt-32 lg:px-8">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && (error || !data) && <ErrorState message={errorTitle || t("errorLoading")} />}

        {!isLoading && data && (
          <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12 border-b border-border pb-12 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl mb-4">
                {data.title}
              </h1>

              {data.createdAt && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-muted-foreground">
                  <span className="h-1 w-4 bg-primary rounded-full" />
                  {t("landingModern.legal.lastUpdated")}: {formatDate(data.createdAt)}
                </div>
              )}
            </header>


            <RichContent content={data.content} />

          </article>
        )}
      </section>
      </main>
    )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="bg-muted h-12 w-3/4 rounded-2xl mx-auto md:mx-0" />
        <div className="bg-muted h-4 w-1/4 rounded-full mx-auto md:mx-0" />
      </div>
      <div className="space-y-4 pt-12">
        <div className="bg-muted h-4 w-full rounded-full" />
        <div className="bg-muted h-4 w-full rounded-full" />
        <div className="bg-muted h-4 w-5/6 rounded-full" />
        <div className="bg-muted h-4 w-full rounded-full pt-8" />
        <div className="bg-muted h-4 w-4/5 rounded-full" />
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  const t = useTranslations("legal")
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{message}</h2>
      <p className="text-muted-foreground">{t("retry")}</p>
    </div>
  )
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
