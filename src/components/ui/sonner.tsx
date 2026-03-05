"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { CheckIcon } from "../icons"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="bottom-center"
      theme={theme as ToasterProps["theme"]}
      className="toaster group gap-3 text-2xl"
      icons={{
        // success: <CircleCheckIcon className="text-primary-100 size-4" />,
        info: <CheckIcon className="size-6 text-white" />,
        // warning: <TriangleAlertIcon className="size-4" />,
        // error: <OctagonXIcon className="size-4" />,
        // loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "rgba(32, 32, 32, 0.68)",
          "--normal-text": "white",
          "--normal-border": "rgba(32, 32, 32, 0.68)",
          "--border-radius": "var(--radius-md)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          title: "text-white body-1 ml-2",
        },
      }}
      mobileOffset={{ bottom: 86 }}
      {...props}
    />
  )
}

export { Toaster }
