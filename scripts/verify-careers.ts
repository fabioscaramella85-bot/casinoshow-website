import assert from "node:assert/strict";
import fs from "node:fs";
import { inspectCv, safeCvFilename } from "../src/lib/careers/cv.ts";
import { buildCareersEmail, getCareersMailConfig, sendCareersEmail } from "../src/lib/careers/mail.ts";
import type { CareersInquiry } from "../src/lib/careers/inquiry.ts";
import { careersDeliveryAllowed, careersIntake } from "../src/lib/careers/intake.ts";
import { processCareersSubmission } from "../src/lib/careers/process.ts";
import { allowCareersSubmission, careersRateLimitHasKey } from "../src/lib/careers/rate-limit.ts";
import { careerLimits } from "../src/lib/careers/schema.ts";

const encoder = new TextEncoder();

function pdf(name = "curriculum.pdf", contents = "%PDF-1.4\n% career\n") {
  return new File([contents], name, { type: "application/pdf" });
}

function bytesFile(bytes: Uint8Array, name: string, type: string) {
  return new File([Buffer.from(bytes)], name, { type });
}

function application(file: File, extras?: (data: FormData) => void) {
  const data = new FormData();
  data.set("startedAt", String(Date.now() - 10_000));
  data.set("locale", "de");
  data.set("firstName", "Ada");
  data.set("lastName", "Lovelace");
  data.set("email", "ada@example.test");
  data.set("phone", "+41 79 000 00 00");
  data.set("locality", "Lugano");
  data.set("country", "ch");
  data.set("experience", "none");
  data.set(
    "presentation",
    "Vorrei collaborare con Casino Show perché mi piace accogliere le persone. Nota <script>alert(1)</script>.",
  );
  data.set("privacy", "yes");
  data.append("regions", "ticino");
  data.set("cv", file);
  extras?.(data);
  return data;
}

function delivery(send: (inquiry: CareersInquiry) => Promise<"sent" | "error">, configured = true) {
  return {
    configured,
    allow: () => true,
    send,
    now: Date.now(),
  };
}

const sources = [
  "src/lib/careers/process.ts",
  "src/lib/careers/mail.ts",
  "src/lib/careers/cv.ts",
  "src/lib/careers/schema.ts",
  "src/app/[locale]/careers/actions.ts",
  ".env.example",
];

for (const file of sources) {
  const source = fs.readFileSync(file, "utf8");
  assert.equal(/\bwriteFile|createWriteStream|from "node:fs"|from "fs"/.test(source), false, file);
  assert.equal(source.includes("re_"), false, file);
  assert.equal(source.includes("FUN_CASINO"), false, file);
  assert.equal(source.includes("info@funcasino.it"), false, file);
}

assert.equal(safeCvFilename("../../Mario Rossi.pdf", "pdf"), "Mario-Rossi.pdf");
assert.equal(safeCvFilename("..\\evil.exe.pdf", "pdf"), "evil.exe.pdf");
assert.equal(safeCvFilename("???.pdf", "pdf"), "curriculum.pdf");

const savedEnv = {
  key: process.env.RESEND_API_KEY,
  from: process.env.CASINO_SHOW_EMAIL_FROM,
  to: process.env.CASINO_SHOW_EMAIL_TO,
};

delete process.env.RESEND_API_KEY;
delete process.env.CASINO_SHOW_EMAIL_FROM;
delete process.env.CASINO_SHOW_EMAIL_TO;
const missing = getCareersMailConfig();
assert.equal(missing.ready, false);
if (!missing.ready) {
  assert.deepEqual(missing.missing.sort(), [
    "CASINO_SHOW_EMAIL_FROM",
    "CASINO_SHOW_EMAIL_TO",
    "RESEND_API_KEY",
  ]);
}

const tooBig = new Uint8Array(careerLimits.cvBytes + 1);
tooBig.set(encoder.encode("%PDF"), 0);
const tooBigResult = await inspectCv(bytesFile(tooBig, "grande.pdf", "application/pdf"));
assert.equal(tooBigResult.ok, false);
if (!tooBigResult.ok) assert.equal(tooBigResult.error, "errors.cvSize");

