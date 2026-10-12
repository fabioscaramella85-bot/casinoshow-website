"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { QuoteProgress } from "@/components/quote/quote-progress";
import { QuoteStepContact } from "@/components/quote/quote-step-contact";
import { QuoteStepEvent } from "@/components/quote/quote-step-event";
import { QuoteStepExperience } from "@/components/quote/quote-step-experience";
import { emptyQuoteDraft, localTodayIso, type QuoteDraft, type QuoteStep } from "@/lib/quote/types";
import { validateQuoteStep, type QuoteErrors } from "@/lib/quote/validation";

const stepKeys = { 1: "event", 2: "experience", 3: "contact" } as const;

function focusTarget(id: string) {
  const node = document.getElementById(id);
  if (!node) {
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.focus();
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
}

export function QuoteWizard() {
  const t = useTranslations("Quote");
  const locale = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const pendingFocus = useRef<string | null>(null);
  const [step, setStep] = useState<QuoteStep>(1);
  const [maxReached, setMaxReached] = useState<QuoteStep>(1);
  const [draft, setDraft] = useState<QuoteDraft>(emptyQuoteDraft);
  const [errors, setErrors] = useState<QuoteErrors>({});

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const field = pendingFocus.current;
    pendingFocus.current = null;
    if (field) {
      focusTarget(field);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [step, errors]);

  function patch(next: Partial<QuoteDraft>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  function fail(nextStep: QuoteStep, nextErrors: QuoteErrors, firstField: string) {
    pendingFocus.current = firstField;
    setErrors(nextErrors);
    setStep(nextStep);
  }

  function goTo(target: QuoteStep) {
    if (target === step) {
      return;
    }
    if (target < step) {
      setErrors({});
      setStep(target);
      return;
    }
    const today = localTodayIso();
    for (let current = step; current < target; current += 1) {
      const result = validateQuoteStep(draft, current as QuoteStep, today);
      if (!result.ok) {
        fail(current as QuoteStep, result.errors, result.firstField);
        return;
      }
    }
    setErrors({});
    setMaxReached((value) => (target > value ? target : value));
    setStep(target);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      goTo((step + 1) as QuoteStep);
      return;
    }
    const result = validateQuoteStep(draft, 3, localTodayIso());
    if (!result.ok) {
      fail(3, result.errors, result.firstField);
      return;
    }
    setErrors({});
  }

  const errorEntries = Object.entries(errors);

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="quote-step-title" className="min-w-0">
      <p className="type-small text-text-muted-on-light">{t("wizard.localeNote")}</p>
      <div className="mt-6">
        <QuoteProgress step={step} maxReached={maxReached} onStep={goTo} />
      </div>
      {errorEntries.length > 0 ? (
        <div role="alert" className="mt-6 border border-brand-red px-4 py-4">
          <p className="type-body">{t("errors.summary")}</p>
          <ul className="mt-3 grid gap-2">
            {errorEntries.map(([id, key]) =>
              key ? (
                <li key={id}>
                  <button
                    type="button"
                    className="type-small min-h-11 text-left text-brand-red underline"
                    onClick={() => focusTarget(id)}
                  >
                    {t(key)}
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      ) : null}
      <h2
        id="quote-step-title"
        ref={headingRef}
        tabIndex={-1}
        className="type-h2 mt-10 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-midnight"
      >
        {t(`steps.${stepKeys[step]}.title`)}
      </h2>
      <p className="type-body mt-4 max-w-2xl text-text-muted-on-light">
        {t(`steps.${stepKeys[step]}.support`)}
      </p>
      <div className="mt-10">
        {step === 1 ? <QuoteStepEvent draft={draft} errors={errors} onChange={patch} /> : null}
        {step === 2 ? (
          <QuoteStepExperience draft={draft} errors={errors} onChange={patch} />
        ) : null}
        {step === 3 ? (
          <QuoteStepContact
            draft={draft}
            errors={errors}
            locale={locale}
            onChange={patch}
            onEditEvent={() => goTo(1)}
            onEditExperience={() => goTo(2)}
          />
        ) : null}
      </div>
      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => goTo((step - 1) as QuoteStep)}>
            {t("nav.back")}
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={() => goTo((step + 1) as QuoteStep)}>{t("nav.next")}</Button>
        ) : null}
      </div>
    </form>
  );
}
