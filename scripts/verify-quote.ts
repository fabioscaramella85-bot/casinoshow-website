import assert from "node:assert/strict";
import fs from "node:fs";
import {
  emptyQuoteDraft,
  formatQuoteDate,
  localTodayIso,
  type QuoteDraft,
} from "../src/lib/quote/types.ts";
import { canTransmitQuote, quoteSubmissionStatus } from "../src/lib/quote/submission.ts";
import { validateQuoteStep } from "../src/lib/quote/validation.ts";

const today = "2026-10-12";

function draft(patch: Partial<QuoteDraft> = {}): QuoteDraft {
  return {
    ...emptyQuoteDraft(),
    eventType: "wedding",
    eventLocation: "Lugano",
    eventDate: "2026-11-02",
    guestRange: "30-60",
    ...patch,
  };
}

function contact(patch: Partial<QuoteDraft> = {}): QuoteDraft {
  return draft({
    experiences: ["roulette", "poker"],
    eventObjective: "celebration",
    additionalNotes: "Serata in terrazza",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.test",
    phone: "+41 79 000 00 00",
    contactPreference: "email",
    ...patch,
  });
}

assert.equal(localTodayIso(new Date(2026, 9, 12, 23, 30)), "2026-10-12");
assert.match(formatQuoteDate("2026-03-01", "en"), /1/);
assert.match(formatQuoteDate("2026-03-01", "en"), /2026/);
assert.doesNotMatch(formatQuoteDate("2026-03-01", "en"), /28/);
assert.match(formatQuoteDate("2026-03-01", "de"), /2026/);

const missing = validateQuoteStep(emptyQuoteDraft(), 1, today);
assert.equal(missing.ok, false);
if (!missing.ok) {
  assert.equal(missing.firstField, "quote-eventType");
  assert.equal(missing.errors["quote-location"], "errors.location");
  assert.equal(missing.errors["quote-date"], "errors.date");
  assert.equal(missing.errors["quote-guests"], "errors.guests");
}

assert.equal(validateQuoteStep(draft({ dateUndecided: true, eventDate: "" }), 1, today).ok, true);
assert.equal(validateQuoteStep(draft({ eventDate: "2026-10-12" }), 1, today).ok, true);
assert.equal(validateQuoteStep(draft({ eventDate: "2026-10-11" }), 1, today).ok, false);
const invalidDate = validateQuoteStep(draft({ eventDate: "2026-02-31" }), 1, today);
assert.equal(invalidDate.ok, false);
if (!invalidDate.ok) {
  assert.equal(invalidDate.errors["quote-date"], "errors.dateInvalid");
}
assert.equal(validateQuoteStep(draft({ eventLocation: "   " }), 1, today).ok, false);
assert.equal(validateQuoteStep(draft({ eventLocation: "x".repeat(121) }), 1, today).ok, false);
assert.equal(validateQuoteStep(draft({ duration: "2-4" }), 1, today).ok, true);
assert.equal(validateQuoteStep(draft({ duration: "overnight" as QuoteDraft["duration"] }), 1, today).ok, false);

assert.equal(validateQuoteStep(draft(), 2, today).ok, true);
assert.equal(
  validateQuoteStep(draft({ experiences: ["roulette", "poker", "recommendation"] }), 2, today).ok,
  true,
);
assert.equal(
  validateQuoteStep(draft({ experiences: ["unknown" as QuoteDraft["experiences"][number]] }), 2, today).ok,
  false,
);
assert.equal(validateQuoteStep(draft({ additionalNotes: "x".repeat(1000) }), 2, today).ok, true);
assert.equal(validateQuoteStep(draft({ additionalNotes: "x".repeat(1001) }), 2, today).ok, false);
assert.equal(validateQuoteStep(draft({ eventObjective: "team" }), 2, today).ok, true);
assert.equal(
  validateQuoteStep(draft({ eventObjective: "gala" as QuoteDraft["eventObjective"] }), 2, today).ok,
  false,
);

assert.equal(validateQuoteStep(contact(), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ company: "" }), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ company: "x".repeat(121) }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ firstName: " " }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ lastName: "" }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ email: "ada.example.test" }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ phone: "12345" }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ phone: "+41 79 000 00 00" }), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ phone: "+1 202 555 0100" }), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ contactPreference: "" }), 3, today).ok, false);
assert.equal(validateQuoteStep(contact({ contactPreference: "none" }), 3, today).ok, true);

assert.equal(quoteSubmissionStatus(), "unconfigured");
assert.equal(canTransmitQuote(), false);

const submission = fs.readFileSync("src/lib/quote/submission.ts", "utf8");
assert.equal(submission.includes("fetch("), false);
assert.equal(submission.includes("localStorage"), false);
assert.equal(submission.includes("sessionStorage"), false);
assert.equal(submission.includes("mailto:"), false);

const wizard = fs.readFileSync("src/components/quote/quote-wizard.tsx", "utf8");
assert.equal(wizard.includes("localStorage"), false);
assert.equal(wizard.includes("sessionStorage"), false);
assert.equal(wizard.includes("console."), false);
assert.equal(wizard.includes("fetch("), false);

const messages = ["it", "de", "fr", "en"].map((locale) =>
  JSON.parse(fs.readFileSync(`src/messages/${locale}.json`, "utf8")),
);

function flat(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    flat(child, prefix ? `${prefix}.${key}` : key),
  );
}

const italian = flat(messages[0].Quote).sort();
for (const [index, locale] of ["de", "fr", "en"].entries()) {
  const current = flat(messages[index + 1].Quote).sort();
  assert.deepEqual(current, italian, locale);
}
assert.equal(JSON.stringify(messages[1].Quote).includes("ß"), false);
assert.match(messages[0].Quote.submission.notice, /sarà disponibile a breve/);
assert.match(messages[0].Pages.quote.heading, /Raccontaci il tuo evento/);
assert.match(messages[0].Contact.paths.quote.note, /invio non è ancora attivo/);

console.log("verify:quote ok");
