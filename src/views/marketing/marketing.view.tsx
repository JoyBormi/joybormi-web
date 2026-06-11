import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Header } from "@/components/shared/header"
import { appConfig } from "@/config/app.config"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"

type MarketingViewProps = {
  locale: Locale
}

type HighlightItem = {
  title: string
  body: string
}

type BenefitItem = {
  title: string
  body: string
}

type StepItem = {
  title: string
  body: string
}

type FaqItem = {
  question: string
  answer: string
}

export async function MarketingView({ locale }: MarketingViewProps) {
  const t = await getTranslations({ locale, namespace: "landingModern.marketing" })
  const highlightItems = t.raw("highlights.items") as HighlightItem[]
  const benefitItems = t.raw("benefits.items") as BenefitItem[]
  const stepItems = t.raw("steps.items") as StepItem[]
  const faqItems = t.raw("faq.items") as FaqItem[]

  return (
    <main className="jb-landing bg-background text-foreground min-h-screen [font-family:var(--font-pretendard),var(--font-sans),sans-serif]">
      <Header />

      <section className="border-border border-b px-6 pt-28 pb-16 sm:pt-36 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("eyebrow")}</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.9rem,5.3vw,5.2rem)] leading-[0.92] font-extrabold tracking-[-0.06em] uppercase">
              {t.rich("headline", {
                accent: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">{t("description")}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={appConfig.app.urls.telegram}
                target="_blank"
                rel="noreferrer"
                className="bg-foreground text-background inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold no-underline transition-opacity hover:opacity-90"
              >
                {t("primaryCta")} <ArrowRight size={16} />
              </a>
              <Link
                href="/support"
                className="border-border text-foreground hover:bg-muted/40 inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold no-underline transition-colors"
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          <div className="border-border lg:border-l lg:pl-8">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
              {t("panel.label")}
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight">{t("panel.title")}</p>
            <div className="border-border divide-border mt-8 border-y">
              {highlightItems.map((item, index) => (
                <div key={item.title} className="py-5">
                  <div className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-7">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("steps.title")}</h2>
          </div>

          <div className="border-border divide-border border-y">
            {benefitItems.map((item) => (
              <div key={item.title} className="grid gap-4 py-6 md:grid-cols-[240px_minmax(0,1fr)]">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("steps.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("steps.title")}</h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">{t("steps.description")}</p>
          </div>

          <div className="border-border divide-border border-y">
            {stepItems.map((item, index) => (
              <div key={item.title} className="grid gap-4 py-6 md:grid-cols-[80px_220px_minmax(0,1fr)]">
                <div className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("faq.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">{t("faq.description")}</p>
          </div>

          <div className="border-border divide-border border-y">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="cursor-pointer list-none text-left text-lg font-semibold marker:hidden">
                  <span className="flex items-start justify-between gap-6">
                    <span>{item.question}</span>
                    <span className="text-primary text-sm font-medium transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
