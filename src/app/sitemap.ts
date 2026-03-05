import { MetadataRoute } from "next"

const baseUrl = "https://joybormi.uz"
const locales = ["ko", "en"] as const

type Route = {
  path: string
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

/**
 * Static routes configuration
 */
const staticRoutes: Route[] = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/service",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/request",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/work",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/story",
    changeFrequency: "weekly",
    priority: 0.8,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  // Generate URLs for all static routes in both languages
  const staticUrls: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticUrls.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko${route.path}`,
            en: `${baseUrl}/en${route.path}`,
          },
        },
      })
    }
  }

  // // Fetch dynamic works data
  // let workUrls: MetadataRoute.Sitemap = []
  // try {
  //   const worksResponse = await workService.getWorks()

  //   workUrls = worksResponse.list.flatMap((work) =>
  //     locales.map((locale) => ({
  //       url: `${baseUrl}/${locale}/work/${work.workNo}`,
  //       lastModified: new Date(work.updateAt),
  //       changeFrequency: "monthly" as const,
  //       priority: 0.7,
  //       alternates: {
  //         languages: {
  //           ko: `${baseUrl}/ko/work/${work.workNo}`,
  //           en: `${baseUrl}/en/work/${work.workNo}`,
  //         },
  //       },
  //     }))
  //   )
  // } catch (error) {
  //   console.error("Error fetching works for sitemap:", error)
  // }

  return [...staticUrls]
}
