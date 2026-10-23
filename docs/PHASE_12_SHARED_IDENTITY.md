# Phase 12 — Shared identity, header, footer, and legal architecture

Phase 12 updates the shared shell only. The seven commercial pages, their copy, the gallery, and quote submission were left in place.

## Pre-flight

| Check | Result |
| --- | --- |
| Project directory | `C:\Progetti\casinoshow-website` |
| Backup | `D:\Backup\casinoshow-website-2026-10-12` exists. It was not copied again and was not overwritten. |
| Git checkpoint | `master` at `cca88e4e71dc39f58d85a1efd7b2b1a3cfcddbd5`, message `chore: checkpoint casino show foundation phases 01-10` |
| Working tree before edits | Clean |
| C: free space | About 14.5 GB before the production build |
| D: free space | About 1.8 TB |
| Pre-flight gate | Passed. No second checkpoint and no destructive cleanup. |

## Logo asset inventory

Approved files in `public/loghi/`. `non usare.png` was not used. No replacement artwork was generated.

| Role | File | Size | Dimensions | Transparency | Suitability |
| --- | --- | --- | --- | --- | --- |
| Header | `logo-header.png` | 404,698 bytes | 1600 × 437 (about 3.66:1) | RGBA. Corner pixels are fully transparent. Opaque artwork runs almost edge to edge. | Suitable horizontal mark on Midnight Black. Displayed at 161 × 44 px, a downscale of the source. |
| Footer | `logo-footer.png` | 569,595 bytes | 600 × 600 | RGBA. Corners are transparent. The circular artwork fills the square. | Suitable. Displayed at 88 px below 640 px and 104 px from 640 px up. Not cropped. |
| Favicon | `favicon.png` | 413,248 bytes | 512 × 512 | RGBA. Corners are transparent. | The official mark. The file is heavy for a favicon. It was not resampled. |

The Create Next App `src/app/favicon.ico` (15,086 bytes) was removed so the browser tab uses `/loghi/favicon.png` instead of the starter icon.

The textual `Wordmark` component is no longer used by the header, footer, or global 404. The file remains in the repository and is not a runtime fallback.

## Header

`BrandLogo` renders the header file with `next/image`, intrinsic dimensions 1600 × 437, `sizes="161px"`, and `preload` on the header instance only. CSS sets the height to 2.75 rem and the width to `auto`, so the ratio stays 1600:437. The image `alt` is the localized home-link name (`Shell.logoLabel`). The link goes to the localized homepage through the next-intl `Link`.

Desktop navigation still lists the six primary destinations plus the quote button. Labels were not rewritten. Link letter-spacing was returned to normal and horizontal padding was tightened slightly so German and French labels fit at 1280 px without a smaller font size. At 1280, 1440, and 1920 the six links sit on one row. Below 1280 the existing hamburger remains.

Measured header height at every tested width: 69 px. No horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, 1440, or 1920.

## Language dropdown

`LanguageSwitcher` is a client control. The closed button shows the active endonym (Italiano, Deutsch, Français, English) and exposes `aria-expanded`, `aria-haspopup="menu"`, and an accessible name such as `Lingua: Italiano`. The four `next-intl` links stay in the server HTML, inside a menu that is hidden until opened. Locale changes use the `locale` prop and `shellHref()`, which reads the existing pathname map. Paths are not concatenated by hand.

Desktop, from 1280 px: one compact control in the header, before the quote button. Below 1280 that control is hidden and the same component sits at the top of the mobile panel, under the localized word for “language”.

Headless Chrome checks on the German events page at 1440 px:

- The menu opened and listed all four language names.
- Escape closed it and returned `aria-expanded` to false.
- A pointer press outside the control closed it.
- Arrow Down opened it and moved focus to the active language.

On a 320 px Italian homepage the menu opened inside the mobile panel, stayed inside the viewport, and did not create horizontal overflow. The open list overlays the links beneath it; closing it reveals those links.

Hash fragments are copied onto the language links after mount, once `location.hash` is known. A check against `/it#corporate` produced `/de#corporate`, `/fr#corporate`, and `/en#corporate`. The first server render omits the hash so the markup matches hydration. The previous switcher did not preserve hashes at all.

Switching from `/it/eventi` followed the German events path `/de/events`.

## Quote wizard

The wizard is still mounted with `key={locale}`. Language changes navigate to the localized quote route and the draft is created again empty. No `localStorage`, `sessionStorage`, or submission endpoint was added.

Browser check: on `/it/preventivo` an event type, the undecided-date control, and a guest range were selected (three checked inputs) and a location was typed. Choosing Deutsch opened `/de/angebot-anfordern` with zero checked inputs and an empty location. The German page shows the existing notice that the request is not transmitted. The form has no `action`. There is no submit button on the first step. The browser recorded no non-GET requests during the check.

## Footer

`SiteFooter` is a single column of brand, notice, and credit on Midnight Black.

