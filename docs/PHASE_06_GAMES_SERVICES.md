# Phase 06 — Premium multilingual Games & Services page

## Status

COMPLETE. This phase replaces the Games scaffold with one commercial page in Italian, German, French and English. Roulette, blackjack, poker, dice, the wheel of fortune, the selfie mirror and the 360 experience stay on that page. No new routes were added. The homepage event cards now open the matching section on the Events page. Events page copy is unchanged.

The tables and services are candidate offerings from the Fun Casino taxonomy. The copy says the combination is confirmed in the proposal. It does not promise equipment, staffing, packages, prices, prizes or real-money play.

## Page structure

1. Hero — one `h1`, support line, entertainment lead, quote link, five category links, graphic media frame.
2. Overview — the same five links, with a note that the listed tables and services are proposals.
3. Roulette — editorial split, text then media on large screens, three points, quote link. Atmosphere, guest participation and table presentation. No betting explanation and no table model or quantity.
4. Blackjack — text first in the document, media on the left from `lg`. Guest interaction and shared play. No lesson and no staffing claim.
5. Poker — dark editorial feature, wide media band, three columns. Social table, no cash tournament and no official competition.
6. Other games — dice and wheel of fortune as two distinct blocks. No rules, prizes or fixed availability.
7. Complementary services — selfie mirror and 360 experience on a light band. Optional, not included automatically, equipment not promised. A note says the combination is confirmed in the proposal.
8. Choosing the experience — event type, guest count, space, duration, atmosphere and selection. Link to the Events page. No calculator and no packages.
9. Final call to action — closing headline and the quote link. The form is not built.

Quote links are in the hero, the roulette section and the close, plus the existing header.

## Components

```text
src/components/games/
  games-page.tsx
  games-hero.tsx
  games-overview.tsx
  roulette-section.tsx
  blackjack-section.tsx
  poker-section.tsx
  other-games.tsx
  complementary-services.tsx
  choosing-experience.tsx
  games-final-cta.tsx
```

All are server components. `src/app/[locale]/games/page.tsx` renders them inside `SiteShell`. Media uses the existing `MediaFrame`. `Card` gained an optional `hash` so a title link can point at a section on another localized page.

## Content strategy

Italian is the source. German uses Swiss spelling, without ß. French is written for a Swiss reader. English stays internationally plain.

The page does not describe online gambling, cash wagering, guaranteed winnings, financial prizes or a gambling licence. It does not invent equipment specifications.

## Translation keys

`Pages.games.heading` is the only `h1` and the document title. `Pages.games.description` is the meta description.

`Games` holds the visible copy:

- `hero.eyebrow`, `hero.support`, `hero.lead`, `hero.navLabel`, `hero.mediaLabel`
- `overview.eyebrow`, `overview.title`, `overview.description`, `overview.items.{roulette,blackjack,poker,other,extras}.{title,summary}`
- `roulette.eyebrow`, `roulette.title`, `roulette.body`, `roulette.points.{atmosphere,participation,presentation}.{title,body}`
- `blackjack.eyebrow`, `blackjack.title`, `blackjack.body`, `blackjack.points.{interaction,atmosphere,guests}.{title,body}`
- `poker.eyebrow`, `poker.title`, `poker.body`, `poker.points.{table,participation,setting}.{title,body}`
- `other.eyebrow`, `other.title`, `other.description`, `other.dice.{title,body}`, `other.wheel.{title,body}`
- `extras.eyebrow`, `extras.title`, `extras.body`, `extras.note`, `extras.selfie.{title,body}`, `extras.experience.{title,body}`
- `choosing.eyebrow`, `choosing.title`, `choosing.body`, `choosing.eventsCta`, `choosing.points.{type,guests,space,duration,atmosphere,selection}.{title,body}`
- `final.eyebrow`, `final.title`, `final.body`

Quote labels stay on `Nav.quote`.

## SEO metadata

The existing metadata helper supplies the title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image and no new structured data. The sitemap is unchanged.

| Locale | Path | Title (`h1`) |
| --- | --- | --- |
| it | `/it/giochi-servizi` | I giochi che accendono il tuo evento |
| de | `/de/spiele-services` | Die Spiele, die Ihren Anlass beleben |
| fr | `/fr/jeux-services` | Les jeux qui animent votre événement |
| en | `/en/games-services` | The games that light up your event |

