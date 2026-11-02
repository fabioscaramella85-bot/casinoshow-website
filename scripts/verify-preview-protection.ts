import assert from "node:assert/strict";
import { postResendMessage } from "../src/lib/mail/resend.ts";
import {
  previewModeEnabled,
  previewOutboundMailBlocked,
  previewProtectionEnabled,
  previewRobotsDirective,
} from "../src/lib/preview/protection.ts";

const preview = { CASINO_SHOW_PREVIEW_MODE: "enabled" };

assert.equal(previewModeEnabled({}), false);
assert.equal(previewProtectionEnabled({}), false);
assert.equal(previewOutboundMailBlocked({}), false);
assert.equal(previewRobotsDirective({}), undefined);

assert.equal(previewModeEnabled({ CASINO_SHOW_PREVIEW_MODE: "true" }), false);
assert.equal(previewModeEnabled({ CASINO_SHOW_PREVIEW_PROTECTION: "enabled" }), false);
assert.equal(
  previewModeEnabled({
    CASINO_SHOW_PREVIEW_PROTECTION: "enabled",
    CASINO_SHOW_PREVIEW_USER: "preview-reviewer",
    CASINO_SHOW_PREVIEW_PASSWORD: "correct-horse-battery",
  }),
  false,
);

assert.equal(previewModeEnabled(preview), true);
assert.equal(previewProtectionEnabled(preview), true);
assert.equal(previewOutboundMailBlocked(preview), true);
assert.deepEqual(previewRobotsDirective(preview), { index: false, follow: false });
assert.equal(
  previewOutboundMailBlocked({
    ...preview,
    CASINO_SHOW_QUOTE_DELIVERY: "enabled",
    RESEND_API_KEY: "present",
  }),
  true,
);

const previous = process.env.CASINO_SHOW_PREVIEW_MODE;
process.env.CASINO_SHOW_PREVIEW_MODE = "enabled";
const blocked = await postResendMessage(
  "not-a-real-key",
  {
    from: "preview@example.com",
    to: "info@casinoshow.ch",
    replyTo: "guest@example.com",
    subject: "preview check",
    text: "not sent",
    html: "<p>not sent</p>",
  },
  "preview-check",
);
if (previous === undefined) {
  delete process.env.CASINO_SHOW_PREVIEW_MODE;
} else {
  process.env.CASINO_SHOW_PREVIEW_MODE = previous;
}
assert.equal(blocked, "error");

console.log("preview-protection-unit-ok");
