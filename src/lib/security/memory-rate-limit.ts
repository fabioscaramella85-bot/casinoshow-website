type Bucket = { timestamps: number[] };

type MemoryRateLimit = {
  allow: (key: string, now?: number) => boolean;
  has: (key: string) => boolean;
};

const stores = globalThis as typeof globalThis & {
  __memoryRateLimits?: Map<string, Map<string, Bucket>>;
};

function store(scope: string): Map<string, Bucket> {
  if (!stores.__memoryRateLimits) {
    stores.__memoryRateLimits = new Map();
  }
  const existing = stores.__memoryRateLimits.get(scope);
  if (existing) return existing;
  const created = new Map<string, Bucket>();
  stores.__memoryRateLimits.set(scope, created);
  return created;
}

/**
 * In-memory guard for one Node process. It does not span multiple instances.
 * Keys with no submission inside the window are deleted.
 */
export function createMemoryRateLimit(scope: string): MemoryRateLimit {
  const windowMs = 60 * 60 * 1000;
  const maxInWindow = 8;
  const minGapMs = 8_000;

  function prune(now: number) {
    const map = store(scope);
    for (const [key, bucket] of map) {
      const fresh = bucket.timestamps.filter((stamp) => now - stamp < windowMs);
      if (fresh.length === 0) {
        map.delete(key);
      } else if (fresh.length !== bucket.timestamps.length) {
        bucket.timestamps = fresh;
      }
    }
  }

  return {
    allow(key: string, now = Date.now()): boolean {
      const map = store(scope);
      prune(now);
      const fresh = map.get(key)?.timestamps.slice() ?? [];
      const last = fresh[fresh.length - 1];
      if (fresh.length >= maxInWindow || (last !== undefined && now - last < minGapMs)) {
        return false;
      }
      fresh.push(now);
      map.set(key, { timestamps: fresh });
      return true;
    },
    has(key: string): boolean {
      return store(scope).has(key);
    },
  };
}
