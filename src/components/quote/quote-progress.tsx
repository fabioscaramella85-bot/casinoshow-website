"use client";

import { useTranslations } from "next-intl";
import type { QuoteStep } from "@/lib/quote/types";

const steps = [1, 2, 3] as const;

type QuoteProgressProps = {
  step: QuoteStep;
  maxReached: QuoteStep;
  onStep: (step: QuoteStep) => void;
};

export function QuoteProgress({ step, maxReached, onStep }: QuoteProgressProps) {
  const t = useTranslations("Quote");
  const labels = {
    1: t("progress.event"),
    2: t("progress.experience"),
    3: t("progress.contact"),
  } as const;

  return (
    <ol aria-label={t("progress.label")} className="grid gap-2 sm:grid-cols-3">
      {steps.map((item) => {
        const current = item === step;
        return (
          <li key={item}>
            <button
              type="button"
              aria-current={current ? "step" : undefined}
              disabled={item > maxReached}
              onClick={() => onStep(item)}
              className={`type-small flex min-h-11 w-full flex-col items-start justify-center border px-3 py-2 text-left disabled:opacity-45 ${
                current
                  ? "border-midnight bg-midnight text-ivory"
                  : "border-line-on-light bg-transparent text-midnight"
              }`}
            >
              <span className={`type-eyebrow ${current ? "text-ivory" : "text-gold-ink"}`}>
                0{item}
              </span>
              {labels[item]}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
