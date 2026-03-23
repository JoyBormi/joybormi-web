import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

type IPhoneMockupProps = {
  className?: string
  imageSrc?: string
  imageAlt?: string
  priority?: boolean
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  className,
  imageSrc,
  imageAlt = "Mobile app preview",
  priority = false,
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="border-foreground relative h-[560px] w-[276px] rounded-[45px] border-8 shadow-[0_24px_40px_-32px_rgba(0,0,0,0.8)]">
        <div className="bg-foreground absolute top-2 left-1/2 z-20 h-[22px] w-[90px] -translate-x-1/2 transform rounded-full" />

        <div className="border-foreground/55 pointer-events-none absolute -inset-px rounded-[37px] border-[3px]"></div>

        <div className="bg-foreground/10 relative h-full w-full overflow-hidden rounded-[37px]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="276px"
              className="object-cover object-top"
              priority={priority}
            />
          ) : (
            <div className="from-secondary to-accent flex h-full items-center justify-center bg-linear-to-br">
              <span className="text-muted-foreground text-sm font-semibold">JoyBormi</span>
            </div>
          )}
        </div>

        <div className="bg-foreground absolute top-20 left-[-12px] h-8 w-[6px] rounded-l-md shadow-md" />
        <div className="bg-foreground absolute top-36 left-[-12px] h-12 w-[6px] rounded-l-md shadow-md" />
        <div className="bg-foreground absolute top-52 left-[-12px] h-12 w-[6px] rounded-l-md shadow-md" />
        <div className="bg-foreground absolute top-36 right-[-12px] h-16 w-[6px] rounded-r-md shadow-md" />
      </div>
    </div>
  )
}

export { IPhoneMockup }
