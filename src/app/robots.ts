import type { MetadataRoute } from "next"

import { appConfig } from "@/config/app.config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${appConfig.app.urls.site}/sitemap.xml`,
  }
}
