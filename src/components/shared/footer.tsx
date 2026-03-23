"use client"
import { ChevronRight, Instagram, Phone, Send } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { appConfig } from "@/config/app.config"
import { Link } from "@/i18n/navigation"

const Footer = () => {
  const t = useTranslations("landingModern")

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const { app } = appConfig
  const phoneRaw = app.phone[0] ?? "+998 93 455 25 65"
  const phoneHref = `tel:${phoneRaw.replace(/[^+\d]/g, "")}`
  const currentYear = new Date().getFullYear()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <footer className="border-border bg-card border-t px-6 pt-8 pb-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="border-border mb-6 grid grid-cols-1 gap-10 border-b pb-[34px] md:grid-cols-2 md:gap-8 xl:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div>
            <Link href="/" className="text-foreground flex shrink-0 items-center gap-2.5 no-underline">
              <div className="bg-muted border-border flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-[10px] border">
                <Image src={app.assets.logoIcon} alt={t("logoAlt")} width={20} height={20} className="h-5 w-5" />
              </div>
              <span className="text-[17px] font-bold tracking-[-0.3px]">{t("brand")}</span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-[260px] text-[13px] leading-[1.6]">
              {t("footer.brandDescription")}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={app.urls.telegram}
                target="_blank"
                rel="noreferrer"
                className="bg-muted border-border text-muted-foreground hover:text-primary flex h-9 w-9 items-center justify-center rounded-[10px] border no-underline hover:bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]"
                aria-label="Telegram"
              >
                <Send size={16} />
              </a>
              <a
                href={app.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-muted border-border text-muted-foreground hover:text-primary flex h-9 w-9 items-center justify-center rounded-[10px] border no-underline hover:bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-[14px] text-[11px] font-bold tracking-[0.1em] uppercase">
              {t("footer.companyTitle")}
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-muted-foreground text-sm no-underline">
                {t("nav.about")}
              </Link>
              <Link href="/privacy" prefetch={false} className="text-muted-foreground text-sm no-underline">
                {t("nav.privacy")}
              </Link>
              <Link href="/terms" prefetch={false} className="text-muted-foreground text-sm no-underline">
                {t("nav.terms")}
              </Link>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-[14px] text-[11px] font-bold tracking-[0.1em] uppercase">
              {t("footer.contactTitle")}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={app.urls.telegram}
                target="_blank"
                rel="noreferrer"
                className="bg-muted border-border text-muted-foreground flex items-center gap-2 rounded-[10px] border px-3 py-2 text-sm no-underline"
              >
                <Send size={16} /> {t("footer.contactTelegram")}
              </a>
              <a
                href={phoneHref}
                className="bg-muted border-border text-muted-foreground flex items-center gap-2 rounded-[10px] border px-3 py-2 text-sm no-underline"
              >
                <Phone size={16} /> {phoneRaw}
              </a>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-[14px] text-[11px] font-bold tracking-[0.1em] uppercase">
              {t("footer.newsletterTitle")}
            </p>
            <p className="text-muted-foreground mb-3 text-[13px] leading-normal">{t("footer.newsletterDescription")}</p>

            {submitted ? (
              <div className="text-primary rounded-[10px] border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-4 py-2.5 text-[13px] font-semibold">
                {t("footer.joinedMessage")}
              </div>
            ) : (
              <form className="mt-0.5 flex gap-2" onSubmit={handleSubmit}>
                <input
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground h-10 flex-1 rounded-[10px] border px-[14px] text-[13px] outline-none"
                  type="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="bg-primary text-primary-foreground flex h-10 items-center gap-1 rounded-[10px] px-4 text-[13px] font-bold"
                  type="submit"
                >
                  {t("footer.newsletterButton")} <ChevronRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground m-0 text-[13px]">{t("footer.copyright", { year: currentYear })}</p>
          <div className="flex gap-5">
            <Link href="/privacy" prefetch={false} className="text-muted-foreground text-[13px] no-underline">
              {t("nav.privacy")}
            </Link>
            <Link href="/terms" prefetch={false} className="text-muted-foreground text-[13px] no-underline">
              {t("nav.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
