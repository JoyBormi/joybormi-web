"use client"

import { ChevronRight, Menu, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { AppStore } from "@/components/shared/app-store"
import { GooglePlay } from "@/components/shared/google-play"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { appConfig } from "@/config/app.config"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

type HeaderProps = {
  app?: typeof appConfig.app
  showNav?: boolean
}

const Header: React.FC<HeaderProps> = ({ app = appConfig.app, showNav = true }) => {
  const t = useTranslations("landingModern")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 border-b border-transparent transition-[background,border-color,backdrop-filter]",
          scrolled &&
            "border-border bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-[20px] [backdrop-filter:blur(20px)_saturate(1.2)] [-webkit-backdrop-filter:blur(20px)_saturate(1.2)]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-6">
          <Link href="/" className="text-foreground flex shrink-0 items-center gap-2.5 no-underline">
            <div className="bg-muted border-border flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-[10px] border">
              <Image src={app.assets.logoIcon} alt={t("logoAlt")} width={20} height={20} className="h-5 w-5" />
            </div>
            <span className="text-[17px] font-bold tracking-[-0.3px]">{t("brand")}</span>
          </Link>

          {showNav && (
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/about"
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-3.5 py-1.5 text-sm font-medium no-underline transition-[color,background]"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/privacy"
                prefetch={false}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-3.5 py-1.5 text-sm font-medium no-underline transition-[color,background]"
              >
                {t("nav.privacy")}
              </Link>
              <Link
                href="/terms"
                prefetch={false}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-3.5 py-1.5 text-sm font-medium no-underline transition-[color,background]"
              >
                {t("nav.terms")}
              </Link>
              <div className="ml-1.5">
                <LanguageToggle />
              </div>
            </nav>
          )}

          <button
            className="bg-card border-border text-foreground flex cursor-pointer rounded-[10px] border p-2 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t("menu.open")}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-200 flex translate-x-full flex-col overflow-hidden overscroll-contain bg-[color-mix(in_srgb,var(--background)_98%,transparent)] px-6 pt-5 pb-10 transition-transform duration-300",
          menuOpen && "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-foreground flex shrink-0 items-center gap-2.5 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            <div className="bg-muted border-border flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-[10px] border">
              <Image src={app.assets.logoIcon} alt={t("logoAlt")} width={20} height={20} className="h-5 w-5" />
            </div>
            <span className="text-[17px] font-bold tracking-[-0.3px]">{t("brand")}</span>
          </Link>
          <button
            className="bg-card border-border text-foreground flex cursor-pointer rounded-[10px] border p-2"
            onClick={() => setMenuOpen(false)}
            aria-label={t("menu.close")}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          <Link
            href="/about"
            className="border-border text-foreground flex items-center justify-between border-b py-3 text-[28px] font-semibold no-underline"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.about")} <ChevronRight size={14} />
          </Link>
          <Link
            href="/support"
            className="border-border text-foreground flex items-center justify-between border-b py-3 text-[28px] font-semibold no-underline"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.support")} <ChevronRight size={14} />
          </Link>
          <Link
            href="/privacy"
            prefetch={false}
            className="border-border text-foreground flex items-center justify-between border-b py-3 text-[28px] font-semibold no-underline"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.privacy")} <ChevronRight size={14} />
          </Link>
          <Link
            href="/terms"
            prefetch={false}
            className="border-border text-foreground flex items-center justify-between border-b py-3 text-[28px] font-semibold no-underline"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.terms")} <ChevronRight size={14} />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <LanguageToggle />
          </div>
          <AppStore href={app.urls.appStore} className="mx-auto h-12! w-full! max-w-[230px]! rounded-[14px]!" />
          <GooglePlay href={app.urls.googlePlay} className="mx-auto h-12! w-full! max-w-[230px]! rounded-[14px]!" />
        </div>
      </div>
    </>
  )
}

export { Header }
