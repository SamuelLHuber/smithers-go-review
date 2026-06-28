import { type AgentLike, PiAgent as SmithersPiAgent } from "smithers-orchestrator";

/**
 * Default agent: PiAgent with optiverse provider (Kimi-K2.6).
 * The optiverse provider must be configured in your `pi` CLI.
 */
export const DefaultGoReviewer = new SmithersPiAgent({
  provider: "optiverse",
  model: "Kimi-K2.6",
});

export const agents = {
  reviewer: [DefaultGoReviewer],
} as const satisfies Record<string, AgentLike[]>;
