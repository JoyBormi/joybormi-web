import { useParams } from "next/navigation"
import { useTransition } from "react"

import { COOKIE_KEYS } from "@/constants/cookies"
import { Locale } from "@/i18n/config"
import { usePathname, useRouter } from "@/i18n/navigation"

const useLanguage = () => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  function onChangeLanguage(value: string) {
    const locale = value as Locale

    startTransition(() => {
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${locale}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
      router.replace(
        // @ts-expect-error next-intl types
        { pathname, params },
        { locale }
      )
      router.refresh()
    })
  }

  return { onChangeLanguage, isPending }
}

export default useLanguage
