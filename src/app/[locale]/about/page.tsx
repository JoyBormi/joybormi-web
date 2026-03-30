import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { CareersCta } from "@/app/[locale]/about/careers-cta"
import { Header } from "@/components/shared/header"
import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"

type AboutPageProps = {
  params: Promise<{ locale: string }>
}

type FaqItem = {
  question: string
  answer: string
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const keywords = t.raw("meta.about.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/about",
    title: t("meta.about.title"),
    description: t("meta.about.description"),
    keywords,
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.about" })
  const faqItems = t.raw("faq.items") as FaqItem[]
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <main className="jb-landing bg-background text-foreground flex min-h-screen flex-col [font-family:var(--font-pretendard),var(--font-sans),sans-serif]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-48 sm:pb-32 lg:px-8">
        <div className="jb-glow-orb jb-glow-orb-main absolute -top-24 left-1/2 -translate-x-1/2 opacity-50" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-[14px] py-[6px] pl-2 duration-700">
            <div className="bg-primary h-5 w-5 rounded-full" />
            <span className="text-primary text-[13px] font-semibold">{t("journeyBadge")}</span>
          </div>

          <h1 className="animate-in fade-in slide-in-from-bottom-4 mb-8 text-[clamp(2.6rem,5vw,4.9rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase delay-100 duration-700 max-md:text-[clamp(2.2rem,10vw,2.8rem)]">
            {t.rich("headline", {
              accent: () => <em className="text-primary block not-italic sm:inline">{t("headlineAccent")}</em>,
            })}
          </h1>

          <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-6 mx-auto max-w-[560px] text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.72] delay-200 duration-700 max-md:max-w-full">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="mx-auto mb-32 max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{t("mission.title")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("mission.body")}</p>
            <div className="pt-4">
              <div className="text-primary flex items-center gap-4 font-semibold">
                <span className="bg-primary h-1 w-12 rounded-full" />
                {t("mission.footer")}
              </div>
            </div>
          </div>
          <div className="bg-muted/50 border-border relative aspect-square overflow-hidden rounded-3xl border shadow-2xl sm:aspect-video">
            <div className="from-primary/20 absolute inset-0 bg-linear-to-br to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-white">
                  <span className="text-2xl font-bold">JB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-[14px] py-[6px] pl-2">
            <div className="bg-primary h-5 w-5 rounded-full" />
            <span className="text-primary text-[13px] font-semibold">{t("faq.badge")}</span>
          </div>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">{t("faq.description")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-border rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <summary className="text-foreground cursor-pointer list-none text-left text-lg font-semibold marker:hidden">
                <span className="inline-flex items-center gap-3">
                  <span className="bg-primary h-2.5 w-2.5 rounded-full transition-transform duration-300 group-open:scale-125" />
                  {item.question}
                </span>
              </summary>
              <p className="text-muted-foreground pt-4 pl-5 text-base leading-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 px-6 pb-24 lg:px-8">
        <div className="bg-foreground relative overflow-hidden rounded-3xl px-6 py-24 text-center shadow-2xl sm:px-16">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">{t("cta.description")}</p>
            <div className="mt-10 flex justify-center">
              <CareersCta label={t("cta.button")} description={t("cta.description")} comingSoon={t("cta.comingSoon")} />
            </div>
          </div>
          <div className="bg-primary/20 absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  )
}
