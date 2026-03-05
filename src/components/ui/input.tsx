import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-foreground right-0 h-11 rounded border border-gray-200 bg-white px-4 py-2.5 outline-0 placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-300",
        className
      )}
      {...props}
    />
  )
}

export { Input }
