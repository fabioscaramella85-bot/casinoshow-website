"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { QuoteField } from "@/components/quote/quote-field";
import { QuoteOptionCard } from "@/components/quote/quote-option-card";
import {
  durationIds,
  eventTypeIds,
  guestRangeIds,
  localTodayIso,
  quoteLimits,
  type DurationId,
  type EventTypeId,
  type GuestRangeId,
  type QuoteDraft,
} from "@/lib/quote/types";
import type { QuoteErrors } from "@/lib/quote/validation";

type QuoteStepEventProps = {
  draft: QuoteDraft;
  errors: QuoteErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepEvent({ draft, errors, onChange }: QuoteStepEventProps) {
  const t = useTranslations("Quote");
  const required = t("fields.required");
  const optional = t("fields.optional");

  return (
    <div className="grid gap-10">
      <ChoiceGroup
        id="quote-eventType"
        legend={t("fields.eventType.label")}
        requirement={required}
        error={errors["quote-eventType"] ? t(errors["quote-eventType"]) : undefined}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {eventTypeIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="radio"
              name="eventType"
              value={id}
              checked={draft.eventType === id}
              title={t(`options.eventType.${id}.title`)}
              body={t(`options.eventType.${id}.body`)}
              onSelect={() => onChange({ eventType: id as EventTypeId })}
            />
          ))}
        </div>
      </ChoiceGroup>
      <QuoteField
        id="quote-location"
        label={t("fields.location.label")}
        requirement={required}
        required
        hint={t("fields.location.hint")}
        hintId="quote-location-hint"
        value={draft.eventLocation}
        maxLength={quoteLimits.location}
        autoComplete="address-level2"
        error={errors["quote-location"] ? t(errors["quote-location"]) : undefined}
        errorId="quote-location-error"
        onChange={(eventLocation) => onChange({ eventLocation })}
      />
      <div>
        <QuoteField
          id="quote-date"
          type="date"
          label={t("fields.date.label")}
          requirement={draft.dateUndecided ? optional : required}
          required={!draft.dateUndecided}
          hint={t("fields.date.hint")}
          hintId="quote-date-hint"
          value={draft.eventDate}
          min={localTodayIso()}
          suppressHydrationWarning
          disabled={draft.dateUndecided}
          error={errors["quote-date"] ? t(errors["quote-date"]) : undefined}
          errorId="quote-date-error"
          onChange={(eventDate) => onChange({ eventDate })}
        />
        <label className="type-body mt-4 flex min-h-11 items-center gap-3">
          <input
            id="quote-date-undecided"
            type="checkbox"
            className="size-5 accent-midnight"
            checked={draft.dateUndecided}
            onChange={(event) => onChange({ dateUndecided: event.target.checked })}
          />
          {t("fields.date.undecided")}
        </label>
      </div>
      <ChoiceGroup
        id="quote-guests"
        legend={t("fields.guests.label")}
        requirement={required}
        hint={t("fields.guests.hint")}
        error={errors["quote-guests"] ? t(errors["quote-guests"]) : undefined}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guestRangeIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="radio"
              name="guestRange"
              value={id}
              checked={draft.guestRange === id}
              title={t(`options.guests.${id}`)}
              onSelect={() => onChange({ guestRange: id as GuestRangeId })}
            />
          ))}
        </div>
      </ChoiceGroup>
      <ChoiceGroup
        id="quote-duration"
        legend={t("fields.duration.label")}
        requirement={optional}
        hint={t("fields.duration.hint")}
        error={errors["quote-duration"] ? t(errors["quote-duration"]) : undefined}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {durationIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="radio"
              name="duration"
              value={id}
              checked={draft.duration === id}
              allowClear
              title={t(`options.duration.${id}`)}
              onSelect={() => onChange({ duration: id as DurationId })}
              onClear={() => onChange({ duration: "" })}
            />
          ))}
        </div>
      </ChoiceGroup>
    </div>
  );
}

function ChoiceGroup({
  id,
  legend,
  requirement,
  hint,
  error,
  children,
}: {
  id: string;
  legend: string;
  requirement: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className="min-w-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-midnight"
    >
      <legend className="type-h4">
        {legend}
        <span className="type-small mt-1 block font-normal text-gold-ink">{requirement}</span>
      </legend>
      {hint ? (
        <p id={`${id}-hint`} className="type-small mt-2 text-text-muted-on-light">
          {hint}
        </p>
      ) : null}
      <div className="mt-4">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="type-small mt-3 text-brand-red">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
