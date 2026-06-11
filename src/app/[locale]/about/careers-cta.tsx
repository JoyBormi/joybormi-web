"use client"

import { toast } from "sonner"

type CareersCtaProps = {
  label: string
  description: string
  comingSoon: string
}

export function CareersCta({ label, description: _, comingSoon }: CareersCtaProps) {
  return (
    <button
      type="button"
      className="text-foreground rounded-full bg-white px-8 py-3 text-sm font-bold shadow-sm transition-all hover:scale-105 hover:bg-white/90 active:scale-95"
      onClick={() => {
        toast.info(comingSoon)
      }}
    >
      {label}
    </button>
  )
}
