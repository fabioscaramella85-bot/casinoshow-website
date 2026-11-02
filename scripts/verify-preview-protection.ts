import assert from "node:assert/strict";
import {
  previewAccessDecision,
  previewAuthorizationMatches,
  previewOutboundMailBlocked,
  previewProtectionEnabled,
  previewRobotsDirective,
  readPreviewGate,
} from "../src/lib/preview/protection.ts";

const user = "preview-reviewer";
const password = "correct-horse-battery";
const ready = {
  CASINO_SHOW_PREVIEW_PROTECTION: "enabled",
  CASINO_SHOW_PREVIEW_USER: user,
  CASINO_SHOW_PREVIEW_PASSWORD: password,
};

function basic(value: string): string {
  return `Basic ${Buffer.from(value, "utf8").toString("base64")}`;
}

assert.equal(readPreviewGate({}).state, "off");
assert.equal(previewProtectionEnabled({}), false);
assert.equal(previewOutboundMailBlocked({}), false);
assert.equal(previewRobotsDirective({}), undefined);
assert.equal(previewAccessDecision(null, {}).toString(), "allow");
assert.equal(readPreviewGate({ CASINO_SHOW_PREVIEW_PROTECTION: "true" }).state, "off");

assert.equal(readPreviewGate({ CASINO_SHOW_PREVIEW_PROTECTION: "enabled" }).state, "misconfigured");
assert.equal(
  readPreviewGate({
    CASINO_SHOW_PREVIEW_PROTECTION: "enabled",
    CASINO_SHOW_PREVIEW_USER: user,
    CASINO_SHOW_PREVIEW_PASSWORD: "short-pass",
  }).state,
  "misconfigured",
);
assert.equal(
  readPreviewGate({
    CASINO_SHOW_PREVIEW_PROTECTION: "enabled",
    CASINO_SHOW_PREVIEW_USER: "bad:user",
    CASINO_SHOW_PREVIEW_PASSWORD: password,
  }).state,
  "misconfigured",
);
assert.equal(previewAccessDecision(basic(`${user}:${password}`), { CASINO_SHOW_PREVIEW_PROTECTION: "enabled" }), "unavailable");

assert.equal(readPreviewGate(ready).state, "ready");
assert.equal(previewProtectionEnabled(ready), true);
assert.equal(previewOutboundMailBlocked(ready), true);
assert.deepEqual(previewRobotsDirective(ready), { index: false, follow: false });
assert.equal(previewAuthorizationMatches(basic(`${user}:${password}`), user, password), true);
assert.equal(previewAuthorizationMatches(basic(`${user}:wrong-password-value`), user, password), false);
assert.equal(previewAuthorizationMatches(basic(`other-user:${password}`), user, password), false);
assert.equal(previewAuthorizationMatches(null, user, password), false);
assert.equal(previewAuthorizationMatches("Bearer token", user, password), false);
assert.equal(previewAccessDecision(null, ready), "challenge");
assert.equal(previewAccessDecision(basic(`${user}:${password}`), ready), "allow");
assert.equal(previewOutboundMailBlocked({ ...ready, CASINO_SHOW_QUOTE_DELIVERY: "enabled", RESEND_API_KEY: "present" }), true);

console.log("preview-protection-unit-ok");
