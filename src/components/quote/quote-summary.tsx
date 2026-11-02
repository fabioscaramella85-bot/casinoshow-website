"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { formatQuoteDate, type QuoteDraft } from "@/lib/quote/types";

type QuoteSummaryProps = {
  draft: QuoteDraft;
  locale: string;
  onEditEvent: () => void;
  onEditExperience: () => void;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line-on-light py-4">
      <dt className="type-eyebrow text-gold-ink">{label}</dt>
      <dd className="type-body mt-2 whitespace-pre-wrap">{value}</dd>
    </div>
  );
}

export function QuoteSummary({ draft, locale, onEditEvent, onEditExperience }: QuoteSummaryProps) {
  const t = useTranslations("Quote");
  const experiences = draft.experiences.map((id) => t(`options.experiences.${id}.title`)).join(", ");

  return (
    <section aria-labelledby="quote-summary-title" className="border border-line-on-light p-6">
      <h3 id="quote-summary-title" className="type-h3">
        {t("summary.title")}
      </h3>
      <dl className="mt-4">
        <Row
          label={t("summary.eventType")}
          value={draft.eventType ? t(`options.eventType.${draft.eventType}.title`) : t("summary.empty")}
        />
        <Row label={t("summary.location")} value={draft.eventLocation.trim() || t("summary.empty")} />
        <Row
          label={t("summary.date")}
          value={
            draft.dateUndecided
              ? t("fields.date.undecided")
              : draft.eventDate
                ? formatQuoteDate(draft.eventDate, locale)
                : t("summary.empty")
          }
        />
        <Row
          label={t("summary.guests")}
          value={draft.guestRange ? t(`options.guests.${draft.guestRange}`) : t("summary.empty")}
        />
        <Row label={t("summary.experiences")} value={experiences || t("summary.empty")} />
        {draft.eventObjective ? (
          <Row label={t("summary.objective")} value={t(`options.objective.${draft.eventObjective}`)} />
        ) : null}
        {draft.additionalNotes.trim() ? (
          <Row label={t("summary.notes")} value={draft.additionalNotes.trim()} />
        ) : null}
        {draft.referralSource ? (
          <Row
            label={t("summary.referral")}
            value={
              draft.referralSource === "other" && draft.referralSourceOther.trim()
                ? `${t("options.referral.other")}: ${draft.referralSourceOther.trim()}`
                : t(`options.referral.${draft.referralSource}`)
            }
          />
        ) : null}
      </dl>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onEditEvent}>
          {t("nav.editEvent")}
        </Button>
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onEditExperience}>
          {t("nav.editExperience")}
        </Button>
      </div>
    </section>
  );
}
