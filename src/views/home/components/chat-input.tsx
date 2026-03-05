import { FC } from "react"
import { SendIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  value: string
  disabled: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

const ChatInput: FC<ChatInputProps> = ({ value, disabled, onChange, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <section className="bg-background absolute bottom-0 flex w-full flex-col gap-1 px-5 pt-3 pb-1">
      <form className="flex items-center justify-between gap-1.5" onSubmit={handleSubmit}>
        <Input
          placeholder="Kimes AI에게 물어보세요."
          className="w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <Button variant="send" type="submit" disabled={disabled || !value.trim()}>
          <SendIcon className="size-6" />
        </Button>
      </form>
      <span className="caption-3 text-start text-gray-300">Powered by Momenti</span>
    </section>
  )
}

export { ChatInput }
