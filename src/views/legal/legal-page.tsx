import { getTranslations } from "next-intl/server"

import { Header } from "@/components/shared/header"
import { RichContent } from "@/components/shared/rich-content"
import { getLatestPublicLegalDocument } from "@/hooks/legal/legal.service"
import type { PublicLegalDocumentType } from "@/hooks/legal/types"
import { Locale } from "@/i18n/config"

type LegalPageProps = {
  type: PublicLegalDocumentType
  locale: Locale
}

export async function LegalPage({ type, locale }: LegalPageProps) {
  const t = await getTranslations({ locale, namespace: "landingModern.legal" })

  try {
    const data = await getLatestPublicLegalDocument(type, locale.toUpperCase() as Locale)

    return (
      <main className="jb-landing min-h-screen">
        <Header />

        <section className="mx-auto mt-24 max-w-4xl px-6 pb-24 sm:mt-32 lg:px-8">
          <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="border-border mb-12 border-b pb-12 text-center md:text-left">
              <h1 className="text-foreground mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                {data.title}
              </h1>

              {data.createdAt && (
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm font-medium md:justify-start">
                  <span className="bg-primary h-1 w-4 rounded-full" />
                  {t("lastUpdated")}: {formatDate(data.createdAt, locale)}
                </div>
              )}
            </header>

            <RichContent content={data.content} />
          </article>
        </section>
      </main>
    )
  } catch {
    return (
      <main className="jb-landing min-h-screen">
        <Header />

        <section className="mx-auto mt-24 max-w-4xl px-6 pb-24 sm:mt-32 lg:px-8">
          <ErrorState message={t("errorLoading")} retryLabel={t("retry")} />
        </section>
      </main>
    )
  }
}

export function LegalPageLoading() {
  return (
    <main className="jb-landing min-h-screen">
      <Header />

      <section className="mx-auto mt-24 max-w-4xl px-6 pb-24 sm:mt-32 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="space-y-4">
            <div className="bg-muted mx-auto h-12 w-3/4 rounded-2xl md:mx-0" />
            <div className="bg-muted mx-auto h-4 w-1/4 rounded-full md:mx-0" />
          </div>

          <div className="space-y-4 pt-8">
            <div className="bg-muted h-4 w-full rounded-full" />
            <div className="bg-muted h-4 w-full rounded-full" />
            <div className="bg-muted h-4 w-5/6 rounded-full" />
            <div className="bg-muted h-4 w-full rounded-full" />
            <div className="bg-muted h-4 w-4/5 rounded-full" />
          </div>
        </div>
      </section>
    </main>
  )
}

function ErrorState({ message, retryLabel }: { message: string; retryLabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-destructive/10 text-destructive mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
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
      <h2 className="text-foreground mb-2 text-2xl font-bold">{message}</h2>
      <p className="text-muted-foreground">{retryLabel}</p>
    </div>
  )
}

function formatDate(date: string | Date, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
