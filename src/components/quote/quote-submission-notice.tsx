"use client";

import { useTranslations } from "next-intl";

export function QuoteSubmissionNotice() {
  const t = useTranslations("Quote");

  return (
    <p className="type-body border border-brand-gold bg-ivory px-4 py-4 text-text-on-light" role="status">
      {t("submission.notice")}
    </p>
  );
}
