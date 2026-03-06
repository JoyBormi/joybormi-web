import { defineRouting } from "next-intl/routing"
import { COOKIE_KEYS } from "@/constants/cookies"

const isSecureCookie = process.env.NODE_ENV === "production"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "uz", "ru"],

  // Used when no locale matches
  defaultLocale: "ru",

  localePrefix: "never",

  localeDetection: true,

  localeCookie: {
    name: COOKIE_KEYS.LANGUAGE,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
    secure: isSecureCookie,
  },
})
