"use client";

import { requestConsentPreferences } from "@/lib/consent/consent";

export function ConsentPreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => requestConsentPreferences()}
      className="inline-flex min-h-11 items-center px-1 text-sm text-ivory underline decoration-brand-gold/70 underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-brand-gold"
    >
      {label}
    </button>
  );
}
