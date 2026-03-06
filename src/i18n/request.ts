import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"
import { COOKIE_KEYS } from "@/constants/cookies"
import { defaultLocale, type Locale, locales } from "./config"

export default getRequestConfig(async ({ requestLocale }) => {
  const store = await cookies()
  const resolvedRequestLocale = await requestLocale
  const localeFromCookie = store.get(COOKIE_KEYS.LANGUAGE)?.value

  const locale =
    (locales.includes(resolvedRequestLocale as Locale) ? resolvedRequestLocale : null) ??
    (locales.includes(localeFromCookie as Locale) ? localeFromCookie : null) ??
    defaultLocale

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  }
})
