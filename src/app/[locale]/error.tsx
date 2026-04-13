"use client"
import { Button } from "@/components/ui/button"

export default function Error() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="text-foreground z-10 h-full w-full translate-y-[15%] pt-30 text-center">
        <h1 className="font-pretendard text-[200px] leading-[250px] font-medium">500</h1>
        <p className="title">server error</p>

        <div className="body-1 my-40 text-center">
          <p>Sorry, something went wrong.</p>
          <p>Please go back to the home page.</p>
        </div>
        <Button
          onClick={() => {
            window?.history.back()
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}
