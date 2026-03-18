"use client"

import { useTranslations } from "next-intl"
import { Header } from "@/components/shared/header"
import { Link } from "@/i18n/navigation"

const team = [
  {
    name: "Alex Johnson",
    role: "team.founderRole",
    initials: "AJ",
  },
  {
    name: "Sarah Chen",
    role: "team.productRole",
    initials: "SC",
  },
  {
    name: "Marcus Dubois",
    role: "team.engineerRole",
    initials: "MD",
  },
  {
    name: "Priya Patel",
    role: "team.designRole",
    initials: "PP",
  },
]

export default function AboutPage() {
  const t = useTranslations("landingModern.about")

  return (
    <main className="jb-landing min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-24 sm:pt-48 sm:pb-32 lg:px-8 overflow-hidden">
        <div className="jb-glow-orb jb-glow-orb-main opacity-50 absolute -top-24 left-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="jb-badge mx-auto mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="jb-badge-dot" />
            <span>{t("journeyBadge")}</span>
          </div>

          <h1 className="jb-headline mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {t.rich("headline", {
              accent: (chunks) => <em className="block sm:inline">{t("headlineAccent")}</em>,
            })}
          </h1>

          <p className="jb-description mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto mb-32 max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("mission.title")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{t("mission.body")}</p>
            <div className="pt-4">
              <div className="flex items-center gap-4 text-primary font-semibold">
                <span className="h-1 w-12 bg-primary rounded-full" />
                {t("mission.footer")}
              </div>
            </div>
          </div>
          <div className="relative aspect-square sm:aspect-video rounded-3xl bg-muted/50 overflow-hidden border border-border shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">JB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("team.title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("team.subtitle")}</p>
        </div>

        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {team.map((person, i) => (
            <li
              key={person.name}
              className="group relative flex flex-col items-center gap-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl bg-muted transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/10">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />
                <div className="flex h-full w-full items-center justify-center bg-white shadow-inner">
                  <span className="text-4xl font-light tracking-widest text-muted-foreground/30 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/40">
                    {person.initials}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{person.name}</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mt-1">{t(person.role as any)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="mx-auto mt-24 max-w-7xl px-6 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-24 text-center shadow-2xl sm:px-16">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">{t("cta.description")}</p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/careers"
                className="rounded-full bg-white px-8 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </section>
    </main>
  )
}
