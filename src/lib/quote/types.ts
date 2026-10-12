export const eventTypeIds = [
  "corporate",
  "dinner",
  "wedding",
  "private",
  "gala",
  "other",
] as const;

export const guestRangeIds = [
  "up-to-30",
  "30-60",
  "60-100",
  "100-200",
  "over-200",
  "unsure",
] as const;

export const durationIds = ["up-to-2", "2-4", "over-4", "unsure"] as const;

export const experienceIds = [
  "casino-party",
  "roulette",
  "blackjack",
  "poker",
  "dice",
  "wheel-of-fortune",
  "selfie-mirror",
  "experience-360",
  "other-games",
  "recommendation",
] as const;

export const objectiveIds = [
  "team",
  "entertainment",
  "clients",
  "dinner",
  "celebration",
  "other",
] as const;

export const contactPreferenceIds = ["email", "phone", "whatsapp", "none"] as const;

export type EventTypeId = (typeof eventTypeIds)[number];
export type GuestRangeId = (typeof guestRangeIds)[number];
export type DurationId = (typeof durationIds)[number];
export type ExperienceId = (typeof experienceIds)[number];
export type ObjectiveId = (typeof objectiveIds)[number];
export type ContactPreferenceId = (typeof contactPreferenceIds)[number];
export type QuoteStep = 1 | 2 | 3;

export type QuoteDraft = {
  eventType: EventTypeId | "";
  eventLocation: string;
  eventDate: string;
  dateUndecided: boolean;
  guestRange: GuestRangeId | "";
  duration: DurationId | "";
  experiences: ExperienceId[];
  eventObjective: ObjectiveId | "";
  additionalNotes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  contactPreference: ContactPreferenceId | "";
};

export const quoteLimits = {
  location: 120,
  notes: 1000,
  name: 80,
  email: 120,
  phone: 30,
  company: 120,
} as const;

export function emptyQuoteDraft(): QuoteDraft {
  return {
    eventType: "",
    eventLocation: "",
    eventDate: "",
    dateUndecided: false,
    guestRange: "",
    duration: "",
    experiences: [],
    eventObjective: "",
    additionalNotes: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    contactPreference: "",
  };
}

export function localTodayIso(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dateLocales: Record<string, string> = {
  it: "it-CH",
  de: "de-CH",
  fr: "fr-CH",
  en: "en-GB",
};

export function formatQuoteDate(iso: string, locale: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    return iso;
  }
  return new Intl.DateTimeFormat(dateLocales[locale] ?? locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

function includesId<T extends string>(ids: readonly T[], value: string): value is T {
  return (ids as readonly string[]).includes(value);
}

export function isEventTypeId(value: string): value is EventTypeId {
  return includesId(eventTypeIds, value);
}

export function isGuestRangeId(value: string): value is GuestRangeId {
  return includesId(guestRangeIds, value);
}

export function isDurationId(value: string): value is DurationId {
  return includesId(durationIds, value);
}

export function isExperienceId(value: string): value is ExperienceId {
  return includesId(experienceIds, value);
}

export function isObjectiveId(value: string): value is ObjectiveId {
  return includesId(objectiveIds, value);
}

export function isContactPreferenceId(value: string): value is ContactPreferenceId {
  return includesId(contactPreferenceIds, value);
}