Meta descriptions state casino-themed entertainment for events in Switzerland and that complementary services are confirmed in the proposal. Heading order: one `h1`, then an `h2` for each of the eight sections after the hero, then `h3` for the points inside a section.

## Anchor navigation

Same-page links use native anchors, so the locale in the URL stays as it is.

| Link | Target |
| --- | --- |
| Roulette | `#roulette` |
| Blackjack | `#blackjack` |
| Poker | `#poker` |
| Other games | `#other-games` |
| Complementary services | `#extras` |

The hero has five links and the overview repeats them, ten in total. `scroll-padding-top` on `html` stays `7.25rem` from Phase 05. Sections do not add a second `scroll-margin`.

## Homepage event-card links

The four cards in `HomeEvents` now use the next-intl `Link` object `{ pathname, hash }`. The homepage key `wedding` maps to the Events id `weddings`. The section button still opens the Events page at the top.

| Card | Hash |
| --- | --- |
| Corporate | `#corporate` |
| Team building | `#team` |
| Weddings | `#weddings` |
| Private celebrations | `#private` |

Rendered hrefs: `/it/eventi#…`, `/de/events#…`, `/fr/evenements#…`, `/en/events#…`.

## Media placeholders

`MediaFrame` is used in the hero, the roulette split, the blackjack split, as a wide 16:9 band in poker, and on the dice, wheel, selfie mirror and 360 blocks. The hero frame has an accessible name that says it is a graphic composition. The others are decorative. The choosing section and the final close are typographic.

No file in `public/` is an approved game or service photograph. The older logo files were not used. `next/image` is not used until a real photograph exists.

## Missing assets

- Hero photograph
- Roulette photograph
- Blackjack photograph
- Poker photograph
- Dice photograph
- Wheel of fortune photograph
- Selfie mirror photograph
- 360 experience photograph
- Open Graph image

## Responsive decisions

- Hero copy comes first. The frame is 4:3, then 4:5 from `lg`.
- Category links stack on small screens and wrap onto a second line when a long German or French label does not fit the row.
- Overview items: 1 column, 2 from `sm`, 5 from `xl`.
- Roulette: text then media. Blackjack: text first in the document, media on the left from `lg`.
- Poker points: 1 column, 3 from `sm`.
- Other games and complementary services: two blocks, stacked then side by side.
- Choosing points: 1 column, 2 from `sm`.

## Accessibility

One `h1`. Sections point at their `h2`. Anchor links and buttons keep a 44px minimum. Essential copy is in the document, not behind hover. Focus uses the existing gold ring. Motion stays on the Phase 03 CSS transitions. No new client components.

## Tests

| Check | Result |
| --- | --- |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0, 28 localized URLs, against `http://127.0.0.1:3457` |

Headless Chrome against the production server. Games pages `/it/giochi-servizi`, `/de/spiele-services`, `/fr/jeux-services` and `/en/games-services` at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920: no horizontal overflow, one `h1`, eight `h2` elements, ten in-page anchors, three quote links in `main`, and the Events link. No console errors were recorded. A scrollbar makes the measured width slightly smaller than the window at 1024 and above.

Anchor clearance after navigation, target top below the sticky header:

| URL | Width | Header bottom | Section top |
| --- | --- | --- | --- |
| `/it/eventi#corporate` | 390 | 103px | 116px |
| `/de/events#team` | 390 | 103px | 116px |
| `/fr/evenements#weddings` | 768 | 69px | 116px |
| `/en/events#private` | 1440 | 69px | 116px |
| `/it/giochi-servizi#roulette` | 390 | 103px | 116px |
| `/de/spiele-services#blackjack` | 768 | 69px | 116px |
| `/fr/jeux-services#poker` | 1440 | 69px | 116px |
| `/en/games-services#other-games` | 390 | 103px | 116px |
| `/it/giochi-servizi#extras` | 1280 | 69px | 116px |

Homepage HTML contains the four hashed event links in Italian, German, French and English. Screenshots: Italian games at 390 and 768, German and French games at 1440. The Cursor IDE browser was not available; these checks used headless Chrome.

## Known limitations

Photography is still a graphic stand-in. The quote form is not built. Gallery, about and contact remain scaffolds. Metadata is provisional and has no social image. The listed games and complementary services are proposals until they are confirmed for the Swiss market. The homepage section button still opens Events at the top; only the four cards deep-link.

## Next phase

The Gallery page is the natural follow-up. About, contact and the quote form stay out of that work unless a later brief includes them.
