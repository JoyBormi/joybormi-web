"use client"
import { Check, Languages } from "lucide-react"
import { useLocale } from "next-intl"
import React from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useLanguage from "@/hooks/common/use-language"
import { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const locales = [
  { id: "uz", name: "O'zbek", emoji: "🇺🇿" },
  { id: "ru", name: "Русский", emoji: "🇷🇺" },
  { id: "en", name: "English", emoji: "🇺🇸" },
]

const LanguageToggle: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale()
  const { onChangeLanguage } = useLanguage()
  const [open, setOpen] = React.useState(false)
  const current = locales.find((item) => item.id === locale) ?? locales[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("bg-background text-foreground border-border h-10 rounded-full px-3 shadow-none", className)}
        >
          <Languages className="size-4" />
          <span className="text-base leading-none">{current?.emoji}</span>
          <span className="text-xs font-semibold tracking-wide">{current?.name}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="z-99999999 w-52 p-1.5">
        <div className="grid gap-1">
          {locales.map((cur) => {
            const active = locale === cur.id

            return (
              <button
                key={cur.id}
                type="button"
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                  active ? "bg-foreground text-background" : "text-foreground hover:bg-accent"
                )}
                onClick={() => {
                  onChangeLanguage(cur.id as Locale)
                  setOpen(false)
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{cur.emoji}</span>
                  <span>{cur.name}</span>
                </span>
                {active ? <Check className="size-4" /> : null}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { LanguageToggle }
