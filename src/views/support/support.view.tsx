import { ArrowUpRight, Mail, MessageCircleHeart, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Header } from "@/components/shared/header"
import { appConfig } from "@/config/app.config"
import { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

type SupportViewProps = {
  locale: Locale
}

type ChannelItem = {
  title: string
  description: string
  cta: string
}

type ResourceItem = {
  title: string
  body: string
}

type FaqItem = {
  question: string
  answer: string
}

const channelIcons = [MessageCircleHeart, Mail, Phone]

export async function SupportView({ locale }: SupportViewProps) {
  const t = await getTranslations({ locale, namespace: "landingModern.support" })
  const channels = t.raw("channels.items") as ChannelItem[]
  const resources = t.raw("resources.items") as ResourceItem[]
  const faqItems = t.raw("faq.items") as FaqItem[]

  const phoneRaw = appConfig.app.phone[0] ?? "+998 93 455 25 65"
  const phoneHref = `tel:${phoneRaw.replace(/[^+\d]/g, "")}`
  const emailHref = `mailto:${appConfig.app.email}`
  const telegramHref = appConfig.app.urls.telegram
  const telegramLabel = appConfig.app.urls.telegram.replace("https://t.me/", "@")

  const channelLinks = [telegramHref, emailHref, phoneHref]
  const contactDetails = [telegramLabel, appConfig.app.email, phoneRaw]

  return (
    <main className="jb-landing bg-background text-foreground min-h-screen [font-family:var(--font-pretendard),var(--font-sans),sans-serif]">
      <Header />

      <section className="px-5 pt-24 pb-12 sm:px-6 sm:pt-36 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("eyebrow")}</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,12vw,4.9rem)] leading-[0.96] font-extrabold tracking-[-0.04em] break-words uppercase sm:leading-[0.94] sm:tracking-[-0.05em]">
            {t("headline")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-background">
            {channels.map((item, index) => {
              const Icon = channelIcons[index] ?? MessageCircleHeart
              const href = channelLinks[index] ?? telegramHref

              return (
                <a
                  key={item.title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className={cn(
                    "group relative flex min-w-0 flex-col gap-4 py-5 transition-all",
                    "md:flex-row md:items-center md:gap-6 md:px-6 md:py-6",
                    index !== channels.length - 1 && "border-border/50 border-b"
                  )}
                >
                  {/* LEFT */}
                  <div className="flex min-w-0 items-center gap-3 md:min-w-[180px]">
                    <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl transition group-hover:scale-105">
                      <Icon size={16} />
                    </div>

                    <p className="min-w-0 text-sm font-semibold tracking-tight break-words">{item.title}</p>
                  </div>

                  {/* MIDDLE */}
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground text-sm leading-6 md:text-base">{item.description}</p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:justify-end md:text-right">
                    <div className="text-muted-foreground min-w-0 text-xs break-all md:text-sm">
                      {contactDetails[index]}
                    </div>

                    <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
                      {item.cta}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>

                  {/* subtle hover glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100">
                    <div className="from-primary/5 absolute inset-0 rounded-xl bg-linear-to-r to-transparent" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
          </div>

          <div>
            {resources.map((item) => (
              <div
                key={item.title}
                className="grid min-w-0 gap-3 py-5 sm:gap-4 sm:py-6 md:grid-cols-[220px_minmax(0,1fr)]"
              >
                <h3 className="text-lg font-semibold tracking-tight break-words">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">{t("faq.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">{t("faq.description")}</p>
          </div>

          <div>
            {faqItems.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="cursor-pointer list-none text-left text-base font-semibold marker:hidden sm:text-lg">
                  <span className="flex items-start justify-between gap-6">
                    <span className="min-w-0 break-words">{item.question}</span>
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
