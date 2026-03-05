import { FC } from 'react'

interface SuggestedQuestionProp {
    question: string
    onClick : (msg: string) => void
}
const SuggestedQuestion : FC<SuggestedQuestionProp> = ({ question, onClick }) => {
  return (
    <div 
    role="button"
    tabIndex={0}
    onClick={() => onClick(question)}
    className='flex gap-1 border border-gray-200 rounded p-3 pl-4 cursor-pointer bg-white hover:border-navy-500 hover:text-navy-500 hover:bg-background transition-colors'>
        <p className="font-body-1 text-navy-500">Q.</p>
        <p className="font-body-1">{question}</p>
    </div>
  )
}

export default SuggestedQuestion