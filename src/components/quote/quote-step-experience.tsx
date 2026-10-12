"use client";

import { useTranslations } from "next-intl";
import { QuoteOptionCard } from "@/components/quote/quote-option-card";
import {
  experienceIds,
  objectiveIds,
  quoteLimits,
  type ExperienceId,
  type ObjectiveId,
  type QuoteDraft,
} from "@/lib/quote/types";
import type { QuoteErrors } from "@/lib/quote/validation";

type QuoteStepExperienceProps = {
  draft: QuoteDraft;
  errors: QuoteErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepExperience({ draft, errors, onChange }: QuoteStepExperienceProps) {
  const t = useTranslations("Quote");
  const optional = t("fields.optional");

  function toggleExperience(id: ExperienceId) {
    const experiences = draft.experiences.includes(id)
      ? draft.experiences.filter((item) => item !== id)
      : [...draft.experiences, id];
    onChange({ experiences });
  }

  return (
    <div className="grid gap-10">
      <fieldset
        id="quote-experiences"
        tabIndex={-1}
        aria-invalid={errors["quote-experiences"] ? true : undefined}
        aria-describedby={
          errors["quote-experiences"] ? "quote-experiences-error" : "quote-experiences-hint"
        }
        className="min-w-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-midnight"
      >
        <legend className="type-h4">
          {t("fields.experiences.label")}
          <span className="type-small mt-1 block font-normal text-gold-ink">{optional}</span>
        </legend>
        <p id="quote-experiences-hint" className="type-small mt-2 max-w-2xl text-text-muted-on-light">
          {t("fields.experiences.hint")}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {experienceIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="checkbox"
              name="experiences"
              value={id}
              checked={draft.experiences.includes(id)}
              title={t(`options.experiences.${id}.title`)}
              body={t(`options.experiences.${id}.body`)}
              onSelect={() => toggleExperience(id)}
            />
          ))}
        </div>
        {errors["quote-experiences"] ? (
          <p id="quote-experiences-error" className="type-small mt-3 text-brand-red">
            {t(errors["quote-experiences"])}
          </p>
        ) : null}
      </fieldset>
      <fieldset
        id="quote-objective"
        tabIndex={-1}
        className="min-w-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-midnight"
      >
        <legend className="type-h4">
          {t("fields.objective.label")}
          <span className="type-small mt-1 block font-normal text-gold-ink">{optional}</span>
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {objectiveIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="radio"
              name="eventObjective"
              value={id}
              checked={draft.eventObjective === id}
              allowClear
              title={t(`options.objective.${id}`)}
              onSelect={() => onChange({ eventObjective: id as ObjectiveId })}
              onClear={() => onChange({ eventObjective: "" })}
            />
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="quote-notes" className="type-h4 block">
          {t("fields.notes.label")}
          <span className="type-small mt-1 block font-normal text-gold-ink">{optional}</span>
        </label>
        <p id="quote-notes-hint" className="type-small mt-2 text-text-muted-on-light">
          {t("fields.notes.hint")}
        </p>
        <textarea
          id="quote-notes"
          name="quote-notes"
          value={draft.additionalNotes}
          maxLength={quoteLimits.notes}
          rows={5}
          aria-invalid={errors["quote-notes"] ? true : undefined}
          aria-describedby={errors["quote-notes"] ? "quote-notes-error" : "quote-notes-hint"}
          onChange={(event) => onChange({ additionalNotes: event.target.value })}
          className="type-body mt-3 w-full min-w-0 max-w-full border border-line-on-light bg-ivory px-3 py-3 text-midnight"
        />
        {errors["quote-notes"] ? (
          <p id="quote-notes-error" className="type-small mt-2 text-brand-red">
            {t(errors["quote-notes"])}
          </p>
        ) : null}
      </div>
    </div>
  );
}
