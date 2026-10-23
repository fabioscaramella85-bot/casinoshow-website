# Phase 12.1 — White header and premium footer

Phase 12.1 corrects the shared header and footer. Commercial page layouts, gallery data, legal placeholder copy, and quote submission are unchanged.

## Header

The sticky header background is white (`#FFFFFF`). Navigation text is Midnight Black. The active link is Casino Green with a green underline. The quote button stays Casino Red with white text. Focus inside the header uses a midnight outline so the ring stays visible on white.

`logo-header.png` is unchanged: no filters, same 1600×437 ratio, displayed at 176×48. On white the wheel and the green wordmark are readable without a larger crop.

The language menu uses a white panel, midnight text, and a green mark on the active language. Escape, outside press, and Arrow Down behavior from Phase 12 remain.

## Mobile menu

The panel is white, with midnight links and a green active state. The hamburger uses the header text color.

The language list inside the menu is in normal flow. Opening it pushes the page links down instead of covering them. The panel scrolls if the open list is taller than the viewport. A 320 px check showed Home and the other destinations below the open language list, with no horizontal overflow.

## Footer

The footer background is deep green `#10382D`, with Warm Ivory text and Champagne Gold headings.

1. A full-width quote panel: localized eyebrow, heading, and the existing quote button. Desktop places the text on the left and the button on the right. Narrow screens stack them.
2. Four columns from 1280 px, two from 640 px, one below that.
   - Brand: circular logo at 96 px, or 112 px from 768 px, plus the short brand sentence, `info@casinoshow.ch`, and `+41 76 527 71 78`.
   - Events: corporate, team building, weddings, and private events, linked to the existing Events anchors `#corporate`, `#team`, `#weddings`, and `#private`.
   - Games and services: the Games page, plus `#roulette`, `#blackjack`, `#poker`, `#other-games`, and `#extras`.
   - Casino Show: Home, About, Gallery, Contact, and Request a quote, through the existing localized routes.
3. A hairline, then `© 2026 Casino Show` and the LinkedIn credit for Fabio Scaramella.

No street address, WhatsApp label, or social profile was added. Quote submission is still off.

## Contact configuration

`src/config/contact.ts` now holds the confirmed email and the Swiss display number `+41 76 527 71 78`. The telephone link is `tel:+41765277178`. WhatsApp, address, and social profiles stay empty. The footer and the existing Contact page both read this config. The Contact page was not redesigned; the confirmed channels replace its previous empty state.

## Legal links

The 12 placeholder routes stay noindex and outside the sitemap. The footer no longer shows the preparation sentence. A `data-legal-publication="unpublished"` slot remains, and it renders links only when `legalContentPublished` is turned on. There is no cookie-preferences control.

## Localization

Italian, German, French, and English message files share 553 leaf keys. New German copy does not use `ß`. Navigation labels on the commercial pages were not rewritten.

## Verification

| Check | Result |
| --- | --- |
| ESLint | Pass |
| TypeScript | Pass |
| Production build | Pass |
| `npm run verify:routes` | Pass: 28 commercial URLs, 12 legal placeholders, sitemap of 28, footer email, telephone, and event/game anchors |
| Browser | In-editor browser tools were unavailable. Headless Chrome checked Italian, German, French, and English at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920. No horizontal overflow. Header measured white, footer measured `#10382D`. The mobile language list did not cover the page links. No console errors were captured. |
| Contact page | `/it/contatti` renders the confirmed email, the formatted telephone number, and `tel:+41765277178`. |

The temporary server on port 3457 was stopped after these checks.

## Remaining issues

- Legal documents are still unpublished.
- Address, WhatsApp, and social profiles are still unconfirmed.
- The favicon file remains the 413 KB official PNG.
- Quote drafts still reset when the language changes.
- Existing ESLint-toolchain audit findings are unchanged.

## Git

Phase 12 and Phase 12.1 are uncommitted on `cca88e4`. Nothing was committed or pushed.
