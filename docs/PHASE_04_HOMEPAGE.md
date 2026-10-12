# Phase 04 — Premium multilingual homepage

## Status

COMPLETE. This phase replaces the homepage scaffold with the first commercial page in Italian, German, French and English. The other six commercial pages stay on the Phase 03 scaffold. No quote form, gallery filters, legal routes, or new commercial URLs were added.

No mockup file was present in the repository. The page follows this phase brief and the Phase 03 design system.

## Sections

1. Hero — editorial headline, support line, Switzerland lead, quote link, events link, graphic media frame.
2. Brand introduction — what the service is, guest participation, and adaptation to the event. No history, counts, or testimonials.
3. Events — corporate, team building, weddings, private celebrations. Every card and the section link go to the single Events route.
4. Games and services — roulette, blackjack, poker, dice, wheel of fortune, complementary services. Copy says table availability is confirmed in the proposal. Every card and the section link go to the single Games route.
5. How it works — four numbered steps on the homepage. No extra route.
6. Why Casino Show — presentation, guest participation, flexible formats, atmosphere and detail. No certifications or experience figures.
7. Gallery preview — four 4:3 graphic frames and a link to the Gallery route. The text says real photographs are not published yet.
8. Final call to action — closing headline and the quote link. The form is not built.

Quote links appear in the hero, the closing section, and the existing header. They are not repeated in every section.

## Components

```text
src/components/home/
  home-page.tsx
  home-hero.tsx
  home-introduction.tsx
  home-events.tsx
  home-games.tsx
  home-process.tsx
  home-why.tsx
  home-gallery.tsx
  home-final-cta.tsx
  media-frame.tsx
```

All of these are server components. `HomePage` is rendered from `src/app/[locale]/page.tsx` inside the existing `SiteShell`.

`Card` now accepts an optional `href`. The title becomes a localized `next-intl` link with a 44px hit area. `Section` accepts `tone="muted"` for the warm ivory gallery band (`--color-surface-muted`).

`MediaFrame` holds the aspect ratio. A later photograph replaces the inner graphic with `next/image` and keeps the same box. Decorative frames are `aria-hidden`. The hero frame is an image role with an honest label: it is a graphic composition, and event photography will be published there.

## Translation keys

`Pages.home.heading` is the only `h1` and the document title. `Pages.home.description` is the meta description.

`Home` holds the visible copy:

- `hero.eyebrow`, `hero.support`, `hero.lead`, `hero.eventsCta`, `hero.mediaLabel`
- `intro.eyebrow`, `intro.title`, `intro.body`, `intro.detail`
- `events.eyebrow`, `events.title`, `events.description`, `events.cta`, `events.items.{corporate,team,wedding,private}.{title,body}`
- `games.eyebrow`, `games.title`, `games.description`, `games.cta`, `games.items.{roulette,blackjack,poker,dice,wheel,extra}.{title,body}`
- `process.eyebrow`, `process.title`, `process.steps.{tell,proposal,setup,enjoy}.{title,body}`
- `why.eyebrow`, `why.title`, `why.description`, `why.items.{presentation,guests,formats,detail}.{title,body}`
- `gallery.eyebrow`, `gallery.title`, `gallery.description`, `gallery.cta`
- `final.eyebrow`, `final.title`, `final.body`

Quote labels stay on `Nav.quote`. German copy uses Swiss spelling without ß.

Headlines are sentence case in Playfair. Button labels stay uppercase through `type-button`. Forcing the hero into CSS uppercase would widen German and French lines on a 320px screen.

## SEO metadata

`getPageMetadata` still builds the title, description, canonical URL and reciprocal hreflang. It now also sets Open Graph `title`, `description`, `url`, `siteName`, `locale` (`it_IT`, `de_CH`, `fr_CH`, `en_GB`) and `type: website` for every commercial page, from the same dictionary fields. There is no Open Graph image, because there is no approved photograph. No structured data was added. The sitemap is unchanged.

Homepage titles:

