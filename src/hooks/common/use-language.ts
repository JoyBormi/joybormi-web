import { useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { useTransition } from "react"

import { COOKIE_KEYS } from "@/constants/cookies"
import { Locale } from "@/i18n/config"
import { usePathname, useRouter } from "@/i18n/navigation"

const useLanguage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [isPending, startTransition] = useTransition()

  function onChangeLanguage(value: string) {
    const locale = value as Locale
    const isHttps = typeof window !== "undefined" ? window.location.protocol === "https:" : true

    startTransition(() => {
      Cookies.set(COOKIE_KEYS.LANGUAGE, locale, {
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      })

      router.replace(pathname, { locale })
      router.refresh()
      queryClient.resetQueries()
    })
  }

  return { onChangeLanguage, isPending }
}

export default useLanguage
