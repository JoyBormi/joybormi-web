"use client"

import { Check, Menu } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useLanguage from "@/hooks/common/use-language"
import { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const LOCALES = [
  { id: "uz", name: "O'zbek", emoji: "🇺🇿" },
  { id: "ru", name: "Русский", emoji: "🇷🇺" },
  { id: "en", name: "English", emoji: "🇺🇸" },
] as const

type MobileHeaderMenuProps = {
  aboutLabel: string
  privacyLabel: string
  termsLabel: string
  languageLabel: string
}

const MobileHeaderMenu = ({ aboutLabel, privacyLabel, termsLabel, languageLabel }: MobileHeaderMenuProps) => {
  const [open, setOpen] = useState(false)
  const { onChangeLanguage } = useLanguage()
  const locale = useLocale()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="icon-sm" className="bg-background border-border">
          <Menu className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-56 p-2.5">
        <nav className="grid gap-1.5 text-sm font-medium">
          <Link href="/about" className="hover:bg-accent rounded-md px-2 py-1.5" onClick={() => setOpen(false)}>
            {aboutLabel}
          </Link>
          <Link href="/privacy" className="hover:bg-accent rounded-md px-2 py-1.5" onClick={() => setOpen(false)}>
            {privacyLabel}
          </Link>
          <Link href="/terms" className="hover:bg-accent rounded-md px-2 py-1.5" onClick={() => setOpen(false)}>
            {termsLabel}
          </Link>
        </nav>

        <div className="border-border/70 mt-2 border-t pt-2">
          <p className="text-muted-foreground px-1 text-xs font-semibold tracking-wide">{languageLabel}</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {LOCALES.map((item) => {
              const active = locale === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "border-border hover:bg-accent inline-flex items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs",
                    active && "bg-foreground text-background border-foreground"
                  )}
                  onClick={() => {
                    onChangeLanguage(item.id as Locale)
                    setOpen(false)
                  }}
                >
                  <span>{item.emoji}</span>
                  {active ? <Check className="size-3" /> : null}
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { MobileHeaderMenu }
