# Phase 02 — Multilingual foundation

## Status

COMPLETE. This phase adds locale routing, shared page shells, translation dictionaries, and SEO URL infrastructure. It does not apply the final visual design, gallery, contact form, or commercial copy.

Phase 01 files and the uncommitted `docs/FOUNDATION_STATUS.md` were preserved. No commit, remote, or deployment was created.

## Architecture

`next-intl` 4.14.9 provides the App Router integration for Next.js 16.4.0. Public URLs are localized. Each commercial page has one React implementation under an internal pathname. `src/proxy.ts` rewrites or redirects the public URL onto that internal pathname.

Italian is the default locale. Every public URL keeps a locale prefix (`localePrefix: "always"`). Browser language detection and the locale cookie are off (`localeDetection: false`, `localeCookie: false`), so the URL is the only locale source. Changing the default locale later means changing `defaultLocale` in `src/i18n/routes.ts` and the `x-default` target; the route registry does not need a new shape.

```text
src/
  proxy.ts
  i18n/
    routes.ts          route ids and localized pathname registry
    routing.ts         next-intl routing config
    navigation.ts      Link, getPathname, and related helpers
    request.ts         server-side message loading
    labels.ts
    metadata.ts        canonical URLs, hreflang, titles
    site.ts            canonical origin
  messages/
    it.json            source editorial language
    de.json
    fr.json
    en.json
  components/
    commercial-page.tsx
    site-shell.tsx
    site-header.tsx
    site-footer.tsx
    language-switcher.tsx
  app/
    globals.css
    sitemap.ts
    global-not-found.tsx
    [locale]/
      layout.tsx
      page.tsx
      not-found.tsx
      [...rest]/page.tsx
      events/page.tsx
      games/page.tsx
      gallery/page.tsx
      about/page.tsx
      contact/page.tsx
      quote/page.tsx
scripts/
  verify-routes.mjs
```

Internal route ids are `home`, `events`, `games`, `gallery`, `about`, `contact`, and `quote`. Components link with those ids. They do not assemble translated slugs.

## Dependency changes

Added `next-intl@4.14.9`. Its peer range includes `next@^16`. No other packages were added. `npm audit fix` was not run. Existing Next.js, React, TypeScript, Tailwind CSS, and ESLint versions were left as installed in Phase 01.

## Locale strategy

| Locale | Role |
| --- | --- |
| `it` | Default and source editorial language |
| `de` | First-class locale. Swiss spelling avoids `ß`. |
| `fr` | First-class locale |
| `en` | First-class locale |

`html lang` is the active locale. Dictionaries load on the server from `src/i18n/request.ts` through `next/root-params`.

## Localized pathname registry

| Route id | Internal path | Italian | German | French | English |
| --- | --- | --- | --- | --- | --- |
| home | `/` | `/it` | `/de` | `/fr` | `/en` |
| events | `/events` | `/it/eventi` | `/de/events` | `/fr/evenements` | `/en/events` |
| games | `/games` | `/it/giochi-servizi` | `/de/spiele-services` | `/fr/jeux-services` | `/en/games-services` |
| gallery | `/gallery` | `/it/gallery` | `/de/galerie` | `/fr/galerie` | `/en/gallery` |
| about | `/about` | `/it/chi-siamo` | `/de/ueber-uns` | `/fr/a-propos` | `/en/about-us` |
| contact | `/contact` | `/it/contatti` | `/de/kontakt` | `/fr/contact` | `/en/contact` |
| quote | `/quote` | `/it/preventivo` | `/de/angebot-anfordern` | `/fr/demander-un-devis` | `/en/request-a-quote` |

The production build lists the internal paths (`/it/events`, `/fr/about`, and so on). Those are not the public URLs. The proxy redirects a non-canonical internal or foreign slug to the localized path, so the same page is not served at two public addresses.

## 28 URL inventory

All 28 combinations above return HTTP 200, the matching `html lang`, the matching heading and placeholder description, and `data-route` equal to the route id.

## Translation dictionaries

Italian is the source file. German, French, and English carry the same keys: shell labels, navigation, language endonyms, page heading, short placeholder description, and localized not-found copy.

Placeholder text says the page is in preparation. It does not state history, clients, guarantees, a legal entity, an address, a phone number, or an email address. The contact and quote descriptions say those interactions are not available yet.

## Navigation and language switcher

The header contains the text logo `CASINOSHOW`, primary navigation (Home, Events, Games & Services, Gallery, About, Contact), a separate quote link, and the language switcher. The footer repeats all seven destinations and a legal placeholder.

