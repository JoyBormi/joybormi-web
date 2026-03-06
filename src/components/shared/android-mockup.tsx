import React from "react"
import { cn } from "@/lib/utils"

type AndroidMockupProps = { className?: string }

const AndroidMockup: React.FC<AndroidMockupProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex h-[520px] w-[250px] justify-center rounded-2xl border-4 border-black bg-gray-50",
        className
      )}
      style={{ boxShadow: "10px 10px 5px 12px rgb(209, 218, 218)" }}
    >
      {/* notch */}
      <span className="h-5 w-28 rounded-br-xl rounded-bl-xl border border-black bg-black"></span>
      {/* right top buttons */}
      <span className="absolute top-20 -right-2 h-10 rounded-md border-4 border-black"></span>
      <span className="absolute top-44 -right-2 h-24 rounded-md border-4 border-black"></span>
    </div>
  )
}

export { AndroidMockup }
