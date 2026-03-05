import type { Metadata } from "next"
import { NextPage } from "next"
import { cookies } from "next/headers"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { COOKIE_KEYS } from "@/constants/cookies"
import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"
import { chatService } from "@/services/chat.service"
import { ChatHistoryMessage } from "@/types/chat.types"
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
    image: "/og-image.png",
  })
}

const HomePage: NextPage<{ params: Promise<{ locale: string }> }> = async ({ params }) => {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Try to get session ID from cookies for SSR chat history
  let initialChatHistory: ChatHistoryMessage[] = []
  try {
    const cookieStore = await cookies()
    const chatSession = cookieStore.get(COOKIE_KEYS.CHAT_SESSION)

    if (chatSession?.value) {
      initialChatHistory = await chatService.getChatHistory(chatSession.value)
    }
  } catch (error) {
    console.error("Failed to fetch chat history for SSR:", error)
  }

  return <HomeView initialChatHistory={initialChatHistory} />
}

export default HomePage
