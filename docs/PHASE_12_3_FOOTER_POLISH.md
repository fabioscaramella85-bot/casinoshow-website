# Phase 12.3 — Footer visual polish

Phase 12.3 refines the shared Midnight Black footer. The header, commercial pages, quote wizard, gallery, legal routes, contact configuration, route registry, and sitemap were not changed.

## Background

The footer remains Midnight Black `#101114` (`bg-midnight`). Measured color is `rgb(16, 17, 20)`. Body text is Warm Ivory `#F5F2EB`. Column headings are Champagne Gold `#C6A66B`, measured as `rgb(198, 166, 107)`. No green background was introduced.

## Logo

`public/loghi/logo-footer.png` is unchanged. Display size is 112 px below 768 px and 132 px from 768 px. Width and height stay equal, so the square ratio and transparency are preserved. Alt text remains the localized logo label.

## Columns

The brand column holds the logo, the existing brand sentence, and the contact channels from `enabledContactChannels()`.

Three navigation headings are gold, small, uppercase, and not links:

| Key | Italian | German | French | English |
| --- | --- | --- | --- | --- |
| discover | Scopri Casino Show | Casino Show entdecken | Découvrir Casino Show | Discover Casino Show |
| experiences | Esperienze | Erlebnisse | Expériences | Experiences |
| contact | Contattaci | Kontakt aufnehmen | Nous contacter | Contact us |

German copy does not use `ß`.

Sitemap links, through `routePathnames`:

| Column | Pages |
| --- | --- |
| Scopri Casino Show | Home, Chi siamo, Gallery |
| Esperienze | Eventi, Giochi & Servizi |
| Contattaci | Contatti, Richiedi un preventivo |

There are no subsection anchors and no extra destinations.

From 1280 px the logo column sits beside the three navigation columns. From 768 px to 1279 px the brand block sits above three aligned navigation columns, so the longer headings stay on one line. From 640 px the navigation uses two columns. Below that, the footer stacks in one column.

The bottom bar is unchanged: hairline, `© 2026 Casino Show`, and the LinkedIn credit for Fabio Scaramella.

## Contact and legal

Email and telephone still come from the centralized contact config: `mailto:info@casinoshow.ch` and `tel:+41765277178`. No WhatsApp, address, or extra social profile was added.

The legal slot stays `data-legal-publication="unpublished"`. No legal links or placeholder sentence appear in the footer.

## Localization

The four message files share 548 leaf keys. Navigation still uses next-intl pathnames, not hardcoded public URLs.

## Responsive results

Headless Chrome checked Italian, German, French, and English at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920.

| Check | Result |
| --- | --- |
| Horizontal overflow | None |
| Logo | 112 px below 768 px, 132 px from 768 px |
| Headings | One line, shared top edge, gold, not links |
| First links in each column | Shared top edge from 768 px upward |
| Footer links | Seven localized routes, mailto, tel, logo home link, LinkedIn |
| Subsection hashes | None inside the footer |
| Overlap or clipping | None |
| Minimum link height | 44 px |
| Legal slot | unpublished |

In-editor browser tools were not used. The production server on port 3457 was stopped after these checks.

## Technical checks

| Check | Result |
| --- | --- |
| ESLint | Pass |
| TypeScript | Pass |
| Production build | Pass, Next.js 16.4.0 |
| `npm run verify:routes` | Exit 1 with the same five stale assertions as Phase 12.2. The script still expects `#roulette`, `#blackjack`, `#poker`, `#other-games`, and `#extras` in the Italian homepage HTML. Those footer links were removed on purpose. Every other assertion passed, including 28 commercial URLs and 12 unpublished noindex legal routes. The script was not edited. |

## Files modified

- `src/components/site-footer.tsx`
- `src/components/brand-logo.tsx` (footer display size only)
- `src/messages/it.json`
- `src/messages/de.json`
- `src/messages/fr.json`
- `src/messages/en.json`
- `docs/PHASE_12_3_FOOTER_POLISH.md`

Nothing was committed, pushed, or deployed.
