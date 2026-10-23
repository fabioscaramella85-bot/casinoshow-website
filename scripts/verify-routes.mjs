const origin = process.env.VERIFY_ORIGIN ?? "http://127.0.0.1:3457";
const canonicalOrigin = "https://casinoshow.ch";

const pages = [
  {
    id: "home",
    paths: { it: "/it", de: "/de", fr: "/fr", en: "/en" },
    headings: {
      it: "Sempre un evento vincente",
      de: "Immer ein gelungenes Event",
      fr: "Toujours un événement réussi",
      en: "Always a winning event",
    },
    descriptions: {
      it: "Casino Show porta l'intrattenimento a tema casinò negli eventi in Svizzera, con un'atmosfera curata e adattata all'occasione.",
      de: "Casino Show bringt Casino-Unterhaltung zu Anlässen in der Schweiz, mit einer gepflegten und auf den Anlass abgestimmten Atmosphäre.",
      fr: "Casino Show apporte une animation de casino aux événements en Suisse, avec une atmosphère soignée et adaptée à l'occasion.",
      en: "Casino Show brings casino-themed entertainment to events in Switzerland, with an atmosphere shaped around the occasion.",
    },
  },
  {
    id: "events",
    paths: {
      it: "/it/eventi",
      de: "/de/events",
      fr: "/fr/evenements",
      en: "/en/events",
    },
    headings: {
      it: "Un'esperienza unica per ogni evento",
      de: "Ein eigenes Erlebnis für jeden Anlass",
      fr: "Une expérience propre à chaque événement",
      en: "A distinct experience for every event",
    },
    descriptions: {
      it: "Casino Show propone intrattenimento a tema casinò per eventi aziendali, team building, matrimoni e feste private in Svizzera.",
      de: "Casino Show bietet Casino-Unterhaltung für Firmenanlässe, Team-Building, Hochzeiten und private Feste in der Schweiz.",
      fr: "Casino Show propose une animation de casino pour les événements d'entreprise, le team building, les mariages et les fêtes privées en Suisse.",
      en: "Casino Show offers casino-themed entertainment for corporate events, team building, weddings and private celebrations in Switzerland.",
    },
  },
  {
    id: "games",
    paths: {
      it: "/it/giochi-servizi",
      de: "/de/spiele-services",
      fr: "/fr/jeux-services",
      en: "/en/games-services",
    },
    headings: {
      it: "I giochi che accendono il tuo evento",
      de: "Die Spiele, die Ihren Anlass beleben",
      fr: "Les jeux qui animent votre événement",
      en: "The games that light up your event",
    },
    descriptions: {
      it: "Intrattenimento a tema casinò per eventi in Svizzera: roulette, blackjack, poker e servizi complementari, da confermare nella proposta.",
      de: "Casino-Unterhaltung für Anlässe in der Schweiz: Roulette, Blackjack, Poker und ergänzende Services, bestätigt im Vorschlag.",
      fr: "Animation de casino pour des événements en Suisse : roulette, blackjack, poker et services complémentaires, confirmés dans la proposition.",
      en: "Casino-themed entertainment for events in Switzerland: roulette, blackjack, poker and complementary services, confirmed in the proposal.",
    },
  },
  {
    id: "gallery",
    paths: {
      it: "/it/gallery",
      de: "/de/galerie",
      fr: "/fr/galerie",
      en: "/en/gallery",
    },
    headings: {
      it: "La nostra casino experience in immagini",
      de: "Unser Casino-Erlebnis in Bildern",
      fr: "Notre expérience casino en images",
      en: "Our casino experience in pictures",
    },
    descriptions: {
      it: "La galleria di Casino Show pubblicherà le fotografie approvate degli eventi a tema casinò in Svizzera. Per ora non ce ne sono.",
      de: "Die Galerie von Casino Show veröffentlicht freigegebene Fotografien von Casino-Anlässen in der Schweiz. Derzeit ist noch keine Fotografie freigegeben.",
      fr: "La galerie de Casino Show publiera les photographies approuvées des événements à thème casino en Suisse. Pour le moment, aucune photographie approuvée n'y figure.",
      en: "The Casino Show gallery will publish approved photographs of casino-themed events in Switzerland. No approved photograph is published yet.",
    },
  },
  {
    id: "about",
    paths: {
      it: "/it/chi-siamo",
      de: "/de/ueber-uns",
      fr: "/fr/a-propos",
      en: "/en/about-us",
    },
    headings: {
      it: "Non solo giochi. Esperienze da vivere.",
      de: "Nicht nur Spiele. Erlebnisse zum Teilen.",
      fr: "Pas seulement des jeux. Des expériences à vivre.",
      en: "Not only games. Experiences to live.",
    },
    descriptions: {
      it: "Casino Show propone intrattenimento a tema casinò per eventi aziendali e privati in Svizzera. È un'esperienza in sala, non un gioco con denaro.",
      de: "Casino Show bietet Casino-Unterhaltung für Firmenanlässe und private Feste in der Schweiz. Es ist ein Erlebnis im Saal, kein Spiel um Geld.",
      fr: "Casino Show propose une animation de casino pour des événements d'entreprise et privés en Suisse. C'est une expérience en salle, pas un jeu d'argent.",
      en: "Casino Show offers casino-themed entertainment for corporate and private events in Switzerland. It is an experience in the room, not a game for money.",
    },
  },
  {
    id: "contact",
    paths: {
      it: "/it/contatti",
      de: "/de/kontakt",
      fr: "/fr/contact",
      en: "/en/contact",
    },
    headings: {
      it: "Parliamo del tuo prossimo evento",
      de: "Sprechen wir über Ihren nächsten Anlass",
      fr: "Parlons de votre prochain événement",
      en: "Let's talk about your next event",
    },
    descriptions: {
      it: "Per una domanda o un'idea su Casino Show, questa pagina indica il percorso. Il modulo di contatto non è ancora attivo.",
      de: "Für eine Frage oder eine Idee zu Casino Show zeigt diese Seite den Weg. Das Kontaktformular ist noch nicht aktiv.",
      fr: "Pour une question ou une idée sur Casino Show, cette page indique le chemin. Le formulaire de contact n'est pas encore actif.",
      en: "For a question or an idea about Casino Show, this page shows the way. The contact form is not active yet.",
    },
  },
  {
    id: "quote",
    paths: {
      it: "/it/preventivo",
      de: "/de/angebot-anfordern",
      fr: "/fr/demander-un-devis",
      en: "/en/request-a-quote",
    },
    headings: {
      it: "Raccontaci il tuo evento",
      de: "Erzählen Sie uns von Ihrem Anlass",
      fr: "Racontez-nous votre événement",
      en: "Tell us about your event",
    },
    descriptions: {
      it: "Prepara una richiesta di preventivo per un evento Casino Show. L'invio non è ancora attivo.",
      de: "Bereiten Sie eine Angebotsanfrage für einen Casino-Show-Anlass vor. Das Senden ist noch nicht aktiv.",
      fr: "Préparez une demande de devis pour un événement Casino Show. L'envoi n'est pas encore actif.",
      en: "Prepare a quote request for a Casino Show event. Sending is not active yet.",
    },
  },
];

