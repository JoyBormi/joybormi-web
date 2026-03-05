import React, { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { chatService } from "@/services/chat.service"
import { StarIcon } from "../icons"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog"

type RateDialogProps = {
  open: boolean
  sessionId: string
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void
}

const RateDialog: React.FC<RateDialogProps> = ({ open, sessionId, onOpenChange, onConfirm }) => {
  const [selected, setSelected] = useState<number>(0)

  const handleRate = async () => {
    if (selected === 0) {
      toast.error("별점을 선택해주세요")
      return
    }

    try {
      await chatService.rateSession(sessionId, selected)
      toast.success("평가해주셔서 감사합니다!")
      onOpenChange(false)
      setSelected(0)
      onConfirm?.()
    } catch {
      toast.error("평가 중 오류가 발생했습니다")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[400px]">
        <DialogTitle className="text-center">‘KIMES AI’에 대해 어떻게 생각하세요?</DialogTitle>
        <ol className="mt-4 flex items-center justify-center gap-3">
          {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
            <button type="button" key={index} className="cursor-pointer p-0.5" onClick={() => setSelected(index)}>
              <StarIcon
                className={cn(
                  "size-7 transition-colors duration-300",
                  selected >= index ? "text-yellow-500" : "text-gray-200 hover:text-yellow-500/50"
                )}
              />
            </button>
          ))}
        </ol>
        <div className="mt-6 flex items-center justify-between gap-3">
          <DialogClose className="body-1 border-foreground text-foreground w-full cursor-pointer rounded border px-3.5 py-2.5">
            취소
          </DialogClose>
          <button
            type="button"
            className="body-1 bg-foreground w-full cursor-pointer rounded px-3.5 py-2.5 text-white disabled:opacity-50"
            onClick={handleRate}
            disabled={selected === 0}
          >
            확인
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { RateDialog }
