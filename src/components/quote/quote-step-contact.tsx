"use client";

import { useTranslations } from "next-intl";
import { QuoteField } from "@/components/quote/quote-field";
import { QuoteOptionCard } from "@/components/quote/quote-option-card";
import { QuoteSubmissionNotice } from "@/components/quote/quote-submission-notice";
import { QuoteSummary } from "@/components/quote/quote-summary";
import {
  contactPreferenceIds,
  quoteLimits,
  type ContactPreferenceId,
  type QuoteDraft,
} from "@/lib/quote/types";
import type { QuoteErrors } from "@/lib/quote/validation";

type QuoteStepContactProps = {
  draft: QuoteDraft;
  errors: QuoteErrors;
  locale: string;
  onChange: (patch: Partial<QuoteDraft>) => void;
  onEditEvent: () => void;
  onEditExperience: () => void;
};

export function QuoteStepContact({
  draft,
  errors,
  locale,
  onChange,
  onEditEvent,
  onEditExperience,
}: QuoteStepContactProps) {
  const t = useTranslations("Quote");
  const required = t("fields.required");
  const optional = t("fields.optional");

  return (
    <div className="grid gap-10">
      <QuoteSummary
        draft={draft}
        locale={locale}
        onEditEvent={onEditEvent}
        onEditExperience={onEditExperience}
      />
      <div className="grid gap-6">
        <QuoteField
          id="quote-firstName"
          label={t("fields.firstName")}
          requirement={required}
          required
          autoComplete="given-name"
          value={draft.firstName}
          maxLength={quoteLimits.name}
          error={errors["quote-firstName"] ? t(errors["quote-firstName"]) : undefined}
          errorId="quote-firstName-error"
          onChange={(firstName) => onChange({ firstName })}
        />
        <QuoteField
          id="quote-lastName"
          label={t("fields.lastName")}
          requirement={required}
          required
          autoComplete="family-name"
          value={draft.lastName}
          maxLength={quoteLimits.name}
          error={errors["quote-lastName"] ? t(errors["quote-lastName"]) : undefined}
          errorId="quote-lastName-error"
          onChange={(lastName) => onChange({ lastName })}
        />
        <QuoteField
          id="quote-email"
          type="email"
          label={t("fields.email")}
          requirement={required}
          required
          autoComplete="email"
          value={draft.email}
          maxLength={quoteLimits.email}
          error={errors["quote-email"] ? t(errors["quote-email"]) : undefined}
          errorId="quote-email-error"
          onChange={(email) => onChange({ email })}
        />
        <QuoteField
          id="quote-phone"
          type="tel"
          label={t("fields.phone")}
          requirement={required}
          required
          autoComplete="tel"
          hint={t("fields.phoneHint")}
          hintId="quote-phone-hint"
          value={draft.phone}
          maxLength={quoteLimits.phone}
          error={errors["quote-phone"] ? t(errors["quote-phone"]) : undefined}
          errorId="quote-phone-error"
          onChange={(phone) => onChange({ phone })}
        />
        <QuoteField
          id="quote-company"
          label={t("fields.company")}
          requirement={optional}
          autoComplete="organization"
          value={draft.company}
          maxLength={quoteLimits.company}
          error={errors["quote-company"] ? t(errors["quote-company"]) : undefined}
          errorId="quote-company-error"
          onChange={(company) => onChange({ company })}
        />
      </div>
      <fieldset
        id="quote-preference"
        tabIndex={-1}
        aria-invalid={errors["quote-preference"] ? true : undefined}
        aria-describedby={
          errors["quote-preference"] ? "quote-preference-error" : "quote-preference-hint"
        }
        className="min-w-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-midnight"
      >
        <legend className="type-h4">
          {t("fields.preference")}
          <span className="type-small mt-1 block font-normal text-gold-ink">{required}</span>
        </legend>
        <p id="quote-preference-hint" className="type-small mt-2 text-text-muted-on-light">
          {t("fields.preferenceHint")}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {contactPreferenceIds.map((id) => (
            <QuoteOptionCard
              key={id}
              type="radio"
              name="contactPreference"
              value={id}
              checked={draft.contactPreference === id}
              title={t(`options.preference.${id}`)}
              onSelect={() => onChange({ contactPreference: id as ContactPreferenceId })}
            />
          ))}
        </div>
        {errors["quote-preference"] ? (
          <p id="quote-preference-error" className="type-small mt-3 text-brand-red">
            {t(errors["quote-preference"])}
          </p>
        ) : null}
      </fieldset>
      <section aria-labelledby="quote-privacy-title" className="border border-line-on-light p-6">
        <h3 id="quote-privacy-title" className="type-h4">
          {t("privacy.title")}
        </h3>
        <p className="type-body mt-3 text-text-muted-on-light">{t("privacy.body")}</p>
      </section>
      <QuoteSubmissionNotice />
    </div>
  );
}
