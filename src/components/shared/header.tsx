import Cookies from "js-cookie"
import React, { useState } from "react"
import { COOKIE_KEYS } from "@/constants/cookies"
import { useChatStore } from "@/stores/chat.store"
import { RateDialog } from "./rate-dialog"
import { CloseIcon } from "../icons"

const Header: React.FC = () => {
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false)
  const { sessionId, clearMessages, setSessionId, setUserId, setMode, setSuggestedQuestions } = useChatStore()

  const handleClose = () => {
    if (sessionId) {
      setIsRateDialogOpen(true)
    }
  }

  const handleRefreshSession = () => {
    clearMessages()
    setSessionId(null)
    setUserId(null)
    setMode("undecided")
    setSuggestedQuestions([])
    Cookies.remove(COOKIE_KEYS.CHAT_SESSION)
    localStorage.removeItem("chat-storage")
    window.location.reload()
  }

  return (
    <>
      <header className="header">
        <span className="size-6 shrink-0" />
        <h1 className="subtitle text-foreground">KIMES AI 전시 도우미</h1>
        <button type="button" className="p-1" onClick={handleClose}>
          <CloseIcon className="size-6 shrink-0" />
        </button>
      </header>
      {sessionId && (
        <RateDialog
          open={isRateDialogOpen}
          sessionId={sessionId}
          onOpenChange={setIsRateDialogOpen}
          onConfirm={handleRefreshSession}
        />
      )}
    </>
  )
}

export { Header }
