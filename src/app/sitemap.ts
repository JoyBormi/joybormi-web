import { MetadataRoute } from "next"
import { getAllMarketPages } from "@/lib/market-pages"

const baseUrl = "https://joybormiapp.uz"

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
    path: "/marketing",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/support",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: "/terms",
    changeFrequency: "monthly",
    priority: 0.4,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const marketUrls: MetadataRoute.Sitemap = getAllMarketPages().map(({ city, category }) => ({
    url: `${baseUrl}/services/${city.slug}/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

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

  return [...staticUrls, ...marketUrls]
}
