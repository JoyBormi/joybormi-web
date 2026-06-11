"use client"

import {
  CalendarCheck,
  ChevronRight,
  CreditCard,
  Grid2X2,
  LockKeyhole,
  Menu,
  MousePointer2,
  Star,
  X,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

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
  const [scrolled, setScrolled] = useState(false)

  const { app } = appConfig

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
          <div className="jb-hero-content">
            <div className="jb-hero-elements" aria-hidden="true">
              <div className="jb-float-token jb-token-card jb-token-card-pay">
                <CreditCard size={22} />
                <span>Pay</span>
              </div>
              <div className="jb-float-token jb-token-card jb-token-card-time">
                <CalendarCheck size={22} />
                <span>Pick time</span>
              </div>
              <div className="jb-float-token jb-token-card jb-token-card-confirm">
                <MousePointer2 size={24} />
                <span>Confirm</span>
              </div>
              <div className="jb-float-token jb-token-toggle">
                <span />
              </div>
              <div className="jb-float-token jb-token-lock">
                <Zap size={30} />
                <LockKeyhole size={34} />
              </div>
            </div>

            <h1 className="jb-headline jb-fade-up jb-fade-up-2">
              {t("headlineTop")}
              <em className="inline px-2 md:block md:px-0"> {t("headlineAccent")}</em> {t("headlineBottom")}
            </h1>

            <p className="jb-description jb-fade-up jb-fade-up-3">{t("description")}</p>

            <div className="jb-download-row jb-fade-up jb-fade-up-4">
              <AppStore href={app.urls.appStore} />
              <GooglePlay href={app.urls.googlePlay} />
            </div>
          </div>

          <div className="jb-hero-stage jb-fade-up jb-fade-up-5">
            <div className="jb-glow-orb jb-glow-orb-main" />

            <div className="jb-service-card jb-service-card-left">
              <div className="jb-service-avatar">
                <Image src={app.assets.logoIcon} alt="" width={42} height={42} />
              </div>
              <div>
                <strong>{t("brand")}</strong>
                <span>{t("badge")}</span>
                <small>
                  <Star size={13} fill="currentColor" /> 4.9
                </small>
              </div>
            </div>

            <div className="jb-service-card jb-service-card-right">
              <div className="jb-chip-icon">
                <Grid2X2 size={18} />
              </div>
              <div>
                <strong>{t("qr.title")}</strong>
                <span>{t("qr.description")}</span>
              </div>
            </div>

            <div className="jb-rating-chip inline-flex items-center gap-2">
              <Star size={18} />
              <span>4.9</span>
              <small>Rating</small>
            </div>

            <div className="jb-qr-row jb-hero-qr">
              <div className="jb-qr-code-wrap">
                <QrCode value={app.urls.site} size={72} />
              </div>
            </div>

            <div className="jb-phone-secondary">
              <IPhoneMockup
                className="jb-mockup-iphone"
                imageSrc={app.assets.secondaryScreen}
                imageAlt={t("phone.secondaryAlt")}
              />
            </div>

            <div className="jb-phone-primary">
              <IPhoneMockup
                className="jb-mockup-iphone"
                imageSrc={app.assets.primaryScreen}
                imageAlt={t("phone.primaryAlt")}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export { HomeView }
