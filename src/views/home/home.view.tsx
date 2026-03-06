"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { LanguageToggle } from "@/components/shared/language-toggle"
import { QrCode } from "@/components/shared/qr-code"
import { appConfig } from "@/config/app.config"

const APP_STORE_URL = "https://apps.apple.com"
const GOOGLE_PLAY_URL = "https://play.google.com/store"
const TELEGRAM_URL = "https://t.me/joybormi"
const INSTAGRAM_URL = appConfig.app.social.instagram
const QR_TARGET_URL = "https://joybormiapp.uz"

const PRIMARY_SCREEN = "/images/mockup-screen-1.png"
const SECONDARY_SCREEN = "/images/mockup-screen-2.png"

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }} aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      style={{ width: 16, height: 16 }}
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.5 7.55a16 16 0 006.95 6.95l1.72-1.25a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      style={{ width: 14, height: 14 }}
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      style={{ width: 20, height: 20 }}
      aria-hidden="true"
    >
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      style={{ width: 20, height: 20 }}
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

function PhoneMockup({
  imageSrc,
  style,
  className = "",
}: {
  imageSrc?: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div className={className} style={{ position: "relative", width: 220, ...style }}>
      <div
        style={{
          width: 220,
          height: 440,
          borderRadius: 36,
          background: "linear-gradient(145deg, color-mix(in srgb, var(--foreground) 95%, #000) 0%, #000 100%)",
          boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--foreground) 20%, transparent), 0 32px 80px rgba(0,0,0,0.45)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 22,
            borderRadius: 20,
            background: "#000",
            zIndex: 10,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            overflow: "hidden",
            background: "var(--muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <Image src={imageSrc} alt="App screen" fill sizes="220px" style={{ objectFit: "cover" }} />
          ) : (
            <div style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>JoyBormi</div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: -2,
            top: 80,
            width: 3,
            height: 28,
            borderRadius: "2px 0 0 2px",
            background: "#222",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: 116,
            width: 3,
            height: 44,
            borderRadius: "2px 0 0 2px",
            background: "#222",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: 168,
            width: 3,
            height: 44,
            borderRadius: "2px 0 0 2px",
            background: "#222",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -2,
            top: 104,
            width: 3,
            height: 60,
            borderRadius: "0 2px 2px 0",
            background: "#222",
          }}
        />
      </div>
    </div>
  )
}

