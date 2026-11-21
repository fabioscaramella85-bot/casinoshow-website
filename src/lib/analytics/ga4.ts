import { CONSENT_COOKIE_NAME, parseConsent, readCookieValue, unixSeconds, type ConsentRead } from "../consent/consent";

export const GA_EVENT_LEAD = "generate_lead";
export const GA_EVENT_APPLICATION = "job_application_submit";

const MEASUREMENT_ID = /^G-[A-Z0-9]+$/;
const SCRIPT_ID = "cs-ga4";
const ALLOWED_EVENTS = new Set<string>([GA_EVENT_LEAD, GA_EVENT_APPLICATION]);

type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
};

function setCollectionDisabled(view: AnalyticsWindow, measurementId: string, disabled: boolean) {
  (view as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
}

let loadedId: string | null = null;
let lastPagePath: string | null = null;

/** GA4 measurement IDs only. A GTM container ID is rejected. */
export function validMeasurementId(value: string | undefined | null): string | null {
  const trimmed = value?.trim() ?? "";
  return MEASUREMENT_ID.test(trimmed) ? trimmed : null;
}

export function configuredMeasurementId(): string | null {
  return validMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

export function shouldLoadGa4(consent: ConsentRead, measurementId: string | null): boolean {
  return consent.state === "current" && consent.choice.analytics && measurementId !== null;
}

export function publicPagePath(path: string): string {
  const withoutHash = path.split("#")[0] ?? "";
  const withoutQuery = withoutHash.split("?")[0] ?? "";
  if (!withoutQuery.startsWith("/")) return "/";
  return withoutQuery;
}

export function pageViewCall(
  path: string,
  measurementId: string | null,
  consent: ConsentRead,
  previousPath: string | null,
): { path: string; params: { page_path: string; send_to: string } } | "duplicate" | null {
  if (!shouldLoadGa4(consent, measurementId) || !measurementId) return null;
  const clean = publicPagePath(path);
  if (previousPath === clean) return "duplicate";
  return {
    path: clean,
    params: { page_path: clean, send_to: measurementId },
  };
}

export function allowedEventCall(
  name: string,
  measurementId: string | null,
  consent: ConsentRead,
): { event: string; params: { send_to: string } } | null {
  if (!ALLOWED_EVENTS.has(name) || !shouldLoadGa4(consent, measurementId) || !measurementId) return null;
  return { event: name, params: { send_to: measurementId } };
}

export function ga4ScriptUrl(measurementId: string): string | null {
  if (!validMeasurementId(measurementId)) return null;
  return `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
}

/** Host-only clear, plus the registrable domain GA4 uses on casinoshow.ch. */
export function analyticsCookieResetDirectives(hostname: string): string[] {
  const host = hostname.trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  const base = "Path=/; Max-Age=0; SameSite=Lax";
  if (host === "casinoshow.ch" || host.endsWith(".casinoshow.ch")) {
    return [base, `${base}; Domain=casinoshow.ch`];
  }
  return [base];
}

function analyticsWindow(): AnalyticsWindow | null {
  if (typeof window === "undefined") return null;
  return window as AnalyticsWindow;
}

function currentConsent(): ConsentRead {
  if (typeof document === "undefined") return { state: "missing" };
  return parseConsent(readCookieValue(document.cookie, CONSENT_COOKIE_NAME), unixSeconds());
}

export function loadGa4(measurementId: string): void {
  try {
    const id = validMeasurementId(measurementId);
    const view = analyticsWindow();
    if (!id || !view || !shouldLoadGa4(currentConsent(), id)) return;

    setCollectionDisabled(view, id, false);
    view.dataLayer = view.dataLayer ?? [];
    if (!view.gtag) {
      view.gtag = function gtag(...args: unknown[]) {
        view.dataLayer?.push(args);
      };
    }
    if (loadedId === id) return;

    view.gtag("js", new Date());
    view.gtag("config", id, { send_page_view: false });
    loadedId = id;
    lastPagePath = null;

    if (document.getElementById(SCRIPT_ID)) return;
    const src = ga4ScriptUrl(id);
    if (!src) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  } catch {
    loadedId = null;
  }
}

export function disableGa4(measurementId: string | null): void {
  try {
    const id = validMeasurementId(measurementId);
    const view = analyticsWindow();
    if (!id || !view) return;
    setCollectionDisabled(view, id, true);
    lastPagePath = null;
    expireAnalyticsCookies();
  } catch {
    lastPagePath = null;
  }
}

export function trackPageView(measurementId: string | null, path: string): void {
  try {
    const call = pageViewCall(path, validMeasurementId(measurementId), currentConsent(), lastPagePath);
    if (call === "duplicate" || !call) return;
    const view = analyticsWindow();
    if (!view?.gtag) return;
    lastPagePath = call.path;
    view.gtag("event", "page_view", call.params);
  } catch {
    // Page views must not affect navigation.
  }
}

export function trackAllowedEvent(name: typeof GA_EVENT_LEAD | typeof GA_EVENT_APPLICATION): void {
  try {
    const call = allowedEventCall(name, configuredMeasurementId(), currentConsent());
    if (!call) return;
    const view = analyticsWindow();
    if (!view?.gtag) return;
    view.gtag("event", call.event, call.params);
  } catch {
    // A failed analytics call must not change the form result.
  }
}

function expireAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((part) => part.slice(0, part.indexOf("=")).trim())
    .filter((name) => name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"));
  const directives = analyticsCookieResetDirectives(window.location.hostname);
  for (const name of names) {
    for (const directive of directives) {
      document.cookie = `${name}=; ${directive}`;
    }
  }
}
