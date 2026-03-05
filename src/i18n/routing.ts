import { defineRouting } from "next-intl/routing"
import { COOKIE_KEYS } from "@/constants/cookies"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ko"],

  // Used when no locale matches
  defaultLocale: "ko",

  localePrefix: "never",

  localeDetection: false,

  localeCookie: {
    name: COOKIE_KEYS.LANGUAGE,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
    secure: true,
  },
})
