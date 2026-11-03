import assert from "node:assert/strict";
import fs from "node:fs";
import {
  emptyQuoteDraft,
  formatQuoteDate,
  localTodayIso,
  type QuoteDraft,
} from "../src/lib/quote/types.ts";
import { buildQuoteEmail, sendQuoteEmail } from "../src/lib/quote/mail.ts";
import { processQuoteSubmission } from "../src/lib/quote/process.ts";
import { allowQuoteSubmission, quoteRateLimitHasKey } from "../src/lib/quote/rate-limit.ts";
import { canTransmitQuote, quoteSendingEnabled, quoteSubmissionStatus } from "../src/lib/quote/submission.ts";
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
assert.equal("duration" in emptyQuoteDraft(), false);

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
assert.equal(validateQuoteStep(contact({ referralSource: "" }), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ referralSource: "instagram" }), 3, today).ok, true);
assert.equal(validateQuoteStep(contact({ referralSource: "other", referralSourceOther: "" }), 3, today).ok, true);
assert.equal(
  validateQuoteStep(contact({ referralSource: "other", referralSourceOther: "x".repeat(120) }), 3, today).ok,
  true,
);
assert.equal(
  validateQuoteStep(contact({ referralSource: "other", referralSourceOther: "x".repeat(121) }), 3, today).ok,
  false,
);
assert.equal(
  validateQuoteStep(contact({ referralSource: "billboard" as QuoteDraft["referralSource"] }), 3, today).ok,
  false,
);

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
assert.match(messages[0].Quote.intro.eyebrow, /Richiedi un preventivo/);
assert.match(messages[0].Quote.intro.description, /proposta su misura/);
assert.match(messages[0].Quote.fields.referral.label, /Come ci hai conosciuto/);
assert.deepEqual(Object.keys(messages[0].Quote.options.referral), [
  "google_search",
  "ai_assistants",
  "instagram",
  "facebook",
  "word_of_mouth",
  "previous_event",
  "event_agency",
  "other",
]);
assert.equal(messages[0].Quote.fields.duration, undefined);
assert.equal(messages[0].Quote.options.duration, undefined);
assert.equal(messages[0].Quote.hero, undefined);
assert.match(messages[0].Pages.quote.heading, /Raccontaci il tuo evento/);
assert.equal(messages[0].Contact.paths, undefined);
assert.match(messages[0].Contact.intro.title, /Parliamo del tuo prossimo evento/);
assert.equal(
  JSON.stringify(messages.map((entry: { Contact: unknown }) => entry.Contact)).includes(
    "non è ancora attivo",
  ),
  false,
);
const contactKeys = flat(messages[0].Contact).sort();
for (const [index, locale] of ["de", "fr", "en"].entries()) {
  assert.deepEqual(flat(messages[index + 1].Contact).sort(), contactKeys, `contact ${locale}`);
}

assert.equal(fs.existsSync("src/components/quote/quote-hero.tsx"), false);
const quotePage = fs.readFileSync("src/components/quote/quote-page.tsx", "utf8");
assert.equal(quotePage.includes("QuoteHero"), false);
assert.equal(quotePage.includes("<h1"), true);
const eventStep = fs.readFileSync("src/components/quote/quote-step-event.tsx", "utf8");
assert.equal(eventStep.includes("duration"), false);
const contactStep = fs.readFileSync("src/components/quote/quote-step-contact.tsx", "utf8");
assert.equal(contactStep.includes("quote-referral"), true);
assert.equal(contactStep.includes("legalPathnames.privacy"), true);
assert.equal(contactStep.includes("privacyConsent"), false);

function quoteForm(value: QuoteDraft, now: number, patch?: (data: FormData) => void) {
  const data = new FormData();
  data.set("locale", "de");
  data.set("startedAt", String(now - 5_000));
  data.set("eventType", value.eventType);
  data.set("eventLocation", value.eventLocation);
  data.set("eventDate", value.eventDate);
  data.set("dateUndecided", value.dateUndecided ? "yes" : "no");
  data.set("guestRange", value.guestRange);
  for (const id of value.experiences) data.append("experiences", id);
  data.set("eventObjective", value.eventObjective);
  data.set("additionalNotes", value.additionalNotes);
  data.set("firstName", value.firstName);
  data.set("lastName", value.lastName);
  data.set("email", value.email);
  data.set("phone", value.phone);
  data.set("company", value.company);
  data.set("contactPreference", value.contactPreference);
  data.set("referralSource", value.referralSource);
  data.set("referralSourceOther", value.referralSourceOther);
  patch?.(data);
  return data;
}

const quoteNow = new Date(2026, 9, 12, 12).getTime();
let sendCalls = 0;
const disabled = await processQuoteSubmission(quoteForm(contact(), quoteNow), {
  enabled: false,
  configured: true,
  now: quoteNow,
  allow: () => true,
  send: async () => {
    sendCalls += 1;
    return "sent";
  },
});
assert.equal(disabled.status, "unavailable");
assert.equal(sendCalls, 0);

const invalidEmail = await processQuoteSubmission(quoteForm(contact({ email: "ada.example.test" }), quoteNow), {
  enabled: true,
  configured: true,
  now: quoteNow,
  allow: () => true,
  send: async () => "sent",
});
assert.equal(invalidEmail.status, "invalid");

const honeypot = await processQuoteSubmission(
  quoteForm(contact(), quoteNow, (data) => data.set("company_website", "https://spam.test")),
  {
    enabled: true,
    configured: true,
    now: quoteNow,
    allow: () => true,
    send: async () => "sent",
  },
);
assert.equal(honeypot.status, "error");

