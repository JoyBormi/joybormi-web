import { MetadataRoute } from "next"

import { appConfig } from "@/config/app.config"
import { getAllMarketPages } from "@/lib/market-pages"

const baseUrl = appConfig.app.urls.site

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

  return [...staticUrls, ...marketUrls]
}
