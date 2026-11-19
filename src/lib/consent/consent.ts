export const CONSENT_COOKIE_NAME = "cs_consent";
/**
 * Technical format version stored in cs_consent. This is not the edition of the legal notice.
 * Increase it when a stored choice must be asked again, including after a substantial change
 * to the statistics consent. A cookie with any other number is invalid.
 */
export const CONSENT_VERSION = 1;
/** Six months, counted as 183 days. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 183;

const CONSENT_PATTERN = /^v(\d+)\.a([01])\.t(\d+)$/;
const FUTURE_SKEW_SECONDS = 60 * 60 * 24;

export type ConsentChoice = {
  version: number;
  analytics: boolean;
  timestamp: number;
};

export type ConsentRead =
  | { state: "missing" }
  | { state: "invalid" }
  | { state: "expired"; choice: ConsentChoice }
  | { state: "current"; choice: ConsentChoice };

export type CookieStore = {
  read(): string;
  write(value: string): void;
};

export function consentChoice(analytics: boolean, nowSeconds = unixSeconds()): ConsentChoice {
  return {
    version: CONSENT_VERSION,
    analytics,
    timestamp: nowSeconds,
  };
}

export function serializeConsent(choice: ConsentChoice): string {
  return `v${choice.version}.a${choice.analytics ? 1 : 0}.t${choice.timestamp}`;
}

export function parseConsent(raw: string | null | undefined, nowSeconds: number): ConsentRead {
  if (!raw) return { state: "missing" };
  const match = CONSENT_PATTERN.exec(raw);
  if (!match) return { state: "invalid" };

  const version = Number(match[1]);
  const timestamp = Number(match[3]);
  const choice: ConsentChoice = {
    version,
    analytics: match[2] === "1",
    timestamp,
  };

  if (!Number.isSafeInteger(version) || !Number.isSafeInteger(timestamp)) return { state: "invalid" };
  if (version !== CONSENT_VERSION) return { state: "invalid" };
  if (timestamp > nowSeconds + FUTURE_SKEW_SECONDS) return { state: "invalid" };
  if (nowSeconds - timestamp > CONSENT_MAX_AGE_SECONDS) return { state: "expired", choice };
  return { state: "current", choice };
}

export function readCookieValue(cookieString: string, name: string): string | null {
  for (const part of cookieString.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

export function consentCookieHeader(choice: ConsentChoice, secure: boolean): string {
  const value = encodeURIComponent(serializeConsent(choice));
  const secureAttribute = secure ? "; Secure" : "";
  return `${CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secureAttribute}`;
}

export function persistConsent(store: CookieStore, choice: ConsentChoice, secure: boolean): "stored" | "blocked" {
  store.write(consentCookieHeader(choice, secure));
  const parsed = parseConsent(readCookieValue(store.read(), CONSENT_COOKIE_NAME), choice.timestamp);
  if (
    parsed.state === "current" &&
    parsed.choice.analytics === choice.analytics &&
    parsed.choice.version === choice.version
  ) {
    return "stored";
  }
  return "blocked";
}

export function unixSeconds(date = new Date()): number {
  return Math.floor(date.getTime() / 1000);
}

export function browserCookieStore(): CookieStore {
  return {
    read: () => document.cookie,
    write: (value) => {
      document.cookie = value;
    },
  };
}

type ConsentOpener = () => void;

let consentOpener: ConsentOpener | null = null;
let pendingConsentOpen = false;

export function registerConsentOpener(opener: ConsentOpener): () => void {
  consentOpener = opener;
  if (pendingConsentOpen) {
    pendingConsentOpen = false;
    opener();
  }
  return () => {
    if (consentOpener === opener) consentOpener = null;
  };
}

export function requestConsentPreferences(): void {
  if (consentOpener) {
    consentOpener();
    return;
  }
  pendingConsentOpen = true;
}
