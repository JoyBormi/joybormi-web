"use client"
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
              <h1 className="m-0 animate-(--animate-home-fade-up) text-[clamp(2.6rem,5vw,4.9rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [animation-delay:150ms] motion-reduce:animate-none motion-reduce:opacity-100 max-md:text-[clamp(2.2rem,10vw,2.8rem)]">
                {t.rich("headline", {
                  accent: () => <em className="text-primary whitespace-nowrap not-italic">{t("headlineAccent")}</em>,
                })}
              </h1>

              <p className="text-muted-foreground m-0 max-w-[560px] animate-(--animate-home-fade-up) text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.72] [animation-delay:250ms] motion-reduce:animate-none motion-reduce:opacity-100 max-md:max-w-full">
                {t("description")}
              </p>

              <div className="mt-[2px] flex animate-(--animate-home-fade-up) items-center gap-2 [animation-delay:350ms] motion-reduce:animate-none motion-reduce:opacity-100">
                <AppStore href={app.urls.appStore} />
                <GooglePlay href={app.urls.googlePlay} />
              </div>

              <div className="border-border bg-card mt-1 flex w-fit animate-(--animate-home-fade-up) items-center gap-[14px] rounded-2xl border p-4 [animation-delay:450ms] motion-reduce:animate-none motion-reduce:opacity-100 max-[560px]:w-full max-[560px]:p-[14px]">
                <div className="grid h-[92px] w-[92px] place-items-center">
                  <QrCode value={app.urls.site} size={84} />
                </div>
                <div className="text-muted-foreground max-w-[170px] text-[13px] leading-normal">
                  <strong className="text-foreground mb-[2px] block font-semibold">{t("qr.title")}</strong>
                  {t("qr.description")}
                </div>
              </div>
            </div>

            <div className="relative flex h-[clamp(460px,54vw,760px)] items-end justify-center pt-7 pb-10 max-[560px]:h-[clamp(360px,92vw,520px)] max-lg:h-[clamp(480px,82vw,620px)] max-md:h-[clamp(390px,90vw,580px)] max-md:items-center max-md:pt-3 max-md:pb-4 xl:h-[clamp(560px,46vw,820px)]">
              <div className="jb-glow-orb jb-glow-orb-main" />
              <div className="absolute bottom-0 left-1/3 z-2 transform-[translateX(-65%)_rotate(-8deg)] animate-(--animate-home-float-left) [--jb-iphone-scale:0.86] motion-reduce:transform-none motion-reduce:animate-none max-[560px]:transform-[translateX(-58%)_rotate(-12deg)] max-[560px]:animate-(--animate-home-float-left-mobile-small) max-[560px]:[--jb-iphone-scale:0.58] max-[420px]:transform-[translateX(-60%)_rotate(-13deg)] max-[420px]:[--jb-iphone-scale:0.52] max-lg:[--jb-iphone-scale:0.82] max-md:transform-[translateX(-56%)_rotate(-12deg)] max-md:animate-(--animate-home-float-left-mobile) max-md:[--jb-iphone-scale:0.66] min-[1536px]:[--jb-iphone-scale:1.08] lg:left-1/2 xl:[--jb-iphone-scale:1]">
                <IPhoneMockup
                  className="origin-[bottom_center] transform-[scale(var(--jb-iphone-scale))]"
                  imageSrc={app.assets.primaryScreen}
                  imageAlt={t("phone.primaryAlt")}
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-1/2 z-2 transform-[translateX(-10%)_rotate(10deg)] animate-(--animate-home-float-right) [--jb-android-scale:0.82] [animation-delay:0.5s] motion-reduce:transform-none motion-reduce:animate-none max-[560px]:transform-[translateX(-6%)_rotate(9deg)] max-[560px]:animate-(--animate-home-float-right-mobile-small) max-[560px]:[--jb-android-scale:0.5] max-[560px]:[animation-delay:0.4s] max-[420px]:transform-[translateX(-7%)_rotate(8deg)] max-[420px]:[--jb-android-scale:0.46] max-lg:[--jb-android-scale:0.76] max-md:transform-[translateX(-4%)_rotate(10deg)] max-md:animate-(--animate-home-float-right-mobile) max-md:[--jb-android-scale:0.58] max-md:[animation-delay:0.45s] min-[1536px]:[--jb-android-scale:1.02] xl:[--jb-android-scale:0.95]">
                <AndroidMockup
                  className="origin-[bottom_center] transform-[scale(var(--jb-android-scale))]"
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
