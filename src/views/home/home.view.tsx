"use client"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

import { AndroidMockup } from "@/components/shared/android-mockup"
import { AppStore } from "@/components/shared/app-store"
import { GooglePlay } from "@/components/shared/google-play"
import { Header } from "@/components/shared/header"
import { IPhoneMockup } from "@/components/shared/iphone-mockup"
import { QrCode } from "@/components/shared/qr-code"
import { appConfig } from "@/config/app.config"

const HomeView = () => {
  const t = useTranslations("landingModern")

  const { app } = appConfig
  return (
    <div className="jb-landing bg-background text-foreground flex min-h-screen flex-col overflow-x-hidden [font-family:var(--font-pretendard),var(--font-sans),sans-serif]">
      <Header />
      <main>
        <section className="flex-1 pt-[72px] pb-12">
          <div className="mx-auto grid min-h-[calc(100dvh-64px)] max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pt-8 max-md:gap-7 max-md:px-4 max-md:pt-2 md:grid-cols-2 lg:gap-11 lg:pb-8 xl:min-h-[calc(100dvh-64px)]">
            <div className="flex max-w-[560px] flex-col gap-[22px]">
              <div className="jb-fade-up jb-fade-up-1 inline-flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-[14px] py-[6px] pl-2">
                <div className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
                  <Sparkles size={11} />
                </div>
                <span className="text-primary text-[13px] font-semibold">{t("badge")}</span>
              </div>

              <h1 className="jb-fade-up jb-fade-up-2 m-0 text-[clamp(2.6rem,5vw,4.9rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase max-md:text-[clamp(2.2rem,10vw,2.8rem)]">
                {t.rich("headline", {
                  accent: () => <em className="text-primary whitespace-nowrap not-italic">{t("headlineAccent")}</em>,
                })}
              </h1>

              <p className="jb-fade-up jb-fade-up-3 text-muted-foreground m-0 max-w-[560px] text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.72] max-md:max-w-full">
                {t("description")}
              </p>

              <div className="jb-fade-up jb-fade-up-4 mt-[2px] flex items-center gap-2">
                <AppStore href={app.urls.appStore} />
                <GooglePlay href={app.urls.googlePlay} />
              </div>

              <div className="jb-fade-up jb-fade-up-5 border-border bg-card mt-1 flex w-fit items-center gap-[14px] rounded-2xl border p-4 max-[560px]:w-full max-[560px]:p-[14px]">
                <div className="grid h-[92px] w-[92px] place-items-center">
                  <QrCode value={app.urls.site} size={84} />
                </div>
                <div className="text-muted-foreground max-w-[170px] text-[13px] leading-normal">
                  <strong className="text-foreground mb-[2px] block font-semibold">{t("qr.title")}</strong>
                  {t("qr.description")}
                </div>
              </div>
            </div>

            <div className="relative flex h-[clamp(460px,54vw,760px)] items-end justify-center pt-7 pb-10 max-[560px]:h-[clamp(470px,122vw,610px)] max-lg:h-[clamp(480px,82vw,620px)] max-md:h-[clamp(500px,108vw,640px)] xl:h-[clamp(560px,46vw,820px)]">
              <div className="jb-glow-orb jb-glow-orb-main" />
              <div className="jb-phone-primary absolute bottom-0 left-[40%] z-2 transform-[translateX(-65%)_rotate(-8deg)] animate-[jb-float-left_5s_ease-in-out_infinite] [--jb-iphone-scale:0.86] max-[560px]:transform-[translateX(-67%)_rotate(-14deg)] max-[560px]:animate-[jb-float-left-mobile-small_5.6s_ease-in-out_infinite] max-[560px]:[--jb-iphone-scale:0.72] max-lg:[--jb-iphone-scale:0.82] max-md:transform-[translateX(-58%)_rotate(-15deg)] max-md:animate-[jb-float-left-mobile_5.4s_ease-in-out_infinite] max-md:[--jb-iphone-scale:0.76] min-[1536px]:[--jb-iphone-scale:1.08] xl:[--jb-iphone-scale:1]">
                <IPhoneMockup
                  className="origin-[bottom_center] transform-[scale(var(--jb-iphone-scale))]"
                  imageSrc={app.assets.primaryScreen}
                  imageAlt={t("phone.primaryAlt")}
                  priority
                />
              </div>
              <div className="jb-phone-secondary absolute bottom-0 left-[45%] z-2 transform-[translateX(-10%)_rotate(10deg)] animate-[jb-float-right_5s_ease-in-out_infinite] [--jb-android-scale:0.82] [animation-delay:0.5s] max-[560px]:transform-[translateX(-10%)_rotate(11deg)] max-[560px]:animate-[jb-float-right-mobile-small_5.6s_ease-in-out_infinite] max-[560px]:[--jb-android-scale:0.68] max-[560px]:[animation-delay:0.4s] max-lg:[--jb-android-scale:0.76] max-md:transform-[translateX(-6%)_rotate(12deg)] max-md:animate-[jb-float-right-mobile_5.4s_ease-in-out_infinite] max-md:[--jb-android-scale:0.72] max-md:[animation-delay:0.45s] min-[1536px]:[--jb-android-scale:1.02] xl:[--jb-android-scale:0.95]">
                <AndroidMockup
                  className="transform-origin-[bottom_center] transform-[scale(var(--jb-android-scale))]"
                  imageSrc={app.assets.secondaryScreen}
                  imageAlt={t("phone.secondaryAlt")}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export { HomeView }
