import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/constants/query-keys"
import { chatService } from "@/services/chat.service"
import { ChatHistoryMessage } from "@/types/chat.types"

export const useChatHistory = (sessionId: string | null, initialData?: ChatHistoryMessage[]) =>
  useQuery({
    queryKey: [...QueryKeys.chat.history, { sessionId }],
    queryFn: () => chatService.getChatHistory(sessionId || ""),
    enabled: !!sessionId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    initialData,
    placeholderData: keepPreviousData,
  })
