import assert from "node:assert/strict";
import fs from "node:fs";
import {
  GA_EVENT_APPLICATION,
  GA_EVENT_LEAD,
  allowedEventCall,
  analyticsCookieResetDirectives,
  ga4ScriptUrl,
  loadGa4,
  pageViewCall,
  publicPagePath,
  shouldLoadGa4,
  trackPageView,
  validMeasurementId,
} from "../src/lib/analytics/ga4.ts";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
  consentChoice,
  consentCookieHeader,
  parseConsent,
  persistConsent,
  readCookieValue,
  registerConsentOpener,
  requestConsentPreferences,
  serializeConsent,
  type CookieStore,
} from "../src/lib/consent/consent.ts";
import { responseRobotsTag } from "../src/lib/seo/deployment-host.ts";

const now = 1_800_000_000;
const locales = ["it", "de", "fr", "en"] as const;

function memoryStore(initial = ""): CookieStore & { jar: string } {
  const state = { jar: initial };
  return {
    get jar() {
      return state.jar;
    },
    read: () => state.jar,
    write: (value) => {
      const name = value.split("=")[0];
      state.jar = `${name}=${value.split(";")[0].split("=").slice(1).join("=")}`;
    },
  };
}

function blockedStore(): CookieStore {
  return {
    read: () => "",
    write: () => undefined,
  };
}

const accepted = consentChoice(true, now);
const rejected = consentChoice(false, now);

assert.equal(serializeConsent(accepted), `v${CONSENT_VERSION}.a1.t${now}`);
assert.equal(serializeConsent(rejected), `v${CONSENT_VERSION}.a0.t${now}`);
assert.equal(serializeConsent(accepted).includes("@"), false);
assert.equal(serializeConsent(accepted).includes("email"), false);

assert.deepEqual(parseConsent(null, now), { state: "missing" });
assert.equal(parseConsent("not-a-cookie", now).state, "invalid");
assert.equal(parseConsent(`v${CONSENT_VERSION + 1}.a1.t${now}`, now).state, "invalid");
assert.equal(parseConsent(serializeConsent(accepted), now).state, "current");
assert.equal(parseConsent(serializeConsent(rejected), now).state, "current");
assert.equal(
  parseConsent(serializeConsent(consentChoice(true, now - CONSENT_MAX_AGE_SECONDS - 1)), now).state,
  "expired",
);
assert.equal(parseConsent(serializeConsent(consentChoice(true, now + 60 * 60 * 24 + 5)), now).state, "invalid");

