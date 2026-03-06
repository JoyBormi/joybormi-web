import { Agent, agent } from "@/lib/agent"

export class ExampleService {
  private readonly agent: Agent

  constructor(agentInstance: Agent = agent) {
    this.agent = agentInstance
  }

  /**
   * Create or resume a chat session for a visitor.
   * - Creates an anonymous user if none exists
   * - Reuses the current session if it is still valid
   * - Creates a new session if the previous session expired (~24h)
   */
  async bootstrapSession(): Promise<unknown> {
    const response = await this.agent.post("/chat/v2/session/bootstrap", {})

    return response
  }
}

export const chatService = new ExampleService()
