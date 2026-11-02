import { createMemoryRateLimit } from "../security/memory-rate-limit";

const limit = createMemoryRateLimit("quote");

/** Separate from the careers limiter. Expired keys are removed from memory. */
export function allowQuoteSubmission(key: string, now = Date.now()): boolean {
  return limit.allow(key, now);
}

export function quoteRateLimitHasKey(key: string): boolean {
  return limit.has(key);
}
