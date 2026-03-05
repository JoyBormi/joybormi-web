import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva("body-1 w-fit flex cursor-pointer items-center transition-all duration-300 ease-in-out", {
  variants: {
    variant: {
      default:
        "p-3 pl-4 gap-1 border border-gray-200 rounded-sm text-foreground h-12 data-[selected=true]:border-navy-500 data-[selected=true]:bg-navy-500/5 data-[selected=true]:text-navy-500 hover:border-navy-500 hover:bg-navy-500/5 hover:text-navy-500",
      send: "aspect-square p-2.5 bg-red-500 rounded-sm hover:opacity-90",
      chip: "py-1.5 bg-white px-3.5 rounded-full text-foreground border border-gray-200 data-[selected=true]:border-navy-500 data-[selected=true]:bg-navy-500/5 data-[selected=true]:text-navy-500 hover:border-navy-500 hover:bg-navy-500/5 hover:text-navy-500 shadow-1",
      icon: "aspect-square p-0.5 rounded-sm hover:bg-gray-200 bg-transparent",
      ghost: "p-3 pl-4 gap-1 rounded-sm text-foreground h-12",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return <Comp ref={ref} data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
