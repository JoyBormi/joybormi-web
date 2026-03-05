import { useMutation } from "@tanstack/react-query"

import { chatService } from "@/services/chat.service"
import type { BootstrapSessionRequest } from "@/types/chat.types"

/**
 * Hook to bootstrap a chat session
 * Handles user and session creation/reuse based on the v2 API rules
 */
export const useBootstrapSession = () =>
  useMutation({
    mutationFn: (request?: BootstrapSessionRequest) => chatService.bootstrapSession(request),
  })