| Locale | Title (`h1`) | Meta description |
| --- | --- | --- |
| it | Sempre un evento vincente | Casino Show porta l'intrattenimento a tema casinò negli eventi in Svizzera, con un'atmosfera curata e adattata all'occasione. |
| de | Immer ein gelungenes Event | Casino Show bringt Casino-Unterhaltung zu Anlässen in der Schweiz, mit einer gepflegten und auf den Anlass abgestimmten Atmosphäre. |
| fr | Toujours un événement réussi | Casino Show apporte une animation de casino aux événements en Suisse, avec une atmosphère soignée et adaptée à l'occasion. |
| en | Always a winning event | Casino Show brings casino-themed entertainment to events in Switzerland, with an atmosphere shaped around the occasion. |

The rendered title uses the existing template `%s · Casino Show`. `scripts/verify-routes.mjs` expects the new homepage `h1` and meta description. The other six pages are unchanged.

Heading order on the homepage: one `h1`, then `h2` for each section, then `h3` for cards, steps and reasons.

## Media assets used

None. `public/loghi/` contains older logo files, including a jester-and-roulette lockup with `WWW.CASINOSHOW.CH` and a file named `non usare.png`. They are not event photographs and they do not match the approved typographic wordmark, so they are not used. No remote images were added.

## Missing photographs

- Hero still
- Event-category stills
- Game stills
- Gallery preview photographs
- Open Graph image

The page stays intact without them. `MediaFrame` is the replacement slot.

## Responsive decisions

- Hero copy comes first. The media frame is 4:3 on small screens and 4:5 from `lg`.
- Event cards: 1 column, 2 from `sm`, 4 from `xl`.
- Game cards: 1 column, 2 from `sm`, 3 from `lg`.
- Steps: 1 column, 2 from `sm`, 4 from `lg`.
- Gallery frames: 2 columns, 4 from `lg`, each locked to 4:3.
- Headings use `text-balance`.
- Section bands alternate midnight, ivory, midnight, ivory, midnight, ivory, muted ivory, midnight.

## Accessibility decisions

- One `h1`. Sections point at their `h2` with `aria-labelledby`.
- Hero text sits on solid midnight, not on a photograph.
- Card titles and buttons keep a 44px minimum height.
- Gallery frames are decorative. The section copy states that the photographs are not published.
- Motion stays on the existing CSS transitions. Reduced motion is unchanged from Phase 03.
- No new client components.

## Files changed

Created:

- `src/components/home/home-page.tsx`
- `src/components/home/home-hero.tsx`
- `src/components/home/home-introduction.tsx`
- `src/components/home/home-events.tsx`
- `src/components/home/home-games.tsx`
- `src/components/home/home-process.tsx`
- `src/components/home/home-why.tsx`
- `src/components/home/home-gallery.tsx`
- `src/components/home/home-final-cta.tsx`
- `src/components/home/media-frame.tsx`
- `docs/PHASE_04_HOMEPAGE.md`

Modified:

- `src/app/[locale]/page.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/section.tsx`
- `src/components/ui/section-heading.tsx`
- `src/i18n/metadata.ts`
- `src/messages/it.json`
- `src/messages/de.json`
- `src/messages/fr.json`
- `src/messages/en.json`
- `scripts/verify-routes.mjs`

## Tests

| Check | Result |
| --- | --- |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0 against `http://127.0.0.1:3457` |

The in-editor browser was unavailable. Layout was measured in headless Chrome against the production server, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920, for `/it`, `/de`, `/fr` and `/en`.

No horizontal overflow. One `h1` and seven `h2` elements on each homepage. Event cards are 1 / 2 / 4 columns, game cards 1 / 2 / 3, steps 1 / 2 / 4, and the gallery grid 2 / 4. Each homepage has two quote links in `main`, plus the events, games and gallery links. No console errors were recorded during those loads. Screenshots were taken of the Italian page at 390, 768 and 1440, and of the German page at 1440. The client width is slightly below the requested width when a scrollbar is present (for example 1425 at a 1440 window).

## Known limitations

- Photography is graphic composition, not event imagery.
- Complementary services are described only in general. The proposal confirms the scope.
- The other six pages are still scaffolds.
- The quote, contact and gallery pages do not yet have their production features.
- Homepage metadata is provisional. It is not the result of keyword research.
- Open Graph has text and no image.

## Next phase

The Events page is the natural follow-up: one page for the four categories already introduced here, still without new routes. Games, gallery, about, contact and the quote form stay out of that work unless a later brief includes them.
