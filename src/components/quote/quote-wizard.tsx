"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitQuoteRequest } from "@/app/[locale]/quote/actions";
import { Button } from "@/components/ui/button";
import { QuoteProgress } from "@/components/quote/quote-progress";
import { QuoteStepContact } from "@/components/quote/quote-step-contact";
import { QuoteStepEvent } from "@/components/quote/quote-step-event";
import { QuoteStepExperience } from "@/components/quote/quote-step-experience";
import { emptyQuoteDraft, localTodayIso, type QuoteDraft, type QuoteStep } from "@/lib/quote/types";
import { validateQuoteStep, type QuoteErrors } from "@/lib/quote/validation";

const stepKeys = { 1: "event", 2: "experience", 3: "contact" } as const;

type QuoteWizardProps = {
  deliveryEnabled?: boolean;
};

type SendPhase = "idle" | "submitting" | "sent" | "unavailable" | "error";

function stepForField(id: string): QuoteStep {
  if (id === "quote-experiences" || id === "quote-objective" || id === "quote-notes") return 2;
  if (
    id === "quote-firstName" ||
    id === "quote-lastName" ||
    id === "quote-email" ||
    id === "quote-phone" ||
    id === "quote-company" ||
    id === "quote-preference" ||
    id === "quote-referral" ||
    id === "quote-referral-other"
  ) {
    return 3;
  }
  return 1;
}

function focusTarget(id: string) {
  const node = document.getElementById(id);
  if (!node) {
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.focus();
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
}

export function QuoteWizard({ deliveryEnabled = false }: QuoteWizardProps) {
  const t = useTranslations("Quote");
  const locale = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const sending = useRef(false);
  const mounted = useRef(false);
  const pendingFocus = useRef<string | null>(null);
  const [step, setStep] = useState<QuoteStep>(1);
  const [maxReached, setMaxReached] = useState<QuoteStep>(1);
  const [draft, setDraft] = useState<QuoteDraft>(emptyQuoteDraft);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [phase, setPhase] = useState<SendPhase>("idle");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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

  function quoteFormData(): FormData {
    const data = new FormData();
    data.set("locale", locale);
    data.set("startedAt", String(startedAt.current));
    data.set("company_website", honeypotRef.current?.value ?? "");
    data.set("eventType", draft.eventType);
    data.set("eventLocation", draft.eventLocation);
    data.set("eventDate", draft.eventDate);
    data.set("dateUndecided", draft.dateUndecided ? "yes" : "no");
    data.set("guestRange", draft.guestRange);
    for (const id of draft.experiences) data.append("experiences", id);
    data.set("eventObjective", draft.eventObjective);
    data.set("additionalNotes", draft.additionalNotes);
    data.set("firstName", draft.firstName);
    data.set("lastName", draft.lastName);
    data.set("email", draft.email);
    data.set("phone", draft.phone);
    data.set("company", draft.company);
    data.set("contactPreference", draft.contactPreference);
    data.set("referralSource", draft.referralSource);
    data.set("referralSourceOther", draft.referralSourceOther);
    return data;
  }

  async function sendRequest() {
    if (sending.current) return;
    const result = validateQuoteStep(draft, 3, localTodayIso());
    if (!result.ok) {
      fail(3, result.errors, result.firstField);
      setPhase("idle");
      return;
    }
    setErrors({});
    if (!deliveryEnabled) {
      setPhase("unavailable");
      return;
    }
    sending.current = true;
    setPhase("submitting");
    try {
      const response = await submitQuoteRequest(quoteFormData());
      if (response.status === "sent") {
        setPhase("sent");
        return;
      }
      if (response.status === "invalid") {
        const first = Object.keys(response.fields)[0] ?? "quote-firstName";
        fail(stepForField(first), response.fields, first);
        setPhase("idle");
        return;
      }
      if (response.status === "unavailable") {
        setPhase("unavailable");
        return;
      }
      setPhase("error");
    } finally {
      sending.current = false;
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      goTo((step + 1) as QuoteStep);
      return;
    }
    void sendRequest();
  }

  const errorEntries = Object.entries(errors);

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="quote-step-title" className="relative min-w-0">
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input ref={honeypotRef} name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
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
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => goTo((step - 1) as QuoteStep)}
          >
            {t("nav.back")}
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button className="w-full sm:w-auto" onClick={() => goTo((step + 1) as QuoteStep)}>
            {t("nav.next")}
          </Button>
        ) : (
          <div className="grid w-full gap-3 sm:w-auto">
            {phase === "sent" || phase === "unavailable" || phase === "error" ? (
              <p
                role={phase === "error" ? "alert" : "status"}
                className={`type-body border px-4 py-4 ${
                  phase === "error" ? "border-brand-red text-brand-red" : "border-brand-gold text-text-on-light"
                }`}
              >
                {t(
                  phase === "sent"
                    ? "submission.success"
                    : phase === "unavailable"
                      ? "submission.unavailable"
                      : "submission.error",
                )}
              </p>
            ) : null}
            <Button className="w-full sm:w-auto" disabled={phase === "submitting"} onClick={() => void sendRequest()}>
              {phase === "submitting" ? t("nav.submitting") : t("nav.submit")}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
