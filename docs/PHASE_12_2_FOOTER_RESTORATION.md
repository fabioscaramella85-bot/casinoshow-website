# Phase 12.2 — Footer restoration and sitemap alignment

Phase 12.2 restores the shared footer to the Casino Show design system and limits its navigation to the seven commercial pages. The header, language menu, mobile navigation, commercial pages, gallery, quote wizard, route registry, legal routes, and contact page were not changed.

## Midnight Black

The footer background is Midnight Black `#101114` through the existing `bg-midnight` token. Computed color in the browser is `rgb(16, 17, 20)`. Text is Warm Ivory `#F5F2EB`. Links warm to Champagne Gold `#C6A66B` on hover. The bottom rule uses `bg-line-on-dark`.

The deep-green token `#10382D` was removed from `src/app/globals.css`. No green footer background remains.

## Promotional panel

The oversized quote panel from Phase 12.1 is gone. Request a Quote is one of the seven navigation links. There is no extra marketing block and no large footer button.

## Sitemap navigation

Footer page links are only:

| Page | Italian label | Public paths |
| --- | --- | --- |
| Home | Home | `/it`, `/de`, `/fr`, `/en` |
| Events | Eventi | `/it/eventi`, `/de/events`, `/fr/evenements`, `/en/events` |
| Games & Services | Giochi & Servizi | `/it/giochi-servizi`, `/de/spiele-services`, `/fr/jeux-services`, `/en/games-services` |
| Gallery | Gallery | `/it/gallery`, `/de/galerie`, `/fr/galerie`, `/en/gallery` |
| About | Chi siamo | `/it/chi-siamo`, `/de/ueber-uns`, `/fr/a-propos`, `/en/about-us` |
| Contact | Contatti | `/it/contatti`, `/de/kontakt`, `/fr/contact`, `/en/contact` |
| Request a Quote | Richiedi un preventivo | `/it/preventivo`, `/de/angebot-anfordern`, `/fr/demander-un-devis`, `/en/request-a-quote` |

German, French, and English labels live in `Footer.nav` and follow the existing navigation wording. Swiss German copy does not use `ß`. The header `Nav` namespace was not rewritten.

There are no links to corporate events, team building, weddings, private events, roulette, blackjack, poker, other games, or extra services, and no subsection hashes inside the footer.

## Layout

- Brand: official `public/loghi/logo-footer.png`, short localized description, and the confirmed contact channels.
- Navigation: the seven pages in two columns from the `sm` breakpoint, one column below that.
- Bottom bar: hairline, `© 2026 Casino Show`, and “Website by Fabio Scaramella” linking to `https://www.linkedin.com/in/fabio-scaramella` with `rel="noopener noreferrer"`.

The footer logo keeps its square ratio. It renders at 88 px below 768 px and 104 px from 768 px. Alt text comes from the existing localized logo label.

## Contact details

Email `info@casinoshow.ch` (`mailto:info@casinoshow.ch`) and telephone `+41 76 527 71 78` (`tel:+41765277178`) still come from `enabledContactChannels()` in `src/config/contact.ts`. They are not copied as new literals in the footer. WhatsApp, a street address, and extra social profiles were not added.

## Legal routes

The twelve placeholder routes stay in place, `noindex`, and outside the sitemap. The footer slot remains `data-legal-publication="unpublished"` and renders no legal links while `legalContentPublished` is false. No preparation sentence and no cookie manager were added.

## Localization

Italian, German, French, and English message files share 545 leaf keys after the Phase 12.1 footer headings and subsection labels were removed. Parity holds, and the German file has no `ß`.

## Responsive results

Headless Chrome checked `/it`, `/de`, `/fr`, and `/en` at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920.

| Check | Result |
| --- | --- |
| Horizontal overflow | None. `scrollWidth` stayed within the viewport. |
| Footer background | `rgb(16, 17, 20)` at every measured size |
| Text color | `rgb(245, 242, 235)` |
| Logo | 88×88 below 768 px, 104×104 from 768 px, with alt text |
| Footer height | 830–853 px on narrow screens, 490 px from 768 px |
| Links | Seven localized routes, mailto, tel, logo home link, LinkedIn credit |
| Subsection hashes in the footer | None |
| Overlapping or clipped links | None |
| Minimum link height | 44 px |
| Legal slot | `unpublished` |
| Promotional panel | Absent |
| Keyboard focus | Tab from the email link landed on the telephone link with a 2 px Champagne Gold outline and 3 px offset |

In-editor browser tools were not used. The production server on port 3457 was stopped after these checks.

## Technical checks

| Check | Result |
| --- | --- |
| ESLint | Pass |
| TypeScript `npx tsc --noEmit` | Pass |
| Production build | Pass, Next.js 16.4.0, 43 static pages |
| `npm run verify:routes` | Exit 1 with five failures only: the script still expects the Italian homepage HTML to contain `#roulette`, `#blackjack`, `#poker`, `#other-games`, and `#extras`. Those strings were footer links removed in this phase. The script was not edited. Every other assertion in that run passed, including 28 commercial URLs, 12 legal routes with `noindex` and sitemap exclusion, logos, copyright, LinkedIn credit, mailto, and tel. |

Quote submission was not changed.

## Files modified in this phase

- `src/components/site-footer.tsx`
- `src/components/brand-logo.tsx` (footer display size only; header logo unchanged)
- `src/app/globals.css` (removed `--color-deep-green`)
- `src/messages/it.json`
- `src/messages/de.json`
- `src/messages/fr.json`
- `src/messages/en.json`
- `docs/PHASE_12_2_FOOTER_RESTORATION.md`

Phase 12 and Phase 12.1 files remain in the working tree. Nothing was committed, pushed, or deployed.