const renamed = await inspectCv(bytesFile(encoder.encode("MZ executable"), "cv.pdf", "application/pdf"));
assert.equal(renamed.ok, false);
if (!renamed.ok) assert.equal(renamed.error, "errors.cvContent");

const docx = new Uint8Array([...[0x50, 0x4b, 0x03, 0x04], ...encoder.encode("word/document.xml")]);
const docxOk = await inspectCv(
  bytesFile(
    docx,
    "cv.docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ),
);
assert.equal(docxOk.ok, true);

const zipOnly = await inspectCv(
  bytesFile(new Uint8Array([0x50, 0x4b, 0x03, 0x04, 1, 2, 3]), "cv.docx", "application/octet-stream"),
);
assert.equal(zipOnly.ok, false);

const macro = new Uint8Array([
  ...[0x50, 0x4b, 0x03, 0x04],
  ...encoder.encode("word/document.xml vbaProject.bin"),
]);
const macroResult = await inspectCv(bytesFile(macro, "cv.docx", "application/octet-stream"));
assert.equal(macroResult.ok, false);

const ole = new Uint8Array([...[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], ...encoder.encode("WordDocument")]);
const docOk = await inspectCv(bytesFile(ole, "cv.doc", "application/msword"));
assert.equal(docOk.ok, true);

const sheet = new Uint8Array([
  ...[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
  ...encoder.encode("Workbook"),
]);
const sheetResult = await inspectCv(bytesFile(sheet, "cv.doc", "application/msword"));
assert.equal(sheetResult.ok, false);

const captured: CareersInquiry[] = [];
const beginner = await processCareersSubmission(
  application(pdf("../../Mario Rossi.pdf")),
  delivery(async (inquiry) => {
    captured.push(inquiry);
    return "sent";
  }),
);
assert.equal(beginner.status, "sent");
const sentInquiry = captured[0];
assert.ok(sentInquiry);
assert.equal(sentInquiry.experience, "none");
assert.deepEqual(sentInquiry.games, []);
assert.equal(sentInquiry.locale, "de");
assert.equal(sentInquiry.cv.filename, "Mario-Rossi.pdf");
assert.equal(sentInquiry.privacyConsent, true);
const message = buildCareersEmail(sentInquiry, "info@casinoshow.ch", "Casino Show <jobs@casinoshow.ch>");
assert.equal(message.subject, "[Casino Show] Nuova candidatura | Ada Lovelace");
assert.equal(message.replyTo, "ada@example.test");
assert.match(message.text, /Esperienza come croupier: Nessuna esperienza/);
assert.match(message.text, /Lingua del modulo: Tedesco/);
assert.match(message.text, /Zone di disponibilità: Ticino/);
assert.match(message.text, /Consenso privacy: sì/);
assert.doesNotMatch(message.text, /Keine Erfahrung/);
assert.match(message.html, /&lt;script&gt;/);
assert.equal(message.html.includes("<script>"), false);
assert.match(message.text, /<script>alert/);

const conflict = await processCareersSubmission(
  application(pdf(), (data) => {
    data.append("regions", "all");
  }),
  delivery(async () => "sent"),
);
assert.equal(conflict.status, "invalid");
if (conflict.status === "invalid") assert.equal(conflict.fields.regions, "errors.regionsConflict");

const privacy = await processCareersSubmission(
  application(pdf(), (data) => {
    data.delete("privacy");
  }),
  delivery(async () => {
    throw new Error("should not send");
  }),
);
assert.equal(privacy.status, "invalid");
if (privacy.status === "invalid") assert.equal(privacy.fields.privacy, "errors.privacy");

const spam = await processCareersSubmission(
  application(pdf(), (data) => {
    data.set("company_website", "https://spam.example");
  }),
  delivery(async () => "sent"),
);
assert.equal(spam.status, "error");

const started = Date.now();
const fast = await processCareersSubmission(
  application(pdf(), (data) => {
    data.set("startedAt", String(started));
  }),
  {
    ...delivery(async () => "sent"),
    now: started + 200,
  },
);
assert.equal(fast.status, "error");

let calls = 0;
const unconfigured = await processCareersSubmission(
  application(pdf()),
  delivery(async () => {
    calls += 1;
    return "sent";
  }, false),
);
assert.equal(unconfigured.status, "error");
assert.equal(calls, 0);

const providerError = await processCareersSubmission(
  application(pdf()),
  delivery(async () => "error"),
);
assert.equal(providerError.status, "error");

const thrown = await processCareersSubmission(
  application(pdf()),
  delivery(async () => {
    throw new Error("network down");
  }),
);
assert.equal(thrown.status, "error");

const limitKey = `careers-test-${Date.now()}`;
assert.equal(allowCareersSubmission(limitKey, 1_000), true);
assert.equal(careersRateLimitHasKey(limitKey), true);
assert.equal(allowCareersSubmission(limitKey, 1_100), false);
assert.equal(allowCareersSubmission(limitKey, 20_000), true);

const hour = 60 * 60 * 1000;
const repeatKey = `careers-repeat-${Date.now()}`;
let repeatAt = 5_000_000;
assert.equal(allowCareersSubmission(repeatKey, repeatAt), true);
for (let sent = 1; sent < 8; sent += 1) {
  repeatAt += 8_000;
  assert.equal(allowCareersSubmission(repeatKey, repeatAt), true);
}
assert.equal(allowCareersSubmission(repeatKey, repeatAt + 8_000), false);
assert.equal(careersRateLimitHasKey(repeatKey), true);

const staleKey = `careers-stale-${Date.now()}`;
const otherKey = `careers-other-${Date.now()}`;
assert.equal(allowCareersSubmission(staleKey, 10_000), true);
assert.equal(allowCareersSubmission(otherKey, 10_000), true);
const afterWindow = repeatAt + hour;
assert.equal(allowCareersSubmission(`careers-sweep-${Date.now()}`, afterWindow), true);
assert.equal(careersRateLimitHasKey(staleKey), false);
assert.equal(careersRateLimitHasKey(otherKey), false);
assert.equal(careersRateLimitHasKey(repeatKey), false);
assert.equal(allowCareersSubmission(repeatKey, afterWindow), true);

if (sentInquiry) {
  process.env.RESEND_API_KEY = "test-key";
  process.env.CASINO_SHOW_EMAIL_FROM = "Casino Show <jobs@casinoshow.ch>";
  process.env.CASINO_SHOW_EMAIL_TO = "info@casinoshow.ch";
  const originalFetch = globalThis.fetch;
  const inquiry = sentInquiry;

  globalThis.fetch = async () => new Response(JSON.stringify({ message: "no" }), { status: 403 });
  assert.equal(await sendCareersEmail(inquiry), "error");

  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  assert.equal(await sendCareersEmail(inquiry), "error");

  let careerFetches = 0;
  globalThis.fetch = async () => {
    careerFetches += 1;
    return new Response(JSON.stringify({ id: "email_test" }), { status: 200 });
  };
  assert.equal(await sendCareersEmail(inquiry), "error");
  assert.equal(careerFetches, 0);
  globalThis.fetch = originalFetch;
}

if (savedEnv.key === undefined) delete process.env.RESEND_API_KEY;
else process.env.RESEND_API_KEY = savedEnv.key;
if (savedEnv.from === undefined) delete process.env.CASINO_SHOW_EMAIL_FROM;
else process.env.CASINO_SHOW_EMAIL_FROM = savedEnv.from;
if (savedEnv.to === undefined) delete process.env.CASINO_SHOW_EMAIL_TO;
else process.env.CASINO_SHOW_EMAIL_TO = savedEnv.to;

const previewEnv = { CASINO_SHOW_PREVIEW_MODE: "enabled" } as unknown as NodeJS.ProcessEnv;
const readyMail = {
  RESEND_API_KEY: "test-key",
  CASINO_SHOW_EMAIL_FROM: "Casino Show <jobs@casinoshow.ch>",
  CASINO_SHOW_EMAIL_TO: "info@casinoshow.ch",
} as unknown as NodeJS.ProcessEnv;
assert.equal(careersIntake({} as NodeJS.ProcessEnv), "unpublished");
assert.equal(careersIntake(previewEnv), "preview");
assert.equal(careersDeliveryAllowed(readyMail), false);
assert.equal(careersDeliveryAllowed({ ...readyMail, CASINO_SHOW_PREVIEW_MODE: "enabled" }), false);

console.log("verify:careers ok");