const locales = ["it", "de", "fr", "en"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#X27;", "'")
    .replaceAll("&apos;", "'");
}

function pathnameOf(location) {
  if (!location) return "";
  const value = location.startsWith("http")
    ? new URL(location).pathname
    : location;
  return value.split("?")[0];
}

async function request(path, headers) {
  const response = await fetch(new URL(path, origin), {
    headers,
    redirect: "manual",
  });
  return {
    status: response.status,
    location: response.headers.get("location"),
    text: await response.text(),
  };
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match ? decode(match[1]) : "";
}

function switcherHrefs(html) {
  const match = html.match(
    /<nav[^>]*data-language-switcher="true"[^>]*>([\s\S]*?)<\/nav>/,
  );
  if (!match) return null;
  return [...match[1].matchAll(/<a\b([^>]*)>/g)].map((anchor) => ({
    href: attribute(anchor[1], "href"),
    current: attribute(anchor[1], "aria-current"),
  }));
}

function expectRedirect(path, location, result, label) {
  if (![301, 302, 307, 308].includes(result.status)) {
    fail(`${label} ${path} expected redirect, received ${result.status}`);
    return;
  }
  const actual = pathnameOf(result.location);
  if (actual !== location) {
    fail(`${label} ${path} redirected to ${actual || "(none)"}, expected ${location}`);
  }
  if (result.text.includes('data-route="home"') && result.status === 200) {
    fail(`${label} ${path} returned indexable home content`);
  }
}

