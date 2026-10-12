import {
  isContactPreferenceId,
  isDurationId,
  isEventTypeId,
  isExperienceId,
  isGuestRangeId,
  isObjectiveId,
  quoteLimits,
  type QuoteDraft,
  type QuoteStep,
} from "./types";

export type QuoteErrors = Partial<Record<string, string>>;

export type QuoteValidation =
  | { ok: true }
  | { ok: false; errors: QuoteErrors; firstField: string };

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

function validCalendarDate(value: string): boolean {
  const match = datePattern.exec(value);
  if (!match) {
    return false;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function reasonablePhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[+\d][\d\s()./-]*$/.test(trimmed)) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function reasonableEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function fail(errors: QuoteErrors, firstField: string): QuoteValidation {
  const first = Object.keys(errors)[0] ?? firstField;
  return { ok: false, errors, firstField: first };
}

export function validateQuoteStep(
  draft: QuoteDraft,
  step: QuoteStep,
  todayIso: string,
): QuoteValidation {
  const errors: QuoteErrors = {};

  if (step === 1) {
    if (!isEventTypeId(draft.eventType)) {
      errors["quote-eventType"] = "errors.eventType";
    }
    const location = draft.eventLocation.trim();
    if (!location) {
      errors["quote-location"] = "errors.location";
    } else if (location.length > quoteLimits.location) {
      errors["quote-location"] = "errors.locationMax";
    }
    if (!draft.dateUndecided) {
      if (!draft.eventDate) {
        errors["quote-date"] = "errors.date";
      } else if (!validCalendarDate(draft.eventDate)) {
        errors["quote-date"] = "errors.dateInvalid";
      } else if (draft.eventDate < todayIso) {
        errors["quote-date"] = "errors.datePast";
      }
    }
    if (!isGuestRangeId(draft.guestRange)) {
      errors["quote-guests"] = "errors.guests";
    }
    if (draft.duration && !isDurationId(draft.duration)) {
      errors["quote-duration"] = "errors.choice";
    }
  }

  if (step === 2) {
    if (draft.experiences.some((id) => !isExperienceId(id))) {
      errors["quote-experiences"] = "errors.choice";
    }
    if (draft.eventObjective && !isObjectiveId(draft.eventObjective)) {
      errors["quote-objective"] = "errors.choice";
    }
    if (draft.additionalNotes.trim().length > quoteLimits.notes) {
      errors["quote-notes"] = "errors.notesMax";
    }
  }

  if (step === 3) {
    const firstName = draft.firstName.trim();
    const lastName = draft.lastName.trim();
    if (!firstName) {
      errors["quote-firstName"] = "errors.firstName";
    } else if (firstName.length > quoteLimits.name) {
      errors["quote-firstName"] = "errors.nameMax";
    }
    if (!lastName) {
      errors["quote-lastName"] = "errors.lastName";
    } else if (lastName.length > quoteLimits.name) {
      errors["quote-lastName"] = "errors.nameMax";
    }
    const email = draft.email.trim();
    if (!email || email.length > quoteLimits.email || !reasonableEmail(email)) {
      errors["quote-email"] = "errors.email";
    }
    const phone = draft.phone.trim();
    if (!phone || phone.length > quoteLimits.phone || !reasonablePhone(phone)) {
      errors["quote-phone"] = "errors.phone";
    }
    if (draft.company.trim().length > quoteLimits.company) {
      errors["quote-company"] = "errors.companyMax";
    }
    if (!isContactPreferenceId(draft.contactPreference)) {
      errors["quote-preference"] = "errors.preference";
    }
  }

  if (Object.keys(errors).length > 0) {
    return fail(errors, Object.keys(errors)[0]);
  }
  return { ok: true };
}