const HomeView = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  const phoneRaw = appConfig.app.phone[0] ?? "+998 93 455 25 65"
  const phoneHref = `tel:${phoneRaw.replace(/[^+\d]/g, "")}`

  return (
    <>
      <style>{`
        .jb-landing *,.jb-landing *::before,.jb-landing *::after{box-sizing:border-box;margin:0;padding:0}

        .jb-landing{
          --jb-bg: var(--background);
          --jb-bg2: var(--card);
          --jb-surface: var(--card);
          --jb-surface2: var(--muted);
          --jb-border: var(--border);
          --jb-border-strong: var(--border);
          --jb-text: var(--foreground);
          --jb-text-muted: var(--muted-foreground);
          --jb-text-subtle: var(--muted-foreground);
          --jb-accent: var(--primary);
          --jb-accent-dim: color-mix(in srgb, var(--primary) 14%, transparent);
          --jb-accent-glow: color-mix(in srgb, var(--primary) 26%, transparent);
          --jb-radius: 20px;
          background: var(--jb-bg);
          color: var(--jb-text);
          min-height: 100dvh;
          display:flex;
          flex-direction:column;
          font-family: var(--font-sans);
        }

        .jb-header{position:fixed;top:0;left:0;right:0;z-index:100;transition:background .3s,border-color .3s,backdrop-filter .3s;border-bottom:1px solid transparent}
        .jb-header.scrolled{background:color-mix(in srgb,var(--jb-bg) 88%,transparent);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);border-bottom-color:var(--jb-border)}
        .jb-header-inner{max-width:1600px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .jb-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--jb-text);flex-shrink:0}
        .jb-logo-icon{width:34px;height:34px;border-radius:10px;background:var(--jb-surface2);border:1px solid var(--jb-border);display:flex;align-items:center;justify-content:center;overflow:hidden}
        .jb-logo-text{font-weight:700;font-size:17px;letter-spacing:-0.3px}

        .jb-nav{display:flex;align-items:center;gap:4px}
        .jb-nav a{color:var(--jb-text-muted);text-decoration:none;font-size:14px;font-weight:500;padding:6px 14px;border-radius:100px;transition:color .2s,background .2s}
        .jb-nav a:hover{color:var(--jb-text);background:var(--jb-surface2)}
        .jb-nav-cta{background:var(--jb-accent)!important;color:var(--primary-foreground)!important;font-weight:700!important;margin-left:6px}

        .jb-menu-btn{display:none;background:var(--jb-surface);border:1px solid var(--jb-border);color:var(--jb-text);border-radius:10px;padding:8px;cursor:pointer}

        .jb-mobile-menu{position:fixed;inset:0;z-index:200;background:color-mix(in srgb,var(--jb-bg) 96%,transparent);display:flex;flex-direction:column;padding:20px 24px 40px;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}
        .jb-mobile-menu.open{transform:none}
        .jb-mobile-header{display:flex;align-items:center;justify-content:space-between;height:64px}
        .jb-mobile-menu nav{margin-top:24px;display:flex;flex-direction:column;gap:4px}
        .jb-mobile-menu nav a{color:var(--jb-text);text-decoration:none;font-weight:600;font-size:28px;padding:12px 0;border-bottom:1px solid var(--jb-border);display:flex;align-items:center;justify-content:space-between}

        .jb-hero{flex:1;padding-top:80px;padding-bottom:56px}
        .jb-hero-inner{max-width:1600px;margin:0 auto;padding:56px 24px 0;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;min-height:calc(100dvh - 64px)}
        .jb-hero-left{display:flex;flex-direction:column;gap:28px}

        .jb-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;background:var(--jb-accent-dim);border:1px solid color-mix(in srgb,var(--jb-accent) 30%,transparent);border-radius:100px;width:fit-content}
        .jb-badge-dot{width:20px;height:20px;border-radius:50%;background:var(--jb-accent);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--primary-foreground)}
        .jb-badge span{font-size:13px;font-weight:600;color:var(--jb-accent)}

        .jb-headline{font-weight:800;font-size:clamp(2.6rem,5vw,4.9rem);line-height:.95;letter-spacing:-.04em;text-transform:uppercase}
        .jb-headline em{font-style:normal;color:var(--jb-accent)}

        .jb-description{font-size:clamp(1rem,1.5vw,1.15rem);color:var(--jb-text-muted);line-height:1.65;max-width:520px}

        .jb-download-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
        .jb-dl-btn{display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:14px;text-decoration:none;font-weight:500;font-size:14px;transition:transform .2s,bg .2s;border:none}
        .jb-dl-btn:hover{transform:translateY(-2px)}
        .jb-dl-btn-primary{background:var(--jb-text);color:var(--background)}
        .jb-dl-btn-secondary{background:var(--jb-surface2);color:var(--jb-text);border:1px solid var(--jb-border)}
        .jb-dl-btn-label{display:flex;flex-direction:column;gap:1px;line-height:1}
        .jb-dl-btn-sub{font-size:10px;font-weight:400;opacity:.75}
        .jb-dl-btn-main{font-size:15px;font-weight:700}

        .jb-qr-row{display:flex;align-items:center;gap:14px;padding:16px;background:var(--jb-surface);border:1px solid var(--jb-border);border-radius:16px;width:fit-content}
        .jb-qr-text{font-size:13px;color:var(--jb-text-muted);line-height:1.5;max-width:170px}
        .jb-qr-text strong{color:var(--jb-text);font-weight:600;display:block;margin-bottom:2px}

        .jb-hero-right{position:relative;height:540px;display:flex;align-items:flex-end;justify-content:center}
        .jb-phone-primary{position:absolute;bottom:0;left:50%;transform:translateX(-65%) rotate(-8deg);animation:jb-float-left 5s ease-in-out infinite;z-index:2}
        .jb-phone-secondary{position:absolute;bottom:0;left:50%;transform:translateX(-10%) rotate(10deg);animation:jb-float-right 5s ease-in-out infinite;animation-delay:.5s;z-index:1}
        @keyframes jb-float-left{0%,100%{transform:translateX(-65%) rotate(-8deg) translateY(0)}50%{transform:translateX(-65%) rotate(-8deg) translateY(-14px)}}
        @keyframes jb-float-right{0%,100%{transform:translateX(-10%) rotate(10deg) translateY(-8px)}50%{transform:translateX(-10%) rotate(10deg) translateY(6px)}}

        .jb-glow-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}

        .jb-stats-bar{background:var(--jb-surface);border-top:1px solid var(--jb-border);border-bottom:1px solid var(--jb-border);padding:0 24px}
        .jb-stats-inner{max-width:1600px;margin:0 auto;display:flex;align-items:stretch}
        .jb-stat-item{flex:1;padding:26px 32px;display:flex;flex-direction:column;gap:4px;border-right:1px solid var(--jb-border)}
        .jb-stat-item:first-child{padding-left:0}.jb-stat-item:last-child{border-right:none;padding-right:0}
        .jb-stat-value{font-weight:800;font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.04em}
        .jb-stat-value span{color:var(--jb-accent)}
        .jb-stat-label{font-size:13px;color:var(--jb-text-muted)}

        .jb-footer{background:var(--jb-surface);border-top:1px solid var(--jb-border);padding:40px 24px 28px}
        .jb-footer-inner{max-width:1600px;margin:0 auto}
        .jb-footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.5fr;gap:40px;padding-bottom:34px;border-bottom:1px solid var(--jb-border);margin-bottom:24px}
        .jb-footer-brand p{font-size:13px;color:var(--jb-text-muted);line-height:1.6;margin-top:12px;max-width:260px}
        .jb-footer-col-title{font-size:11px;font-weight:700;color:var(--jb-text-subtle);letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
        .jb-footer-links{display:flex;flex-direction:column;gap:8px}
        .jb-footer-links a{color:var(--jb-text-muted);text-decoration:none;font-size:14px}
        .jb-social-row{display:flex;gap:8px}
        .jb-social-btn{width:36px;height:36px;border-radius:10px;background:var(--jb-surface2);border:1px solid var(--jb-border);display:flex;align-items:center;justify-content:center;color:var(--jb-text-muted);text-decoration:none}
        .jb-social-btn:hover{background:var(--jb-accent-dim);color:var(--jb-accent)}

        .jb-contact-links{display:flex;flex-direction:column;gap:8px}
        .jb-contact-link{display:flex;align-items:center;gap:8px;color:var(--jb-text-muted);text-decoration:none;font-size:14px;padding:8px 12px;background:var(--jb-surface2);border-radius:10px;border:1px solid var(--jb-border)}

        .jb-newsletter-form{display:flex;gap:8px;margin-top:2px}
        .jb-newsletter-input{flex:1;height:40px;border-radius:10px;background:var(--jb-surface2);border:1px solid var(--jb-border);color:var(--jb-text);font-size:13px;padding:0 14px;font-family:var(--font-sans);outline:none}
        .jb-newsletter-input::placeholder{color:var(--jb-text-subtle)}
        .jb-newsletter-submit{height:40px;padding:0 16px;border-radius:10px;background:var(--jb-accent);color:var(--primary-foreground);font-size:13px;font-weight:700;border:none;cursor:pointer;font-family:var(--font-sans);display:flex;align-items:center;gap:4px}

        .jb-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .jb-footer-copy{font-size:13px;color:var(--jb-text-subtle)}
        .jb-footer-links-row{display:flex;gap:20px}
        .jb-footer-links-row a{font-size:13px;color:var(--jb-text-subtle);text-decoration:none}

        @media (max-width: 1024px){
          .jb-hero-inner{grid-template-columns:1fr;min-height:auto;padding-bottom:52px;gap:56px}
          .jb-hero-right{height:400px}
          .jb-footer-grid{grid-template-columns:1fr 1fr;gap:32px}
          .jb-stats-inner{flex-wrap:wrap}
          .jb-stat-item{flex:1 1 40%;padding:20px 16px}
          .jb-stat-item:nth-child(2){border-right:none}
        }

        @media (max-width: 768px){
          .jb-nav{display:none}
          .jb-menu-btn{display:flex}
          .jb-hero-inner{padding:34px 24px 0}
          .jb-headline{font-size:2.45rem}
          .jb-hero-right{height:340px}
          .jb-footer-grid{grid-template-columns:1fr;gap:28px}
          .jb-stat-item{flex:1 1 100%;border-right:none;border-bottom:1px solid var(--jb-border);padding:16px 0}
          .jb-stat-item:last-child{border-bottom:none}
          .jb-stats-inner{flex-direction:column}
        }

        @keyframes jb-fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .jb-fade-up{animation:jb-fade-up .6s ease both}
        .jb-fade-up-1{animation-delay:.05s}.jb-fade-up-2{animation-delay:.15s}.jb-fade-up-3{animation-delay:.25s}.jb-fade-up-4{animation-delay:.35s}.jb-fade-up-5{animation-delay:.45s}
      `}</style>

      <div className="jb-landing">
        <div className={`jb-mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="jb-mobile-header">
            <Link href="/" className="jb-logo" onClick={() => setMenuOpen(false)}>
              <div className="jb-logo-icon">
                <Image src="/images/icon.png" alt="JoyBormi" width={20} height={20} style={{ width: 20, height: 20 }} />
              </div>
              <span className="jb-logo-text">JoyBormi</span>
            </Link>
            <button className="jb-menu-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>

          <nav>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About <ChevronRightIcon />
            </Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)}>
              Privacy <ChevronRightIcon />
            </Link>
            <Link href="/terms" onClick={() => setMenuOpen(false)}>
              Terms <ChevronRightIcon />
            </Link>
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "flex-start" }}>
              <LanguageToggle />
            </div>
            <a href={APP_STORE_URL} className="jb-dl-btn jb-dl-btn-primary" style={{ justifyContent: "center" }}>
              <AppleIcon />
              <div className="jb-dl-btn-label">
                <div className="jb-dl-btn-sub">Download on the</div>
                <div className="jb-dl-btn-main">App Store</div>
              </div>
            </a>
            <a href={GOOGLE_PLAY_URL} className="jb-dl-btn jb-dl-btn-secondary" style={{ justifyContent: "center" }}>
              <PlayIcon />
              <div className="jb-dl-btn-label">
                <div className="jb-dl-btn-sub">Get it on</div>
                <div className="jb-dl-btn-main">Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <header className={`jb-header ${scrolled ? "scrolled" : ""}`}>
          <div className="jb-header-inner">
            <Link href="/" className="jb-logo">
              <div className="jb-logo-icon">
                <Image src="/images/icon.png" alt="JoyBormi" width={20} height={20} style={{ width: 20, height: 20 }} />
              </div>
              <span className="jb-logo-text">JoyBormi</span>
            </Link>

            <nav className="jb-nav">
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href={APP_STORE_URL} className="jb-nav-cta">
                Download
              </a>
              <div style={{ marginLeft: 6 }}>
                <LanguageToggle />
              </div>
            </nav>

            <button className="jb-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
          </div>
        </header>
        <section className="jb-hero">
          <div className="jb-hero-inner">
            <div className="jb-hero-left">
              <div className="jb-badge jb-fade-up jb-fade-up-1">
                <div className="jb-badge-dot">✦</div>
                <span>Available on iOS & Android</span>
              </div>

              <h1 className="jb-headline jb-fade-up jb-fade-up-2">
                Find Your
                <br />
                <em>Joy,</em>
                <br />
                Anytime
              </h1>

              <p className="jb-description jb-fade-up jb-fade-up-3">
                JoyBormi brings everything you love together in one beautifully crafted app. Discover, connect, and
                enjoy a seamless experience built for modern life.
              </p>

              <div className="jb-download-row jb-fade-up jb-fade-up-4">
                <a href={APP_STORE_URL} className="jb-dl-btn jb-dl-btn-primary">
                  <AppleIcon />
                  <div className="jb-dl-btn-label">
                    <div className="jb-dl-btn-sub">Download on the</div>
                    <div className="jb-dl-btn-main">App Store</div>
                  </div>
                </a>
                <a href={GOOGLE_PLAY_URL} className="jb-dl-btn jb-dl-btn-secondary">
                  <PlayIcon />
                  <div className="jb-dl-btn-label">
                    <div className="jb-dl-btn-sub">Get it on</div>
                    <div className="jb-dl-btn-main">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="jb-qr-row jb-fade-up jb-fade-up-5">
                <div style={{ width: 92, height: 92, display: "grid", placeItems: "center" }}>
                  <QrCode value={QR_TARGET_URL} size={84} />
                </div>
                <div className="jb-qr-text">
                  <strong>Scan to download</strong>
                  Point your camera at the QR code to get JoyBormi instantly.
                </div>
              </div>
            </div>

            <div className="jb-hero-right">
              <div
                className="jb-glow-orb"
                style={{
                  width: 500,
                  height: 500,
                  bottom: 60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "radial-gradient(circle, var(--jb-accent-glow) 0%, transparent 70%)",
                }}
              />

              <div className="jb-phone-primary jb-fade-up">
                <PhoneMockup imageSrc={PRIMARY_SCREEN} />
              </div>
              <div className="jb-phone-secondary jb-fade-up" style={{ animationDelay: "0.35s" }}>
                <PhoneMockup imageSrc={SECONDARY_SCREEN} />
              </div>
            </div>
          </div>
        </section>
        <footer className="jb-footer">
          <div className="jb-footer-inner">
            <div className="jb-footer-grid">
              <div className="jb-footer-brand">
                <Link href="/" className="jb-logo" style={{ color: "var(--jb-text)" }}>
                  <div className="jb-logo-icon">
                    <Image
                      src="/images/icon.png"
                      alt="JoyBormi"
                      width={20}
                      height={20}
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  <span className="jb-logo-text">JoyBormi</span>
                </Link>
                <p>A modern mobile experience built for everyday moments. Available on iOS and Android.</p>
                <div className="jb-social-row" style={{ marginTop: 16 }}>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="jb-social-btn"
                    aria-label="Telegram"
                  >
                    <TelegramIcon />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="jb-social-btn"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

              <div>
                <p className="jb-footer-col-title">Company</p>
                <div className="jb-footer-links">
                  <Link href="/about">About</Link>
                  <Link href="/privacy">Privacy Policy</Link>
                  <Link href="/terms">Terms of Service</Link>
                </div>
              </div>

              <div>
                <p className="jb-footer-col-title">Contact</p>
                <div className="jb-contact-links">
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="jb-contact-link">
                    <TelegramIcon /> Telegram
                  </a>
                  <a href={phoneHref} className="jb-contact-link">
                    <PhoneIcon /> {phoneRaw}
                  </a>
                </div>
              </div>

              <div>
                <p className="jb-footer-col-title">Newsletter</p>
                <p style={{ fontSize: 13, color: "var(--jb-text-muted)", marginBottom: 12, lineHeight: 1.5 }}>
                  Get updates on new features and releases.
                </p>

                {submitted ? (
                  <div
                    style={{
                      padding: "10px 16px",
                      background: "var(--jb-accent-dim)",
                      border: "1px solid color-mix(in srgb, var(--jb-accent) 30%, transparent)",
                      borderRadius: 10,
                      fontSize: 13,
                      color: "var(--jb-accent)",
                      fontWeight: 600,
                    }}
                  >
                    ✓ You&apos;re subscribed
                  </div>
                ) : (
                  <form className="jb-newsletter-form" onSubmit={handleSubmit}>
                    <input
                      className="jb-newsletter-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button className="jb-newsletter-submit" type="submit">
                      Join <ChevronRightIcon />
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="jb-footer-bottom">
              <p className="jb-footer-copy">© {new Date().getFullYear()} JoyBormi. All rights reserved.</p>
              <div className="jb-footer-links-row">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export { HomeView }