for (const page of pages) {
  for (const locale of locales) {
    const path = page.paths[locale];
    const result = await request(path);
    const label = `${page.id} ${locale} ${path}`;

    if (result.status !== 200) {
      fail(`${label} status ${result.status}`);
      continue;
    }

    const lang = result.text.match(/<html[^>]*lang="([^"]+)"/)?.[1];
    if (lang !== locale) fail(`${label} html lang ${lang}`);

    const heading = decode(
      result.text.match(/<h1[^>]*>([^<]*)<\/h1>/)?.[1] ?? "",
    );
    if (heading !== page.headings[locale]) {
      fail(`${label} heading "${heading}"`);
    }

    if (!result.text.includes(page.descriptions[locale])) {
      fail(`${label} missing description`);
    }

    const route = result.text.match(/data-route="([^"]+)"/)?.[1];
    if (route !== page.id) fail(`${label} data-route ${route}`);

    const canonical = result.text.match(
      /<link rel="canonical" href="([^"]+)"/,
    )?.[1];
    if (canonical !== `${canonicalOrigin}${path}`) {
      fail(`${label} canonical ${canonical}`);
    }

    for (const alternate of locales) {
      const expected = `${canonicalOrigin}${page.paths[alternate]}`;
      const pattern = new RegExp(
        `<link rel="alternate" hrefLang="${alternate}" href="${expected.replaceAll("/", "\\/")}"`,
      );
      if (!pattern.test(result.text)) {
        fail(`${label} missing hreflang ${alternate}`);
      }
    }

    const xDefault = `${canonicalOrigin}${page.paths.it}`;
    if (
      !result.text.includes(
        `<link rel="alternate" hrefLang="x-default" href="${xDefault}"`,
      )
    ) {
      fail(`${label} missing x-default`);
    }

    if (result.text.includes("www.casinoshow.ch")) {
      fail(`${label} contains www host`);
    }

    const links = switcherHrefs(result.text);
    if (!links) {
      fail(`${label} missing language switcher`);
      continue;
    }

    const hrefs = links.map((link) => link.href).sort();
    const expectedHrefs = locales.map((item) => page.paths[item]).sort();
    if (hrefs.join("|") !== expectedHrefs.join("|")) {
      fail(`${label} switcher hrefs ${hrefs.join(", ")}`);
    }

    const active = links.find((link) => link.current === "true");
    if (!active || active.href !== path) {
      fail(`${label} active language ${active?.href ?? "(none)"}`);
    }
  }
}

const rootDefault = await request("/");
expectRedirect("/", "/it", rootDefault, "root");

const rootGerman = await request("/", { "accept-language": "de,fr;q=0.8" });
expectRedirect("/", "/it", rootGerman, "root accept-language de");

const unknownLocale = await request("/es");
if (unknownLocale.status !== 404) {
  fail(`/es status ${unknownLocale.status}`);
}
if (unknownLocale.text.includes('data-route="home"')) {
  fail("/es rendered the home page");
}

const unknownNested = await request("/es/eventi");
if (unknownNested.status !== 404) {
  fail(`/es/eventi status ${unknownNested.status}`);
}

const italianUnknown = await request("/it/non-esiste");
if (italianUnknown.status !== 404) {
  fail(`/it/non-esiste status ${italianUnknown.status}`);
}
if (!italianUnknown.text.includes("Pagina non trovata")) {
  fail("/it/non-esiste did not render the Italian not-found page");
}
if (italianUnknown.text.includes('data-route="home"')) {
  fail("/it/non-esiste rendered home");
}

const germanUnknown = await request("/de/unbekannt");
if (germanUnknown.status !== 404) {
  fail(`/de/unbekannt status ${germanUnknown.status}`);
}
if (!germanUnknown.text.includes("Seite nicht gefunden")) {
  fail("/de/unbekannt did not render the German not-found page");
}

const internalItalian = await request("/it/events");
expectRedirect("/it/events", "/it/eventi", internalItalian, "internal path");

const unprefixedEvents = await request("/events");
expectRedirect("/events", "/it/eventi", unprefixedEvents, "unprefixed path");

const foreignSlug = await request("/fr/about-us");
expectRedirect("/fr/about-us", "/fr/a-propos", foreignSlug, "foreign slug");

const sitemap = await request("/sitemap.xml");
if (sitemap.status !== 200) fail(`sitemap status ${sitemap.status}`);
const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
if (locs.length !== 28) fail(`sitemap loc count ${locs.length}`);
for (const page of pages) {
  for (const locale of locales) {
    const url = `${canonicalOrigin}${page.paths[locale]}`;
    if (!locs.includes(url)) fail(`sitemap missing ${url}`);
  }
}
if (sitemap.text.includes("www.casinoshow.ch")) {
  fail("sitemap contains www host");
}
if (locs.includes(`${canonicalOrigin}/it/events`)) {
  fail("sitemap published the internal Italian events path");
}

