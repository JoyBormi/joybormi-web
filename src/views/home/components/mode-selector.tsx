import { FC } from "react"
import { Button } from "@/components/ui/button"

interface ModeSelectorProps {
  onSelectMode: (mode: string) => void
  mode: string
}

const ModeSelector: FC<ModeSelectorProps> = ({ onSelectMode, mode }) => {
  return (
    <div className="mt-3 flex items-center gap-2.5">
      <Button variant="chip" onClick={() => onSelectMode("FAQ")} data-selected={mode === "faq"}>
        FAQ
      </Button>
      <Button variant="chip" onClick={() => onSelectMode("제품/기업 정보")} data-selected={mode === "chat"}>
        제품/기업 정보
      </Button>
    </div>
  )
}

export { ModeSelector }
