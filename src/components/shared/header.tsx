"use client"
import { ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AppStore } from "@/components/shared/app-store"
import { GooglePlay } from "@/components/shared/google-play"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { appConfig } from "@/config/app.config"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

type HeaderProps = {
  app: typeof appConfig.app
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ app, menuOpen, setMenuOpen }) => {
  const t = useTranslations("landingModern")
  return (
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
  )
}

export { Header }
