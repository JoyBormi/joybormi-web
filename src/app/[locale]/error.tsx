"use client"
import { Button } from "@/components/ui/button"

export default function Error() {
  return (
    <div className="bg-navy-500/40 relative flex h-screen items-center justify-center overflow-hidden">
      <div className="z-10 h-full w-full translate-y-[15%] pt-30 text-center text-white">
        <h1 className="font-pretendard text-[200px] leading-[250px] font-medium">500</h1>
        <p className="title">server error</p>

        <div className="body-1 my-40 text-center">
          <p>Sorry, something went wrong.</p>
          <p>Please go back to the home page.</p>
        </div>
        <Button
          variant="ghost"
          className="mx-auto cursor-pointer self-center border-white text-white hover:bg-white/10"
          onClick={() => {
            window?.history.back()
          }}
        >
          Go Back
        </Button>
      </div>

      {/* bg circle */}
      <div className="absolute -bottom-[15%] left-1/2 z-0 aspect-square h-screen -translate-x-1/2 rounded-full border border-white/80 bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.2)] opacity-20" />
    </div>
  )
}