const header = consentCookieHeader(accepted, true);
assert.match(header, new RegExp(`^${CONSENT_COOKIE_NAME}=`));
assert.match(header, /Path=\//);
assert.match(header, /SameSite=Lax/);
assert.match(header, /Secure/);
assert.match(header, new RegExp(`Max-Age=${CONSENT_MAX_AGE_SECONDS}`));
assert.equal(header.includes("HttpOnly"), false);
assert.equal(consentCookieHeader(rejected, false).includes("Secure"), false);

const store = memoryStore();
assert.equal(persistConsent(store, accepted, true), "stored");
assert.equal(readCookieValue(store.read(), CONSENT_COOKIE_NAME), serializeConsent(accepted));
assert.equal(persistConsent(store, rejected, true), "stored");
assert.equal(parseConsent(readCookieValue(store.read(), CONSENT_COOKIE_NAME), now).state, "current");
const revoked = parseConsent(readCookieValue(store.read(), CONSENT_COOKIE_NAME), now);
assert.equal(revoked.state === "current" && revoked.choice.analytics, false);
assert.equal(persistConsent(blockedStore(), accepted, true), "blocked");

let opened = 0;
const unregister = registerConsentOpener(() => {
  opened += 1;
});
requestConsentPreferences();
assert.equal(opened, 1);
unregister();
requestConsentPreferences();
const late = registerConsentOpener(() => {
  opened += 1;
});
assert.equal(opened, 2);
late();

assert.equal(validMeasurementId(undefined), null);
assert.equal(validMeasurementId(""), null);
assert.equal(validMeasurementId("GTM-ABC123"), null);
assert.equal(validMeasurementId("UA-123456"), null);
assert.equal(validMeasurementId("G-abc123"), null);
assert.equal(validMeasurementId(" G-ABC123 "), "G-ABC123");

const granted = parseConsent(serializeConsent(accepted), now);
const denied = parseConsent(serializeConsent(rejected), now);
assert.equal(shouldLoadGa4(granted, null), false);
assert.equal(shouldLoadGa4(denied, "G-ABC123"), false);
assert.equal(shouldLoadGa4({ state: "missing" }, "G-ABC123"), false);
assert.equal(shouldLoadGa4({ state: "expired", choice: accepted }, "G-ABC123"), false);
assert.equal(shouldLoadGa4(granted, "G-ABC123"), true);
assert.equal(ga4ScriptUrl("GTM-ABC123"), null);
assert.equal(ga4ScriptUrl("G-ABC123"), "https://www.googletagmanager.com/gtag/js?id=G-ABC123");
assert.deepEqual(analyticsCookieResetDirectives("casinoshow.ch"), [
  "Path=/; Max-Age=0; SameSite=Lax",
  "Path=/; Max-Age=0; SameSite=Lax; Domain=casinoshow.ch",
]);
assert.deepEqual(analyticsCookieResetDirectives("www.casinoshow.ch"), [
  "Path=/; Max-Age=0; SameSite=Lax",
  "Path=/; Max-Age=0; SameSite=Lax; Domain=casinoshow.ch",
]);
assert.deepEqual(analyticsCookieResetDirectives("localhost"), ["Path=/; Max-Age=0; SameSite=Lax"]);
assert.equal(
  analyticsCookieResetDirectives("casinoshow-website.vercel.app").some((directive) => directive.includes("Domain=")),
  false,
);

assert.equal(publicPagePath("/it/preventivo?email=ada@example.test"), "/it/preventivo");
assert.equal(pageViewCall("/it?x=1", null, granted, null), null);
assert.equal(pageViewCall("/it", "G-ABC123", denied, null), null);
const firstView = pageViewCall("/de/events", "G-ABC123", granted, null);
assert.equal(firstView !== null && firstView !== "duplicate" && firstView.path, "/de/events");
assert.equal(pageViewCall("/de/events", "G-ABC123", granted, "/de/events"), "duplicate");

assert.equal(allowedEventCall(GA_EVENT_LEAD, null, granted), null);
assert.equal(allowedEventCall(GA_EVENT_LEAD, "G-ABC123", denied), null);
assert.equal(allowedEventCall("purchase", "G-ABC123", granted), null);
const lead = allowedEventCall(GA_EVENT_LEAD, "G-ABC123", granted);
const application = allowedEventCall(GA_EVENT_APPLICATION, "G-ABC123", granted);
assert.deepEqual(lead, { event: "generate_lead", params: { send_to: "G-ABC123" } });
assert.deepEqual(application, { event: "job_application_submit", params: { send_to: "G-ABC123" } });
assert.deepEqual(Object.keys(lead?.params ?? {}), ["send_to"]);

const analyticsSource = fs.readFileSync("src/lib/analytics/ga4.ts", "utf8");
assert.equal(analyticsSource.includes("GTM-"), false);
assert.equal(/facebook|fbq|fbevents|hotjar|clarity|meta pixel/i.test(analyticsSource), false);
assert.equal(analyticsSource.includes("googletagmanager.com/gtag/js"), true);
assert.equal(analyticsSource.includes("send_page_view: false"), true);
assert.match(analyticsSource, /function gtag\(\) \{[\s\S]*?view\.dataLayer\?\.push\(arguments\);/);
assert.equal(/function gtag\(\.\.\.args/.test(analyticsSource), false);
assert.equal(analyticsSource.includes(".push(args)"), false);

const queued: unknown[] = [];
const browser = {
  dataLayer: queued,
  location: { hostname: "127.0.0.1" },
  gtag: undefined as ((...args: unknown[]) => void) | undefined,
};
const documentStub = {
  cookie: `cs_consent=v${CONSENT_VERSION}.a0.t${Math.floor(Date.now() / 1000)}`,
  getElementById: () => null,
  createElement: () => ({ id: "", async: false, src: "" }),
  head: { appendChild: () => undefined },
};
Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
Object.defineProperty(globalThis, "document", { configurable: true, value: documentStub });
loadGa4("G-ABC123");
assert.equal(queued.length, 0);
documentStub.cookie = `cs_consent=v${CONSENT_VERSION}.a1.t${Math.floor(Date.now() / 1000)}`;
loadGa4("G-ABC123");
trackPageView("G-ABC123", "/it");
trackPageView("G-ABC123", "/it?email=ada@example.test");
trackPageView("G-ABC123", "/de");
const commands = queued.filter(
  (item): item is IArguments => Object.prototype.toString.call(item) === "[object Arguments]",
);
assert.equal(commands.length, queued.length);
assert.equal(commands.length, 4);
for (const command of commands) {
  assert.equal(Array.isArray(command), false);
  assert.equal(Object.prototype.hasOwnProperty.call(command, "callee"), true);
}
assert.equal(commands[1][0], "config");
assert.equal(commands[1][1], "G-ABC123");
assert.equal(commands[1][2].send_page_view, false);
assert.deepEqual(
  commands.slice(2).map((command) => command[2].page_path),
  ["/it", "/de"],
);

const quoteSource = fs.readFileSync("src/components/quote/quote-wizard.tsx", "utf8");
const careersSource = fs.readFileSync("src/components/careers/careers-form.tsx", "utf8");
assert.match(quoteSource, /response\.status === "sent"\) \{\s*trackAllowedEvent\("generate_lead"\);/);
assert.match(careersSource, /result\.status === "sent"\) \{\s*trackAllowedEvent\("job_application_submit"\);/);
assert.equal(quoteSource.includes("trackAllowedEvent(\"generate_lead\","), false);
assert.equal(careersSource.includes("trackAllowedEvent(\"job_application_submit\","), false);

assert.equal(responseRobotsTag(false, "casinoshow.ch"), null);
assert.equal(responseRobotsTag(false, "www.casinoshow.ch"), null);
assert.equal(responseRobotsTag(false, "casinoshow.ch:443"), null);
assert.equal(responseRobotsTag(false, "casinoshow-website.vercel.app"), "noindex, nofollow");
assert.equal(responseRobotsTag(false, "casinoshow-website-qridvd01h-tlc19.vercel.app"), "noindex, nofollow");
assert.equal(responseRobotsTag(false, "localhost:3481"), null);
assert.equal(responseRobotsTag(true, "casinoshow.ch"), "noindex, nofollow");
assert.equal(responseRobotsTag(true, "casinoshow-website.vercel.app"), "noindex, nofollow");

const consentGate = {
  it: "sono presenti insieme",
  de: "zusammen vorliegen",
  fr: "sont réunis",
  en: "are both present",
} as const;
const formatVersion = {
  it: "versione tecnica del formato",
  de: "technische Versionsnummer des Formats",
  fr: "version technique du format",
  en: "technical version number of the choice format",
} as const;
const oldHostingGap = {
  it: "non sono descritti in questa pagina",
  de: "sind auf dieser Seite nicht beschrieben",
  fr: "ne sont pas décrits sur cette page",
  en: "are not described on this page",
} as const;

for (const locale of locales) {
  const messages = JSON.parse(fs.readFileSync(`src/messages/${locale}.json`, "utf8"));
  const cookies = JSON.stringify(messages.Legal.public.cookies);
  const privacy = JSON.stringify(messages.Legal.public.privacy);
  assert.equal(cookies.includes("cs_consent"), true, locale);
  assert.equal(cookies.includes("Google Analytics 4"), true, locale);
  assert.equal(cookies.includes("SameSite=Lax"), true, locale);
  assert.equal(cookies.includes(consentGate[locale]), true, locale);
  assert.equal(privacy.includes(consentGate[locale]), true, locale);
  assert.equal(cookies.includes(formatVersion[locale]), true, locale);
  assert.equal(cookies.includes("googletagmanager.com") || privacy.includes("googletagmanager.com"), true, locale);
  assert.equal(privacy.includes("googletagmanager.com"), true, locale);
  assert.equal(cookies.includes(oldHostingGap[locale]), false, locale);
  assert.equal(cookies.includes("Vercel"), true, locale);
  assert.equal(/non mostra un banner|kein Einwilligungsbanner|n'affiche pas de bandeau|does not show a consent banner/.test(cookies), false, locale);
  assert.equal(privacy.includes("cs_consent"), true, locale);
  assert.equal(messages.Consent.accept.length > 0, true, locale);
  assert.equal(messages.Consent.reject.length > 0, true, locale);
  assert.equal(messages.Consent.customize.length > 0, true, locale);
  assert.equal(messages.Footer.cookiePreferences.length > 0, true, locale);
}
assert.equal(JSON.stringify(JSON.parse(fs.readFileSync("src/messages/de.json", "utf8")).Legal.public).includes("ß"), false);
assert.equal(fs.readFileSync("src/messages/de.json", "utf8").includes("ß"), false);

const retention = JSON.parse(fs.readFileSync("src/messages/it.json", "utf8")).Legal.public.privacy;
const retentionText = JSON.stringify(retention.sections.find((section: { title: string }) => section.title === "Conservazione"));
assert.match(retentionText, /dodici mesi/);
assert.match(retentionText, /sei mesi dopo la conclusione della selezione/);

console.log("verify:consent ok");