The switcher renders `IT`, `DE`, `FR`, and `EN`. Each control has the language endonym as its accessible name, `hrefLang`, and `lang`. The active language uses `aria-current="true"`. The link target is the current route id passed through `next-intl` `Link` with a `locale` prop. It is not a string replacement on the URL. On an unknown path there is no commercial page to preserve, so the localized not-found page links back to that locale's home page.

## Root and invalid routes

| Request | Result |
| --- | --- |
| `/` | 307 to `/it`, including when `Accept-Language` prefers German |
| `/events` | 307 to `/it/eventi` |
| `/it/events` | 307 to `/it/eventi` |
| `/fr/about-us` | 307 to `/fr/a-propos` |
| `/es`, `/es/eventi` | 404, global not-found page, URL unchanged |
| `/it/non-esiste` | 404, Italian not-found inside the locale shell |
| `/de/unbekannt` | 404, German not-found inside the locale shell |

`/` does not return a second homepage document. Unsupported locale prefixes are rewritten to an unmatched internal path and answered with 404 rather than redirected onto an Italian URL.

`globalNotFound` is enabled because the root layout is the dynamic `[locale]` segment. The installed Next.js docs describe that flag as experimental. The build prints that caution.

## SEO groundwork

Checked on 2026-10-10 against the live site:

- `https://casinoshow.ch/` returns 200 and its canonical is `https://casinoshow.ch/`
- `https://www.casinoshow.ch/` returns 301 to `https://casinoshow.ch/`
- `http://casinoshow.ch/` returns 301 to `https://casinoshow.ch/`

The preferred host is the apex, not `www`. Absolute canonical and hreflang URLs use `https://casinoshow.ch`, defined only in `src/i18n/site.ts`. Middleware alternate `Link` headers are disabled so they cannot advertise the request host and conflict with that origin.

Each commercial page sets:

- a localized title and placeholder description
- `rel="canonical"` for the active locale
- reciprocal `hreflang` for `it`, `de`, `fr`, and `en`
- `x-default` pointing at the Italian URL of the same page

`src/app/sitemap.ts` emits 28 absolute URLs. Each entry repeats the four language alternates and `x-default`. It does not include the internal Italian events path `/it/events`, `www`, `lastmod`, `changefreq`, or `priority`.

Not-found responses are `noindex`. No schema.org data was added.

## Remaining SEO work

This is not the final SEO phase. Still open:

- final titles, descriptions, and on-page copy
- keyword research
- Open Graph and social images
- legal pages and their hreflang entries
- whether the root 307 should later become a permanent redirect
- indexing policy for placeholder pages before launch
- structured data, only after real organization details exist

## Tests performed

| Check | Command or method | Result |
| --- | --- | --- |
| ESLint | `npm run lint` | Pass, exit 0 |
| TypeScript | `npx tsc --noEmit` | Pass, exit 0 |
| Production build | `npm run build` | Pass, exit 0. 32 static pages. Proxy registered. |
| Route contract | `npm run verify:routes` against `next start` on port 3457 | Pass. 28 URLs, root redirect, 404s, sitemap. |
| Browser | Production server in the Cursor browser | See below. |

Browser checks on `http://127.0.0.1:3457`:

- `/` landed on `/it` with Italian copy and `lang` implied by the Italian shell
- the language control on Home navigated from `/it` to `/de` and rendered `Startseite`
- `/de/events` rendered the German events page; switcher targets were `/it/eventi`, `/fr/evenements`, and `/en/events`
- direct load of `/fr/evenements` rendered `Événements` with French navigation
- `/es` stayed on `/es` and rendered the 404 page, not a commercial page
- at a 390px-wide viewport, `/fr/evenements` had no horizontal overflow (`scrollWidth` 390). Navigation stacked, the quote link remained visible, and French was marked active

No hydration error was observed. Client navigation from Italian Home to German Home completed and rendered the translated shell.

## Known warnings

Unchanged environment warnings:

- npm `Unknown env config "devdir"`
- `eslint@9.39.5` deprecation notice from the starter resolution
- 5 high severity audit findings. `npm audit fix --force` was not run
- `allow-scripts` warnings for `unrs-resolver`, `@parcel/watcher`, and `@swc/core`. Scripts were not approved
- npm reports 12.2.0 as a newer major release. npm was not upgraded

Project warnings:

- the production build enables experimental `globalNotFound`
- the build route table shows internal pathnames; public URLs are the localized ones verified above
- the root redirect is a 307, which is next-intl's redirect for a missing locale prefix

## Next phase

Recommended Phase 03: the Swiss premium visual foundation for these seven pages, using the approved palette and this route registry. Do not treat that as authorization for the contact form, gallery production, invented company details, or final SEO copy.

Do not start Phase 03 until it is explicitly authorized.
