import React from "react"

type ChatQuestionProps = {
  content: string
}

const ChatQuestion: React.FC<ChatQuestionProps> = ({ content }) => {
  return (
    <p className="bg-navy-500 body-1 ml-auto w-fit max-w-[70%] rounded-[16px_2px_16px_16px] px-4 py-2.5 text-white">
      {content}
    </p>
  )
}

export { ChatQuestion }
