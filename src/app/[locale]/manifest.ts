import { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("manifest")

  return {
    name: t("name"),
    short_name: t("short_name"),
    description: t("description"),
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#101E33",
    lang: "en",
    icons: [
      {
        src: "/images/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/adaptive-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