1. Circular logo plus the localized brand description.
2. A full-width hairline using the existing `line-on-dark` token.
3. The legal heading and the sentence that legal information will be published in this area. No legal URL is rendered while `legalContentPublished` is false.
4. A second hairline.
5. `© 2026 Casino Show`, from the constant `2026` passed into the existing translation. `Date` is not called.
6. “Website by” plus a link whose visible name is Fabio Scaramella. The URL is `https://www.linkedin.com/in/fabio-scaramella`, with `target="_blank"` and `rel="noopener noreferrer"`. A visually hidden phrase says that it opens in a new tab.

No email, phone, WhatsApp, social profile, or street address was added. Contact configuration is unchanged and still empty.

At 640 px and up the footer logo is 104 × 104. Below that it is 88 × 88.

## Legal routes

Internal pathnames, kept out of `routeIds` so the commercial sitemap stays at 28 URLs:

| Route | Italian | German | French | English |
| --- | --- | --- | --- | --- |
| `/privacy` | `/informativa-privacy` | `/datenschutz` | `/politique-de-confidentialite` | `/privacy-policy` |
| `/cookies` | `/informativa-cookie` | `/cookie-richtlinie` | `/politique-cookies` | `/cookie-policy` |
| `/legal` | `/note-legali` | `/impressum` | `/mentions-legales` | `/legal-notice` |

Each page is a placeholder. The heading is the localized document name. The body says the document is not yet available and is not an approved policy. Metadata is `noindex, nofollow`, with a localized canonical URL and reciprocal hreflang, including Italian `x-default`. These URLs are absent from `sitemap.xml`. The footer flag `src/config/legal.ts` is false for all three, so the labels are not linked. Flipping a flag later renders that label through the existing pathname map. No cookie-consent manager was added. No legal text was copied from another site.

## Business information

`src/config/business.ts` holds empty public fields: legal name, street, postal code, locality, region, country, registration id, and VAT id. Nothing in that file is rendered.

Still required before any of those fields can be published: confirmation of the legal relationship between Casino Show and the operating company, and confirmation of the legal name, address, registration number, and VAT number that may appear on this website. Those facts were not written into the repository.

## Localization

Italian, German, French, and English message files have the same 537 leaf keys. New German copy uses no `ß`. The footer description follows the supplied Italian sentence and is localized for the other three languages. The credit line stays “Website by Fabio Scaramella” in every language. Navigation labels were not changed.

## SEO

Canonical origin remains `https://casinoshow.ch`. Commercial canonicals, hreflang, and `x-default` are unchanged. The sitemap still lists exactly 28 commercial URLs. Legal placeholders are noindex and excluded. No Open Graph image and no structured data with business details were added. Commercial SEO copy was not edited.

## Accessibility

The header is a `header` landmark. Primary navigation keeps its accessible name. The language control is a `nav` with a menu button and `menuitem` links. Focus rings use the existing gold outline. Logo alt text supplies the home-link name. The credit link name is the person’s name, with hidden text for the new tab.

The mobile panel now keeps Tab inside the open panel and the menu button, and Escape still closes it and restores focus. That cycle was implemented and not separately exercised with the Tab key in the browser. The language menu’s Escape handler runs in the capture phase so it closes the menu before the mobile panel. Arrow Down, Escape, and outside dismissal were exercised on the desktop control. This is not a formal WCAG certification.

## Performance and security

Header and footer logos use `next/image`. Only the header logo is preloaded. No third-party script, font, or dropdown library was added. The favicon PNG is 413 KB; that weight is a property of the approved file.

No secrets, form endpoints, databases, or quote transmission were added. No package was installed. The previously reported high `npm audit` findings are in the ESLint toolchain (`eslint-config-next` and its dependencies). They were not changed, and `npm audit fix --force` was not run. No new dependency advisory was introduced.

## Verification

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass. Next.js 16.4.0. Static generation completed, including the 12 legal routes. |
| `npm run verify:routes` | Pass against `http://127.0.0.1:3457`. 28 commercial URLs, 12 legal URLs, root redirect, 404s, and a 28-URL sitemap. |
| Browser | The Cursor browser tools were unavailable. Headless Chrome checked Italian mobile, German desktop, French desktop, and English desktop, plus the widths listed above. |
| Console | No console errors and no runtime exceptions were captured during those checks. |
| Images | Header logo loaded. Footer logo loaded once scrolled into view; before that, lazy-loading correctly reported it as not yet complete. |
| Server | The temporary production server on port 3457 was stopped after the checks. |

## Known issues and publication blockers

- Legal page copy is intentionally unpublished. Do not link it until approved text exists.
- Business identity, address, registration, and VAT remain unconfirmed for publication.
- Contact channels remain empty.
- The favicon file is larger than a typical icon.
- `Wordmark` is unused.
- The open mobile language list covers part of the menu underneath it.
- Quote drafts reset on language change. That is the existing Phase 10 behavior.
- Existing ESLint-toolchain audit findings remain.
- Tab cycling inside the open mobile panel was not browser-tested.

## Git

HEAD is still `cca88e4e71dc39f58d85a1efd7b2b1a3cfcddbd5`. Phase 12 is uncommitted. No remote was added and nothing was pushed.
