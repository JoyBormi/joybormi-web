"use client"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations()

  return (
    <main className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      {/* Decorative ruled lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-border absolute top-0 right-0 left-0 h-px" />
        <div className="bg-border/40 absolute top-16 right-0 left-0 h-px" />
        <div className="bg-border/40 absolute right-0 bottom-16 left-0 h-px" />
        <div className="bg-border absolute right-0 bottom-0 left-0 h-px" />
        <div className="bg-border/40 absolute top-0 bottom-0 left-16 w-px" />
        <div className="bg-border/40 absolute top-0 right-16 bottom-0 w-px" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-20 lg:px-16">
        {/* Giant 404 */}
        <div className="relative mb-10 select-none">
          <span
            className="text-primary block leading-none font-black tracking-tighter"
            style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}
          >
            404
          </span>
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center">
            <div className="bg-foreground/15 h-px w-full" />
          </div>
        </div>

        {/* Divider row */}
        <div className="mb-10 flex items-center gap-6">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">Nothing here</span>
          <div className="bg-border h-px flex-1" />
        </div>

        {/* Two-column layout */}
        <div className="grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left — i18n message */}
          <div className="space-y-6">
            <p
              className="text-foreground leading-tight font-medium tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              {t.rich("notfound", {
                br: (chunk) => (
                  <span>
                    <br />
                    {chunk}
                  </span>
                ),
              })}
            </p>
          </div>

          {/* Right — description + CTAs */}
          <div className="flex flex-col justify-end gap-10">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-primary text-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-12 items-center gap-3 px-8 text-sm font-medium tracking-wide transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Go home
              </Link>

              <button
                onClick={() => history.back()}
                className="border-border bg-background text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-12 items-center gap-3 border px-8 text-sm font-medium tracking-wide transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
