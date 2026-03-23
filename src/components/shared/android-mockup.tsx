import Image from "next/image"
import React from "react"

import { cn } from "@/lib/utils"

type AndroidMockupProps = {
  className?: string
  imageSrc?: string
  imageAlt?: string
  priority?: boolean
}

const AndroidMockup: React.FC<AndroidMockupProps> = ({
  className,
  imageSrc,
  imageAlt = "Mobile app preview",
  priority = false,
}) => {
  return (
    <div
      className={cn(
        "border-foreground bg-card relative h-[520px] w-[250px] overflow-hidden rounded-[36px] border-[6px] shadow-[0_24px_40px_-32px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      <div className="bg-foreground absolute top-0 left-1/2 z-20 h-[18px] w-[78px] -translate-x-1/2 rounded-b-xl" />

      <div className="bg-muted absolute inset-[2px] overflow-hidden rounded-[28px]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="250px"
            className="object-cover object-top"
            priority={priority}
          />
        ) : (
          <div className="from-secondary to-accent flex h-full items-center justify-center bg-linear-to-br">
            <span className="text-muted-foreground text-sm font-semibold">JoyBormi</span>
          </div>
        )}
      </div>

      <div className="bg-foreground absolute top-20 left-[-10px] h-10 w-[5px] rounded-l-md" />
      <div className="bg-foreground absolute top-44 left-[-10px] h-20 w-[5px] rounded-l-md" />
      <div className="bg-foreground absolute top-36 right-[-10px] h-16 w-[5px] rounded-r-md" />
    </div>
  )
}

export { AndroidMockup }
