import assert from "node:assert/strict";
import { planSocialObserver } from "../src/components/social/social-observer.ts";

const shown = { desktop: false, blocked: false, nextBlocked: false, hasObserver: false };
assert.deepEqual(planSocialObserver(shown), { blocked: false, action: "connect" });

assert.deepEqual(
  planSocialObserver({ desktop: false, blocked: false, nextBlocked: false, hasObserver: true }),
  { blocked: false, action: "keep" },
);

assert.deepEqual(
  planSocialObserver({ desktop: false, blocked: false, nextBlocked: true, hasObserver: true }),
  { blocked: true, action: "connect" },
);

assert.deepEqual(
  planSocialObserver({ desktop: false, blocked: true, nextBlocked: false, hasObserver: true }),
  { blocked: false, action: "connect" },
);

assert.deepEqual(
  planSocialObserver({ desktop: true, blocked: false, nextBlocked: false, hasObserver: true }),
  { blocked: false, action: "disconnect" },
);

assert.deepEqual(
  planSocialObserver({ desktop: true, blocked: true, nextBlocked: true, hasObserver: true }),
  { blocked: false, action: "disconnect" },
);

assert.deepEqual(
  planSocialObserver({ desktop: true, blocked: false, nextBlocked: false, hasObserver: false }),
  { blocked: false, action: "keep" },
);

console.log("verify:social-observer ok");
