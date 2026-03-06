import Image from "next/image"
import { type FormEvent, useState } from "react"

import { Link } from "@/i18n/navigation"

import { ChevronRightIcon, InstagramIcon, PhoneIcon, TelegramIcon } from "./landing-icons"

type FooterTexts = {
  brand: string
  logoAlt: string
  brandDescription: string
  companyTitle: string
  contactTitle: string
  newsletterTitle: string
  newsletterDescription: string
  newsletterPlaceholder: string
  newsletterButton: string
  joinedMessage: string
  copyright: string
  companyAbout: string
  companyPrivacy: string
  companyTerms: string
  contactTelegram: string
}

type LandingFooterProps = {
  texts: FooterTexts
  telegramUrl: string
  instagramUrl: string
  phoneHref: string
  phoneRaw: string
}

function LandingFooter({ texts, telegramUrl, instagramUrl, phoneHref, phoneRaw }: LandingFooterProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <footer className="jl-footer">
      <div className="jl-footer-inner">
        <div className="jl-footer-grid">
          <section className="jl-footer-brand">
            <Link href="/" className="jl-logo">
              <span className="jl-logo-icon-wrap">
                <Image src="/images/icon.png" alt={texts.logoAlt} width={20} height={20} className="jl-logo-icon" />
              </span>
              <span className="jl-logo-text">{texts.brand}</span>
            </Link>
            <p>{texts.brandDescription}</p>
            <div className="jl-social-row">
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="jl-social-btn" aria-label="Telegram">
                <TelegramIcon />
              </a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="jl-social-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </section>

          <section>
            <h3 className="jl-footer-col-title">{texts.companyTitle}</h3>
            <nav className="jl-footer-links">
              <Link href="/about">{texts.companyAbout}</Link>
              <Link href="/privacy">{texts.companyPrivacy}</Link>
              <Link href="/terms">{texts.companyTerms}</Link>
            </nav>
          </section>

          <section>
            <h3 className="jl-footer-col-title">{texts.contactTitle}</h3>
            <div className="jl-contact-links">
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="jl-contact-link">
                <TelegramIcon /> {texts.contactTelegram}
              </a>
              <a href={phoneHref} className="jl-contact-link">
                <PhoneIcon /> {phoneRaw}
              </a>
            </div>
          </section>

          <section>
            <h3 className="jl-footer-col-title">{texts.newsletterTitle}</h3>
            <p className="jl-footer-news-desc">{texts.newsletterDescription}</p>

            {submitted ? (
              <div className="jl-news-success">{texts.joinedMessage}</div>
            ) : (
              <form className="jl-newsletter-form" onSubmit={handleSubmit}>
                <input
                  className="jl-newsletter-input"
                  type="email"
                  placeholder={texts.newsletterPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="jl-newsletter-submit" type="submit">
                  {texts.newsletterButton} <ChevronRightIcon />
                </button>
              </form>
            )}
          </section>
        </div>

        <div className="jl-footer-bottom">
          <p className="jl-footer-copy">{texts.copyright}</p>
          <div className="jl-footer-links-row">
            <Link href="/privacy">{texts.companyPrivacy}</Link>
            <Link href="/terms">{texts.companyTerms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { LandingFooter }
