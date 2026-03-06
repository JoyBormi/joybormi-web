import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

type AppStoreProps = {
  className?: string
  href?: string
}

const AppStore: React.FC<AppStoreProps> = ({ className, href }) => {
  const content = (
    <div
      className={cn(
        "bg-foreground text-background border-border/20 flex h-11 w-[162px] items-center justify-center rounded-[9px] border px-2.5",
        className
      )}
    >
      <div className="mr-2">
        <svg viewBox="0 0 384 512" width="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          />
        </svg>
      </div>
      <div>
        <div className="text-[9px] leading-none tracking-[0.04em] uppercase">Download on the</div>
        <div className="mt-0.5 text-xl leading-none font-semibold">App Store</div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener" aria-label="Download on the App Store">
        {content}
      </Link>
    )
  }

  return content
}

export { AppStore }
