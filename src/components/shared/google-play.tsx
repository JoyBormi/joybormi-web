import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

type GooglePlayProps = {
  className?: string
  href?: string
}

const GooglePlay: React.FC<GooglePlayProps> = ({ className, href }) => {
  const content = (
    <div
      className={cn(
        "bg-foreground text-background border-border/20 flex h-11 w-[162px] items-center justify-center rounded-[9px] border px-2.5",
        className
      )}
    >
      <div className="mr-2">
        <svg viewBox="30 336.7 120.9 129.2" width="22" aria-hidden="true">
          <path
            fill="#FFD400"
            d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
          />
          <path
            fill="#FF3333"
            d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
          />
          <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
          <path
            fill="#3BCCFF"
            d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
          />
        </svg>
      </div>
      <div>
        <div className="text-[9px] leading-none tracking-[0.04em] uppercase">Get it on</div>
        <div className="mt-0.5 text-lg leading-none font-semibold">Google Play</div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener" aria-label="Get it on Google Play">
        {content}
      </Link>
    )
  }

  return content
}

export { GooglePlay }
