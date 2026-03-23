import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getAllMarketPages, getFeaturedMarketPages, getMarketPage } from "@/lib/market-pages"
import { meta } from "@/lib/seo"

type MarketPageProps = {
  params: Promise<{
    locale: string
    city: string
    category: string
  }>
}

export function generateStaticParams() {
  return getAllMarketPages().map(({ city, category }) => ({
    city: city.slug,
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { locale, city, category } = await params
  const page = getMarketPage(city, category)

  if (!page) {
    return {}
  }

  const resolvedLocale = locale as Locale
  const t = await getTranslations({ locale, namespace: "landingModern.searchSeo" })
  const cityName = page.city.name[resolvedLocale]
  const categoryName = page.category.name[resolvedLocale]

  return meta({
    locale: resolvedLocale,
    pathname: `/services/${city}/${category}`,
    title: t("page.title", { category: categoryName, city: cityName }),
    description: t("page.description", { category: categoryName, city: cityName }),
    keywords: [...page.category.searchKeywords[resolvedLocale], cityName, categoryName, "JoyBormi"],
  })
}

export default async function MarketCategoryPage({ params }: MarketPageProps) {
  const { locale, city, category } = await params
  const resolvedLocale = locale as Locale
  const page = getMarketPage(city, category)

  if (!page) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "landingModern.searchSeo" })
  const cityName = page.city.name[resolvedLocale]
  const categoryName = page.category.name[resolvedLocale]
  const relatedPages = getFeaturedMarketPages().filter(
    (item) => item.city.slug !== city || item.category.slug !== category
  )

  const faqItems = [
    {
      question: t("page.faq.one.question", { category: categoryName, city: cityName }),
      answer: t("page.faq.one.answer", { category: categoryName, city: cityName }),
    },
    {
      question: t("page.faq.two.question", { category: categoryName, city: cityName }),
      answer: t("page.faq.two.answer", { category: categoryName, city: cityName }),
    },
    {
      question: t("page.faq.three.question", { category: categoryName, city: cityName }),
      answer: t("page.faq.three.answer", { category: categoryName, city: cityName }),
    },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col [font-family:var(--font-pretendard),var(--font-sans),sans-serif]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-44 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-[14px] py-[6px] pl-2">
            <div className="bg-primary h-5 w-5 rounded-full" />
            <span className="text-primary text-[13px] font-semibold">
              {t("page.badge", { category: categoryName, city: cityName })}
            </span>
          </div>

          <h1 className="max-w-4xl text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase">
            {t("page.title", { category: categoryName, city: cityName })}
          </h1>

          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-8">
            {t("page.description", { category: categoryName, city: cityName })}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="border-border bg-card rounded-3xl border p-6">
              <p className="text-muted-foreground text-sm">{t("page.highlights.discovery")}</p>
            </div>
            <div className="border-border bg-card rounded-3xl border p-6">
              <p className="text-muted-foreground text-sm">{t("page.highlights.booking")}</p>
            </div>
            <div className="border-border bg-card rounded-3xl border p-6">
              <p className="text-muted-foreground text-sm">{t("page.highlights.local")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="border-border bg-card rounded-3xl border p-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("page.whyTitle", { category: categoryName, city: cityName })}
            </h2>
            <p className="text-muted-foreground mt-4 leading-8">
              {t("page.whyDescription", { category: categoryName, city: cityName })}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/60 rounded-2xl p-5">
                <h3 className="font-semibold">{t("page.cards.one.title")}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">{t("page.cards.one.body")}</p>
              </div>
              <div className="bg-muted/60 rounded-2xl p-5">
                <h3 className="font-semibold">{t("page.cards.two.title")}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">{t("page.cards.two.body")}</p>
              </div>
            </div>
          </div>

          <aside className="border-border bg-card rounded-3xl border p-8">
            <h2 className="text-2xl font-bold tracking-tight">{t("page.relatedTitle")}</h2>
            <div className="mt-6 flex flex-col gap-3">
              {relatedPages.slice(0, 6).map((item) => (
                <Link
                  key={`${item.city.slug}-${item.category.slug}`}
                  href={`/services/${item.city.slug}/${item.category.slug}`}
                  className="border-border bg-background hover:border-primary hover:text-primary rounded-2xl border px-4 py-3 text-sm font-medium no-underline transition-colors"
                >
                  {t("page.relatedLink", {
                    category: item.category.name[resolvedLocale],
                    city: item.city.name[resolvedLocale],
                  })}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("page.faqTitle")}</h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">{t("page.faqDescription")}</p>
        </div>

        <div className="mt-14 grid gap-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-border rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <summary className="cursor-pointer list-none text-left text-lg font-semibold marker:hidden">
                <span className="inline-flex items-center gap-3">
                  <span className="bg-primary h-2.5 w-2.5 rounded-full transition-transform duration-300 group-open:scale-125" />
                  {item.question}
                </span>
              </summary>
              <p className="text-muted-foreground pt-4 pl-5 text-base leading-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
