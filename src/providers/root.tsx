import { NextIntlClientProvider } from "next-intl"
import { FC, PropsWithChildren } from "react"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "./breakpoint-indicator"
import { QueryProvider } from "./query"

const RootProvider: FC<PropsWithChildren & { locale: string }> = ({ children, locale }) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>{children}</QueryProvider>
      <Toaster />
      <TailwindIndicator />
    </NextIntlClientProvider>
  )
}

export default RootProvider
