import React, { useCallback, useState } from "react"
import { toast } from "sonner"
import { CheckIcon, CopyIcon } from "../icons"
import { Button } from "../ui/button"

type ClipboardCopyProps = {
  text: string
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ text }) => {
  const [animateCheck, setAnimateCheck] = useState<boolean>(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setAnimateCheck(true)

    toast.info("복사되었습니다.")
    const timer = setTimeout(() => {
      setAnimateCheck(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <Button variant="icon" type="button" onClick={handleCopy}>
      {animateCheck ? <CheckIcon className="size-5 text-gray-400" /> : <CopyIcon className="size-5 text-[#1C1B1F]" />}
    </Button>
  )
}

export { ClipboardCopy }
