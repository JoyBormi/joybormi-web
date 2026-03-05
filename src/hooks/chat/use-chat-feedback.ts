import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "@/constants/query-keys"
import { chatService } from "@/services/chat.service"
import { useChatStore } from "@/stores/chat.store"
import { FeedBackRequest, FeedBackResponse } from "@/types/chat.types"

export const useChatFeedback = () => {
  const queryClient = useQueryClient()
  const { updateMessages } = useChatStore()
  return useMutation({
    mutationFn: (request: FeedBackRequest): Promise<FeedBackResponse> => chatService.sendFeedback(request),
    onMutate: async (request) => {
      // Optimistically update the UI immediately
      updateMessages({ id: request.message_id, feedback: request.feedback })
    },
    onSuccess: (data, request) => {
      // Ensure the feedback matches what we sent
      updateMessages({ id: request.message_id, feedback: request.feedback })
      queryClient.invalidateQueries({
        queryKey: [...QueryKeys.chat.history, { sessionId: request.session_id }],
      })
    },
    onError: (error, _request) => {
      // Revert on error - you might want to fetch the current state from the server
      console.error("Failed to send feedback:", error)
    },
  })
}