const oversized = await processQuoteSubmission(
  quoteForm(contact(), quoteNow, (data) => data.set("additionalNotes", "x".repeat(2_000))),
  {
    enabled: true,
    configured: true,
    now: quoteNow,
    allow: () => true,
    send: async () => "sent",
  },
);
assert.equal(oversized.status, "error");

const quoteKey = `quote-verify-${quoteNow}`;
let quoteAt = quoteNow;
for (let sent = 0; sent < 8; sent += 1) {
  const result = await processQuoteSubmission(quoteForm(contact(), quoteAt), {
    enabled: true,
    configured: true,
    now: quoteAt,
    allow: () => allowQuoteSubmission(quoteKey, quoteAt),
    send: async () => "sent",
  });
  assert.equal(result.status, "sent");
  quoteAt += 8_000;
}
const blocked = await processQuoteSubmission(quoteForm(contact(), quoteAt), {
  enabled: true,
  configured: true,
  now: quoteAt,
  allow: () => allowQuoteSubmission(quoteKey, quoteAt),
  send: async () => "sent",
});
assert.equal(blocked.status, "error");
assert.equal(quoteRateLimitHasKey(quoteKey), true);
const afterHour = quoteAt + 60 * 60 * 1000;
assert.equal(allowQuoteSubmission(`quote-sweep-${afterHour}`, afterHour), true);
assert.equal(quoteRateLimitHasKey(quoteKey), false);

const providerError = await processQuoteSubmission(quoteForm(contact(), quoteNow), {
  enabled: true,
  configured: true,
  now: quoteNow,
  allow: () => true,
  send: async () => "error",
});
assert.equal(providerError.status, "error");

let mailed = false;
const accepted = await processQuoteSubmission(quoteForm(contact(), quoteNow), {
  enabled: true,
  configured: true,
  now: quoteNow,
  allow: () => true,
  send: async (inquiry) => {
    mailed = true;
    assert.equal(inquiry.email, "ada@example.test");
    assert.equal(inquiry.locale, "de");
    assert.equal("startedAt" in inquiry, false);
    const built = buildQuoteEmail(inquiry, "info@casinoshow.ch", "Casino Show <jobs@casinoshow.ch>");
    assert.equal(built.replyTo, "ada@example.test");
    assert.match(built.text, /Lugano/);
    assert.equal(built.text.includes("company_website"), false);
    return "sent";
  },
});
assert.equal(accepted.status, "sent");
assert.equal(mailed, true);

const savedKey = process.env.RESEND_API_KEY;
const savedFrom = process.env.CASINO_SHOW_EMAIL_FROM;
const savedTo = process.env.CASINO_SHOW_EMAIL_TO;
process.env.RESEND_API_KEY = "test-key";
process.env.CASINO_SHOW_EMAIL_FROM = "Casino Show <jobs@casinoshow.ch>";
process.env.CASINO_SHOW_EMAIL_TO = "info@casinoshow.ch";
const originalFetch = globalThis.fetch;
let quoteFetches = 0;
globalThis.fetch = async () => {
  quoteFetches += 1;
  return new Response(JSON.stringify({ id: "email_test" }), { status: 200 });
};
const sentMail = await sendQuoteEmail({
  locale: "it",
  eventType: "wedding",
  eventLocation: "Lugano",
  eventDate: "2026-11-02",
  dateUndecided: false,
  guestRange: "30-60",
  experiences: ["roulette"],
  eventObjective: "celebration",
  additionalNotes: "",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.test",
  phone: "+41 79 000 00 00",
  company: "",
  contactPreference: "email",
  referralSource: "",
  referralSourceOther: "",
  submittedAt: "2026-10-12T10:00:00.000Z",
});
assert.equal(sentMail, "error");
assert.equal(quoteFetches, 0);
globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 500 });
assert.equal(
  await sendQuoteEmail({
    locale: "it",
    eventType: "wedding",
    eventLocation: "Lugano",
    eventDate: "2026-11-02",
    dateUndecided: false,
    guestRange: "30-60",
    experiences: [],
    eventObjective: "",
    additionalNotes: "",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.test",
    phone: "+41 79 000 00 00",
    company: "",
    contactPreference: "email",
    referralSource: "",
    referralSourceOther: "",
    submittedAt: "2026-10-12T10:00:00.000Z",
  }),
  "error",
);
globalThis.fetch = originalFetch;
if (savedKey === undefined) delete process.env.RESEND_API_KEY;
else process.env.RESEND_API_KEY = savedKey;
if (savedFrom === undefined) delete process.env.CASINO_SHOW_EMAIL_FROM;
else process.env.CASINO_SHOW_EMAIL_FROM = savedFrom;
if (savedTo === undefined) delete process.env.CASINO_SHOW_EMAIL_TO;
else process.env.CASINO_SHOW_EMAIL_TO = savedTo;

assert.equal(quoteSendingEnabled({} as NodeJS.ProcessEnv), false);
assert.equal(
  canTransmitQuote({ CASINO_SHOW_QUOTE_DELIVERY: "enabled" } as NodeJS.ProcessEnv),
  false,
);
assert.equal(
  canTransmitQuote({
    CASINO_SHOW_QUOTE_DELIVERY: "enabled",
    RESEND_API_KEY: "test-key",
    CASINO_SHOW_EMAIL_FROM: "Casino Show <jobs@casinoshow.ch>",
    CASINO_SHOW_EMAIL_TO: "info@casinoshow.ch",
  } as unknown as NodeJS.ProcessEnv),
  false,
);
assert.equal(messages[0].Quote.nav.submit, "Invia la richiesta");
assert.equal(messages[1].Quote.submission.unavailable.includes("noch nicht aktiv"), true);
assert.equal(messages[2].Quote.privacy.link, "politique de confidentialité");
assert.equal(messages[3].Quote.submission.success.includes("has been sent"), true);

console.log("verify:quote ok");
