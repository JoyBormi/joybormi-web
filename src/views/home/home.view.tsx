"use client"

import { ChevronRight, Instagram, Menu, Phone, Send, Sparkles, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { type FormEvent, useEffect, useState } from "react"

import { AndroidMockup } from "@/components/shared/android-mockup"
import { AppStore } from "@/components/shared/app-store"
import { GooglePlay } from "@/components/shared/google-play"
import { IPhoneMockup } from "@/components/shared/iphone-mockup"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { QrCode } from "@/components/shared/qr-code"
import { appConfig } from "@/config/app.config"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const HomeView = () => {
  const t = useTranslations("landingModern")

  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { app } = appConfig
  const phoneRaw = app.phone[0] ?? "+998 93 455 25 65"
  const phoneHref = `tel:${phoneRaw.replace(/[^+\d]/g, "")}`
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <div className="jb-landing overflow-x-hidden">
      <div className={cn("jb-mobile-menu", { open: menuOpen })}>
        <div className="jb-mobile-header">
          <Link href="/" className="jb-logo" onClick={() => setMenuOpen(false)}>
            <div className="jb-logo-icon">
              <Image src={app.assets.logoIcon} alt={t("logoAlt")} width={20} height={20} className="jb-logo-image" />
            </div>
            <span className="jb-logo-text">{t("brand")}</span>
          </Link>
          <button className="jb-menu-btn" onClick={() => setMenuOpen(false)} aria-label={t("menu.close")}>
            <X size={20} />
          </button>
        </div>

        <nav>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            {t("nav.about")} <ChevronRight size={14} />
          </Link>
          <Link href="/privacy" onClick={() => setMenuOpen(false)}>
            {t("nav.privacy")} <ChevronRight size={14} />
          </Link>
          <Link href="/terms" onClick={() => setMenuOpen(false)}>
            {t("nav.terms")} <ChevronRight size={14} />
          </Link>
        </nav>

        <div className="jb-mobile-actions">
          <div className="flex items-center justify-center">
            <LanguageToggle />
          </div>
          <AppStore href={app.urls.appStore} className="jb-store-badge jb-store-badge-primary jb-store-badge-center" />
          <GooglePlay
            href={app.urls.googlePlay}
            className="jb-store-badge jb-store-badge-secondary jb-store-badge-center"
          />
        </div>
      </div>

      <header className={cn("jb-header", { scrolled })}>
        <div className="jb-header-inner">
          <Link href="/" className="jb-logo">
            <div className="jb-logo-icon">
              <Image src={app.assets.logoIcon} alt={t("logoAlt")} width={20} height={20} className="jb-logo-image" />
            </div>
            <span className="jb-logo-text">{t("brand")}</span>
          </Link>

          <nav className="jb-nav">
            <Link href="/about">{t("nav.about")}</Link>
            <Link href="/privacy">{t("nav.privacy")}</Link>
            <Link href="/terms">{t("nav.terms")}</Link>
            <div className="jb-nav-language">
              <LanguageToggle />
            </div>
          </nav>

          <button className="jb-menu-btn" onClick={() => setMenuOpen(true)} aria-label={t("menu.open")}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      <section className="jb-hero">
        <div className="jb-hero-inner">
          <div className="jb-hero-left">
            <div className="jb-badge jb-fade-up jb-fade-up-1">
              <div className="jb-badge-dot">
                <Sparkles size={11} />
              </div>
              <span>{t("badge")}</span>
            </div>

            <h1 className="jb-headline jb-fade-up jb-fade-up-2">
              {t("headlineTop")}
              <br />
              <em>{t("headlineAccent")}</em>
              <br />
              {t("headlineBottom")}
            </h1>

            <p className="jb-description jb-fade-up jb-fade-up-3">{t("description")}</p>

            <div className="jb-download-row jb-fade-up jb-fade-up-4">
              <AppStore href={app.urls.appStore} className="jb-store-badge jb-store-badge-primary" />
              <GooglePlay href={app.urls.googlePlay} className="jb-store-badge jb-store-badge-secondary" />
            </div>

            <div className="jb-qr-row jb-fade-up jb-fade-up-5">
              <div className="jb-qr-code-wrap">
                <QrCode value={app.urls.site} size={84} />
              </div>
              <div className="jb-qr-text">
                <strong>{t("qr.title")}</strong>
                {t("qr.description")}
              </div>
            </div>
          </div>

          <div className="jb-hero-right">
            <div className="jb-glow-orb jb-glow-orb-main" />
            <div className="jb-phone-primary">
              <IPhoneMockup
                className="jb-mockup-iphone"
                imageSrc={app.assets.primaryScreen}
                imageAlt={t("phone.primaryAlt")}
                priority
              />
            </div>
            <div className="jb-phone-secondary">
              <AndroidMockup
                className="jb-mockup-android"
                imageSrc={app.assets.secondaryScreen}
                imageAlt={t("phone.secondaryAlt")}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="jb-footer">
        <div className="jb-footer-inner">
          <div className="jb-footer-grid">
            <div className="jb-footer-brand">
              <Link href="/" className="jb-logo jb-footer-logo">
                <div className="jb-logo-icon">
                  <Image
                    src={app.assets.logoIcon}
                    alt={t("logoAlt")}
                    width={20}
                    height={20}
                    className="jb-logo-image"
                  />
                </div>
                <span className="jb-logo-text">{t("brand")}</span>
              </Link>
              <p>{t("footer.brandDescription")}</p>
              <div className="jb-social-row jb-social-row-top">
                <a
                  href={app.urls.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="jb-social-btn"
                  aria-label="Telegram"
                >
                  <Send size={16} />
                </a>
                <a
                  href={app.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="jb-social-btn"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            <div>
              <p className="jb-footer-col-title">{t("footer.companyTitle")}</p>
              <div className="jb-footer-links">
                <Link href="/about">{t("nav.about")}</Link>
                <Link href="/privacy">{t("nav.privacy")}</Link>
                <Link href="/terms">{t("nav.terms")}</Link>
              </div>
            </div>

            <div>
              <p className="jb-footer-col-title">{t("footer.contactTitle")}</p>
              <div className="jb-contact-links">
                <a href={app.urls.telegram} target="_blank" rel="noreferrer" className="jb-contact-link">
                  <Send size={16} /> {t("footer.contactTelegram")}
                </a>
                <a href={phoneHref} className="jb-contact-link">
                  <Phone size={16} /> {phoneRaw}
                </a>
              </div>
            </div>

            <div>
              <p className="jb-footer-col-title">{t("footer.newsletterTitle")}</p>
              <p className="jb-newsletter-description">{t("footer.newsletterDescription")}</p>

              {submitted ? (
                <div className="jb-news-success">{t("footer.joinedMessage")}</div>
              ) : (
                <form className="jb-newsletter-form" onSubmit={handleSubmit}>
                  <input
                    className="jb-newsletter-input"
                    type="email"
                    placeholder={t("footer.newsletterPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="jb-newsletter-submit" type="submit">
                    {t("footer.newsletterButton")} <ChevronRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="jb-footer-bottom">
            <p className="jb-footer-copy">{t("footer.copyright", { year: currentYear })}</p>
            <div className="jb-footer-links-row">
              <Link href="/privacy">{t("nav.privacy")}</Link>
              <Link href="/terms">{t("nav.terms")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { HomeView }
