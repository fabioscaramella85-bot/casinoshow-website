import { inspectCv } from "./cv";
import type { CareersInquiry } from "./inquiry";
import {
  careersTimingError,
  readCareersValues,
  validateCareersValues,
  type CareerCountry,
  type CareerExperience,
  type CareersFieldErrors,
} from "./schema";

export type CareersSubmitResult =
  | { status: "invalid"; fields: CareersFieldErrors }
  | { status: "sent" }
  | { status: "unavailable" }
  | { status: "error" };

export type CareersDelivery = {
  now?: number;
  configured: boolean;
  allow: () => boolean;
  send: (inquiry: CareersInquiry) => Promise<"sent" | "error">;
};

function firstError(fields: CareersFieldErrors): CareersSubmitResult {
  return { status: "invalid", fields };
}

export async function processCareersSubmission(
  formData: FormData,
  delivery: CareersDelivery,
): Promise<CareersSubmitResult> {
  const now = delivery.now ?? Date.now();
  const read = readCareersValues(formData);

  if (read === "spam" || careersTimingError(formData, now)) {
    return { status: "error" };
  }

  const fields = validateCareersValues(read, formData, new Date(now));
  const rawCv = formData.get("cv");
  const file = rawCv instanceof File ? rawCv : null;
  const inspected = await inspectCv(file);
  if (!inspected.ok) {
    fields.cv = inspected.error;
  }

  if (Object.keys(fields).length > 0) {
    return firstError(fields);
  }

  if (!read.country || !read.experience || !inspected.ok) {
    return { status: "error" };
  }

  if (!delivery.allow()) {
    console.error("[careers] submission throttled");
    return { status: "error" };
  }

  if (!delivery.configured) {
    return { status: "error" };
  }

  const submittedAt = new Date(now).toISOString();
  const inquiry: CareersInquiry = {
    ...read,
    country: read.country as CareerCountry,
    experience: read.experience as CareerExperience,
    privacyConsent: true,
    consentedAt: submittedAt,
    submittedAt,
    cv: inspected.cv,
  };

  try {
    const sent = await delivery.send(inquiry);
    return sent === "sent" ? { status: "sent" } : { status: "error" };
  } catch (error) {
    console.error("[careers] delivery failed", error instanceof Error ? error.name : "unknown");
    return { status: "error" };
  }
}
