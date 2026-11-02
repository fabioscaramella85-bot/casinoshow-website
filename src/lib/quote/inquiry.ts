import type {
  ContactPreferenceId,
  EventTypeId,
  ExperienceId,
  GuestRangeId,
  ObjectiveId,
  ReferralSourceId,
} from "./types";

export type QuoteLocale = "it" | "de" | "fr" | "en";

export type QuoteInquiry = {
  locale: QuoteLocale;
  eventType: EventTypeId;
  eventLocation: string;
  eventDate: string;
  dateUndecided: boolean;
  guestRange: GuestRangeId;
  experiences: ExperienceId[];
  eventObjective: ObjectiveId | "";
  additionalNotes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  contactPreference: ContactPreferenceId;
  referralSource: ReferralSourceId | "";
  referralSourceOther: string;
  submittedAt: string;
};
