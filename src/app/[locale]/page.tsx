import type { Metadata } from "next"
import { NextPage } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"

import { HomeView } from "@/views/home"

interface MetadataParam {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: MetadataParam): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()
  const keywords = t.raw("meta.home.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/",
    title: t("meta.home.title"),
    description: t("meta.home.description"),
    keywords,
  })
}

const HomePage: NextPage<{ params: Promise<{ locale: string }> }> = async ({ params }) => {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Can be used as SSR fetch
  // let initialChatHistory: ChatHistoryMessage[] = []
  // try {
  //   const cookieStore = await cookies()
  //   const chatSession = cookieStore.get(COOKIE_KEYS.CHAT_SESSION)

  //   if (chatSession?.value) {
  //     initialChatHistory = await chatService.getChatHistory(chatSession.value)
  //   }
  // } catch (error) {
  //   console.error("Failed to fetch chat history for SSR:", error)
  // }

  return <HomeView />
}

export default HomePage
