import { createMemoryRateLimit } from "../security/memory-rate-limit";

const limit = createMemoryRateLimit("careers");

/** In-memory guard for a single Node process. It does not span multiple instances. */
export function allowCareersSubmission(key: string, now = Date.now()): boolean {
  return limit.allow(key, now);
}

/** True while this key still has a submission inside the one-hour window. */
export function careersRateLimitHasKey(key: string): boolean {
  return limit.has(key);
}
