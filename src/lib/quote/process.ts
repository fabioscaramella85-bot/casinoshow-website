import type { QuoteInquiry, QuoteLocale } from "./inquiry";
import {
  experienceIds,
  isContactPreferenceId,
  isEventTypeId,
  isExperienceId,
  isGuestRangeId,
  isObjectiveId,
  isReferralSourceId,
  localTodayIso,
  quoteLimits,
  type QuoteDraft,
} from "./types";
import { validateQuoteDraft, type QuoteErrors } from "./validation";

export type QuoteSubmitResult =
  | { status: "unavailable" }
  | { status: "invalid"; fields: QuoteErrors }
  | { status: "sent" }
  | { status: "error" };

export type QuoteDelivery = {
  enabled: boolean;
  configured: boolean;
  now?: number;
  allow: () => boolean;
  send: (inquiry: QuoteInquiry) => Promise<"sent" | "error">;
};

const locales = new Set<string>(["it", "de", "fr", "en"]);
const maxFieldChars = 1_200;
const maxPayloadChars = 8_000;

function singleLine(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[\r\n]+/g, " ").trim();
}

function messageText(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function payloadTooLarge(formData: FormData): boolean {
  let total = 0;
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") return true;
    if (key.length > 40 || value.length > maxFieldChars) return true;
    total += value.length;
    if (total > maxPayloadChars) return true;
  }
  return false;
}

function timingRejected(formData: FormData, now: number): boolean {
  const raw = singleLine(String(formData.get("startedAt") ?? ""));
  if (!/^\d{10,16}$/.test(raw)) return true;
  const elapsed = now - Number(raw);
  return elapsed < 1_500 || elapsed > 6 * 60 * 60 * 1000;
}

function readDraft(formData: FormData): QuoteDraft | "spam" {
  if (singleLine(String(formData.get("company_website") ?? "")) !== "") {
    return "spam";
  }

  const experiences = formData
    .getAll("experiences")
    .filter((value): value is string => typeof value === "string")
    .map(singleLine)
    .filter(isExperienceId);
  const unique = experienceIds.filter((id) => experiences.includes(id));
  const eventTypeRaw = singleLine(String(formData.get("eventType") ?? ""));
  const guestRangeRaw = singleLine(String(formData.get("guestRange") ?? ""));
  const objectiveRaw = singleLine(String(formData.get("eventObjective") ?? ""));
  const preferenceRaw = singleLine(String(formData.get("contactPreference") ?? ""));
  const referralRaw = singleLine(String(formData.get("referralSource") ?? ""));
  const referralSource = isReferralSourceId(referralRaw) ? referralRaw : "";

  return {
    eventType: isEventTypeId(eventTypeRaw) ? eventTypeRaw : "",
    eventLocation: singleLine(String(formData.get("eventLocation") ?? "")),
    eventDate: singleLine(String(formData.get("eventDate") ?? "")),
    dateUndecided: formData.get("dateUndecided") === "yes",
    guestRange: isGuestRangeId(guestRangeRaw) ? guestRangeRaw : "",
    experiences: unique,
    eventObjective: isObjectiveId(objectiveRaw) ? objectiveRaw : "",
    additionalNotes: messageText(String(formData.get("additionalNotes") ?? "")).slice(0, quoteLimits.notes + 1),
    firstName: singleLine(String(formData.get("firstName") ?? "")),
    lastName: singleLine(String(formData.get("lastName") ?? "")),
    email: singleLine(String(formData.get("email") ?? "")),
    phone: singleLine(String(formData.get("phone") ?? "")),
    company: singleLine(String(formData.get("company") ?? "")),
    contactPreference: isContactPreferenceId(preferenceRaw) ? preferenceRaw : "",
    referralSource,
    referralSourceOther:
      referralSource === "other" ? singleLine(String(formData.get("referralSourceOther") ?? "")) : "",
  };
}

function isLocale(value: string): value is QuoteLocale {
  return locales.has(value);
}

export async function processQuoteSubmission(
  formData: FormData,
  delivery: QuoteDelivery,
): Promise<QuoteSubmitResult> {
  if (!delivery.enabled) {
    return { status: "unavailable" };
  }

  if (payloadTooLarge(formData)) {
    return { status: "error" };
  }

  const now = delivery.now ?? Date.now();
  const read = readDraft(formData);
  if (read === "spam" || timingRejected(formData, now)) {
    return { status: "error" };
  }

  const rawExperiences = formData.getAll("experiences");
  const objectiveRaw = singleLine(String(formData.get("eventObjective") ?? ""));
  const referralRaw = singleLine(String(formData.get("referralSource") ?? ""));
  const choiceErrors: QuoteErrors = {};
  if (
    rawExperiences.length > experienceIds.length ||
    rawExperiences.some(
      (value) => typeof value !== "string" || (singleLine(value) !== "" && !isExperienceId(singleLine(value))),
    )
  ) {
    choiceErrors["quote-experiences"] = "errors.choice";
  }
  if (objectiveRaw !== "" && !isObjectiveId(objectiveRaw)) {
    choiceErrors["quote-objective"] = "errors.choice";
  }
  if (referralRaw !== "" && !isReferralSourceId(referralRaw)) {
    choiceErrors["quote-referral"] = "errors.choice";
  }
  if (Object.keys(choiceErrors).length > 0) {
    return { status: "invalid", fields: choiceErrors };
  }

  const today = localTodayIso(new Date(now));
  const validated = validateQuoteDraft(read, today);
  if (!validated.ok) {
    return { status: "invalid", fields: validated.errors };
  }

  if (
    !isEventTypeId(read.eventType) ||
    !isGuestRangeId(read.guestRange) ||
    !isContactPreferenceId(read.contactPreference)
  ) {
    return { status: "error" };
  }

  if (!delivery.allow()) {
    console.error("[quote] submission throttled");
    return { status: "error" };
  }

  if (!delivery.configured) {
    return { status: "error" };
  }

  const localeRaw = singleLine(String(formData.get("locale") ?? ""));
  const inquiry: QuoteInquiry = {
    locale: isLocale(localeRaw) ? localeRaw : "it",
    eventType: read.eventType,
    eventLocation: read.eventLocation.trim(),
    eventDate: read.dateUndecided ? "" : read.eventDate,
    dateUndecided: read.dateUndecided,
    guestRange: read.guestRange,
    experiences: read.experiences,
    eventObjective: isObjectiveId(read.eventObjective) ? read.eventObjective : "",
    additionalNotes: read.additionalNotes.trim(),
    firstName: read.firstName.trim(),
    lastName: read.lastName.trim(),
    email: read.email.trim(),
    phone: read.phone.trim(),
    company: read.company.trim(),
    contactPreference: read.contactPreference,
    referralSource: isReferralSourceId(read.referralSource) ? read.referralSource : "",
    referralSourceOther: read.referralSourceOther.trim(),
    submittedAt: new Date(now).toISOString(),
  };

  try {
    const sent = await delivery.send(inquiry);
    return sent === "sent" ? { status: "sent" } : { status: "error" };
  } catch (error) {
    console.error("[quote] delivery failed", error instanceof Error ? error.name : "unknown");
    return { status: "error" };
  }
}