const legalPages = [
  {
    id: "privacy",
    paths: {
      it: "/it/informativa-privacy",
      de: "/de/datenschutz",
      fr: "/fr/politique-de-confidentialite",
      en: "/en/privacy-policy",
    },
    titles: {
      it: "Informativa sulla privacy",
      de: "Datenschutzerklärung",
      fr: "Politique de confidentialité",
      en: "Privacy Policy",
    },
  },
  {
    id: "cookies",
    paths: {
      it: "/it/informativa-cookie",
      de: "/de/cookie-richtlinie",
      fr: "/fr/politique-cookies",
      en: "/en/cookie-policy",
    },
    titles: {
      it: "Informativa sui cookie",
      de: "Cookie-Richtlinie",
      fr: "Politique relative aux cookies",
      en: "Cookie Policy",
    },
  },
  {
    id: "legalNotice",
    paths: {
      it: "/it/note-legali",
      de: "/de/impressum",
      fr: "/fr/mentions-legales",
      en: "/en/legal-notice",
    },
    titles: {
      it: "Note legali",
      de: "Impressum",
      fr: "Mentions légales",
      en: "Legal Notice",
    },
  },
];

const legalMarkers = {
  it: "non è ancora disponibile",
  de: "noch nicht verfügbar",
  fr: "n'est pas encore disponible",
  en: "not yet available",
};

for (const page of legalPages) {
  for (const locale of locales) {
    const path = page.paths[locale];
    const result = await request(path);
    const label = `legal ${page.id} ${locale} ${path}`;
    if (result.status !== 200) {
      fail(`${label} status ${result.status}`);
      continue;
    }
    if (!/noindex/i.test(result.text)) fail(`${label} missing noindex`);
    if (!result.text.includes(legalMarkers[locale])) fail(`${label} missing preparation notice`);
    const heading = decode(result.text.match(/<h1[^>]*>([^<]*)<\/h1>/)?.[1] ?? "");
    if (heading !== page.titles[locale]) fail(`${label} heading "${heading}"`);
    const canonical = result.text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== `${canonicalOrigin}${path}`) fail(`${label} canonical ${canonical}`);
    if (locs.includes(`${canonicalOrigin}${path}`)) fail(`${label} is in the sitemap`);
    const route = result.text.match(/data-route="([^"]+)"/)?.[1];
    if (route !== page.id) fail(`${label} data-route ${route}`);
  }
}

const homeIt = await request("/it");
if (!homeIt.text.includes("logo-header.png")) fail("header logo missing");
if (!homeIt.text.includes("logo-footer.png")) fail("footer logo missing");
if (!homeIt.text.includes("loghi/favicon.png")) fail("favicon missing");
if (!homeIt.text.includes("https://www.linkedin.com/in/fabio-scaramella")) {
  fail("website credit link missing");
}
if (!homeIt.text.includes('rel="noopener noreferrer"')) fail("credit rel missing");
if (!homeIt.text.includes("© 2026 Casino Show")) fail("copyright missing");
if (!homeIt.text.includes('data-legal-publication="unpublished"')) {
  fail("legal links published before approval");
}
if (!homeIt.text.includes("mailto:info@casinoshow.ch")) fail("footer email missing");
if (!homeIt.text.includes("tel:+41765277178")) fail("footer phone missing");
for (const anchor of ["#corporate", "#team", "#weddings", "#private", "#roulette", "#blackjack", "#poker", "#other-games", "#extras"]) {
  if (!homeIt.text.includes(anchor)) fail(`footer missing ${anchor}`);
}
for (const page of legalPages) {
  if (homeIt.text.includes(page.paths.it)) fail(`home published ${page.paths.it}`);
}
const quoteIt = await request("/it/preventivo");
if (!quoteIt.text.includes("non vengono trasmessi")) {
  fail("quote submission notice missing");
}
const headerLogo = await request("/loghi/logo-header.png");
if (headerLogo.status !== 200) fail(`header logo asset ${headerLogo.status}`);
const footerLogo = await request("/loghi/logo-footer.png");
if (footerLogo.status !== 200) fail(`footer logo asset ${footerLogo.status}`);
const favicon = await request("/loghi/favicon.png");
if (favicon.status !== 200) fail(`favicon asset ${favicon.status}`);

if (failures.length > 0) {
  console.error(`Route verification failed (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Verified 28 commercial URLs, 12 unpublished legal URLs, root redirect, 404s, and sitemap against ${origin}`,
);
