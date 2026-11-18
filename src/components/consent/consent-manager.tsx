"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { legalPathnames } from "@/i18n/routes";
import { configuredMeasurementId, disableGa4, loadGa4, trackPageView } from "@/lib/analytics/ga4";
import {
  CONSENT_COOKIE_NAME,
  browserCookieStore,
  consentChoice,
  parseConsent,
  persistConsent,
  readCookieValue,
  registerConsentOpener,
  unixSeconds,
  type ConsentRead,
} from "@/lib/consent/consent";

const SERVER_CONSENT_SNAPSHOT = "\0cs-server";
const CONSENT_CHANGE_EVENT = "cs-consent-change";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled])";

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

function consentSnapshot() {
  return document.cookie;
}

function serverConsentSnapshot() {
  return SERVER_CONSENT_SNAPSHOT;
}

function publishConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function consentFromSnapshot(snapshot: string): ConsentRead | null {
  if (snapshot === SERVER_CONSENT_SNAPSHOT) return null;
  return parseConsent(readCookieValue(snapshot, CONSENT_COOKIE_NAME), unixSeconds());
}

export function ConsentManager() {
  const t = useTranslations("Consent");
  const pathname = usePathname();
  const titleId = useId();
  const dialogTitleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const snapshot = useSyncExternalStore(subscribeConsent, consentSnapshot, serverConsentSnapshot);
  const consent = consentFromSnapshot(snapshot);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const showBanner = consent !== null && !dialogOpen && consent.state !== "current";

  function openDialog() {
    const current = consentFromSnapshot(document.cookie);
    setAnalyticsChoice(current?.state === "current" ? current.choice.analytics : false);
    setBlocked(false);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function store(analytics: boolean) {
    const secure = window.location.protocol === "https:";
    const result = persistConsent(browserCookieStore(), consentChoice(analytics), secure);
    if (result === "blocked") {
      setBlocked(true);
      setDialogOpen(false);
      return;
    }
    setBlocked(false);
    setAnalyticsChoice(analytics);
    setDialogOpen(false);
    publishConsentChange();
  }

  useEffect(
    () =>
      registerConsentOpener(() => {
        const current = consentFromSnapshot(document.cookie);
        setAnalyticsChoice(current?.state === "current" ? current.choice.analytics : false);
        setBlocked(false);
        setDialogOpen(true);
      }),
    [],
  );

  useEffect(() => {
    const current = consentFromSnapshot(snapshot);
    if (!current) return;
    const measurementId = configuredMeasurementId();
    if (current.state === "current" && current.choice.analytics) {
      if (measurementId) loadGa4(measurementId);
      trackPageView(measurementId, pathname);
      return;
    }
    disableGa4(measurementId);
  }, [snapshot, pathname]);

  useEffect(() => {
    if (!dialogOpen) return;
    const root = dialogRef.current;
    if (!root) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const items = () => [...root.querySelectorAll<HTMLElement>(focusableSelector)];
    items()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setDialogOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [dialogOpen]);

  if (!consent) return null;

  const actionClass =
    "inline-flex min-h-11 w-full items-center justify-center px-4 text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

  return (
    <>
      {showBanner ? (
        <div
          role="region"
          aria-labelledby={titleId}
          data-consent="banner"
          className="border-b border-line-on-dark bg-midnight px-4 py-3 text-ivory"
        >
          <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id={titleId} className="font-sans text-sm font-semibold">
              {t("title")}
            </h2>
            <Link
              href={legalPathnames.cookies}
              className="shrink-0 text-sm underline decoration-brand-gold underline-offset-4 hover:text-brand-gold sm:hidden"
            >
              {t("policy")}
            </Link>
          </div>
          <p className="mt-1 text-sm leading-snug text-text-muted-on-dark">{t("body")}</p>
          </div>
          {blocked ? (
            <p role="alert" data-consent-blocked="true" className="mt-2 text-sm text-ivory">
              {t("blocked")}
            </p>
          ) : null}
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:w-80">
            <button type="button" className={`${actionClass} bg-brand-red text-white hover:bg-brand-red-hover`} onClick={() => store(true)}>
              {t("accept")}
            </button>
            <button
              type="button"
              className={`${actionClass} border border-ivory text-ivory hover:bg-ivory/10`}
              onClick={() => store(false)}
            >
              {t("reject")}
            </button>
            <button
              type="button"
              className={`${actionClass} col-span-2 text-ivory underline decoration-brand-gold underline-offset-4 hover:text-brand-gold`}
              onClick={openDialog}
            >
              {t("customize")}
            </button>
          </div>
          </div>
        </div>
      ) : null}

      {dialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-midnight/60 p-4 sm:items-center"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            data-consent="dialog"
            className="max-h-[min(32rem,calc(100vh-2rem))] w-full max-w-lg overflow-auto border border-line-on-light bg-ivory p-5 text-midnight shadow-card"
          >
            <h2 id={dialogTitleId} className="font-sans text-lg font-semibold">
              {t("dialogLabel")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted-on-light">{t("necessary")}</p>
            <label className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-brand-red"
                checked={analyticsChoice}
                onChange={(event) => setAnalyticsChoice(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold">{t("analytics")}</span>
                <span className="mt-1 block text-sm leading-relaxed text-text-muted-on-light">{t("analyticsHelp")}</span>
              </span>
            </label>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className={`${actionClass} bg-brand-red text-white hover:bg-brand-red-hover sm:flex-1`}
                onClick={() => store(analyticsChoice)}
              >
                {t("save")}
              </button>
              <button
                type="button"
                className={`${actionClass} border border-midnight text-midnight hover:bg-midnight/5 sm:flex-1`}
                onClick={() => store(false)}
              >
                {t("reject")}
              </button>
            </div>
            <button
              type="button"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline decoration-brand-gold underline-offset-4"
              onClick={closeDialog}
            >
              {t("close")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
