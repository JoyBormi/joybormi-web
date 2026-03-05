import { cn } from "@/lib/utils"

export const Loading = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <span className="animate-dot h-1.5 w-1.5 rounded-full bg-red-400 [animation-delay:0ms]" />
    <span className="animate-dot h-1.5 w-1.5 rounded-full bg-red-400 [animation-delay:150ms]" />
    <span className="animate-dot h-1.5 w-1.5 rounded-full bg-red-500 [animation-delay:300ms]" />
  </div>
)
