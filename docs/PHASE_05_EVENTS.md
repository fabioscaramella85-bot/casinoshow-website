# Phase 05 — Premium multilingual Events page

## Status

COMPLETE. This phase replaces the Events scaffold with the commercial page in Italian, German, French and English. The four categories stay on that one page. No new routes were added. The homepage and the other commercial pages are unchanged.

## Page structure

1. Hero — one `h1`, support line, Switzerland lead, quote link, category links, graphic media frame.
2. Overview — four links to anchors on the same page.
3. Corporate events — editorial split, text then media on large screens, quote link. Covers receptions, gala dinners, company celebrations, client gatherings and networking.
4. Team building — media then text on large screens, numbered list. States that the moment is entertainment, not training, and makes no work-outcome claim.
5. Weddings — warm ivory editorial section. States that Casino Show provides the entertainment and does not plan the wedding.
6. Private celebrations — four-part composition for birthdays, anniversaries, private parties and other occasions. Game presence is confirmed in the proposal.
7. Tailored experience — six limits of a proposal, plus a link to Games and Services. The copy says the catalogue is not unlimited.
8. Final call to action — closing headline and the quote link. The form is not built.

Quote links are in the hero, the corporate section and the close, plus the existing header.

## Components

```text
src/components/events/
  events-page.tsx
  events-hero.tsx
  events-overview.tsx
  corporate-events.tsx
  team-building-events.tsx
  wedding-events.tsx
  private-events.tsx
  tailored-experience.tsx
  events-final-cta.tsx
```

All are server components. The route file `src/app/[locale]/events/page.tsx` renders them inside `SiteShell`. Media uses the existing `MediaFrame`.

## Content strategy

Italian is the source. German uses Swiss spelling, without ß. French is written for a Swiss reader. English stays internationally plain.

The page does not name clients, counts, years, certifications, testimonials, prices or guarantees. Corporate gala dinners sit inside the corporate section.

## Translation keys

`Pages.events.heading` is the only `h1` and the document title. `Pages.events.description` is the meta description.

`Events` holds the visible copy:

- `hero.eyebrow`, `hero.support`, `hero.lead`, `hero.navLabel`, `hero.mediaLabel`
- `overview.eyebrow`, `overview.title`, `overview.description`, `overview.items.{corporate,team,weddings,private}.{title,summary}`
- `corporate.eyebrow`, `corporate.title`, `corporate.body`, `corporate.points.{reception,gala,celebration,clients,networking}.{title,body}`
- `team.eyebrow`, `team.title`, `team.body`, `team.points.{participation,interaction,challenge,collaboration}.{title,body}`
- `weddings.eyebrow`, `weddings.title`, `weddings.body`, `weddings.note`, `weddings.atmosphere`, `weddings.guests`
- `private.eyebrow`, `private.title`, `private.body`, `private.points.{birthday,anniversary,party,occasion}.{title,body}`
- `tailored.eyebrow`, `tailored.title`, `tailored.body`, `tailored.points.{type,guests,space,atmosphere,games,format}.{title,body}`, `tailored.gamesCta`
- `final.eyebrow`, `final.title`, `final.body`

Quote labels stay on `Nav.quote`.

## SEO metadata

The existing metadata helper supplies the title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image.

| Locale | Title (`h1`) |
| --- | --- |
| it | Un'esperienza unica per ogni evento |
| de | Ein eigenes Erlebnis für jeden Anlass |
| fr | Une expérience propre à chaque événement |
| en | A distinct experience for every event |

Heading order: one `h1`, then an `h2` for each of the seven sections after the hero, then `h3` for the points inside a section. `scripts/verify-routes.mjs` now decodes `&#x27;` so the Italian apostrophe in the `h1` matches. The sitemap is unchanged.

## Anchor navigation

Same-page links use native anchors, so the locale in the URL stays as it is.

| Link | Target |
| --- | --- |
| Corporate | `#corporate` |
| Team building | `#team` |
| Weddings | `#weddings` |
| Private celebrations | `#private` |

The hero has four links and the overview repeats them, eight in total. `scroll-padding-top` on `html` is `7.25rem`, enough for the sticky header including the two-row mobile bar. At 390px the team target sat at about 116px while the header was about 103px tall.

## Media placeholders

`MediaFrame` is used in the hero, the corporate split, the team-building split and as a wide 16:9 band in the wedding section. The hero frame has an accessible name that says it is a graphic composition. The others are decorative. Private celebrations and the tailored section are typographic.

No file in `public/` is an approved event photograph. The older logo files were not used.

## Missing assets

- Hero photograph
- Corporate event photograph
- Team-building photograph
- Wedding reception photograph
- Open Graph image

## Responsive decisions

- Hero copy comes first. The frame is 4:3, then 4:5 from `lg`.
- Category links stack on small screens and sit in a row when they fit.
- Overview items: 1 column, 2 from `sm`, 4 from `xl`.
- Corporate: text then media. Team building: text first in the document, media on the left from `lg`.
- Private occasions: 1 column, 2 from `sm`.
- Tailored points: 1 column, 2 from `sm`.

## Accessibility

One `h1`. Sections point at their `h2`. Anchor links and buttons keep a 44px minimum. Essential copy is in the document, not behind hover. Focus uses the existing gold ring. Motion stays on the Phase 03 CSS transitions. No new client components.

## Tests

| Check | Result |
| --- | --- |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0 against `http://127.0.0.1:3457` |

Headless Chrome, production server, `/it/eventi`, `/de/events`, `/fr/evenements` and `/en/events`, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920: no horizontal overflow, one `h1`, seven `h2` elements, eight in-page anchors, three quote links in `main`, and the games link. No console errors were recorded. The `#team` anchor cleared the header at 390px. Screenshots: Italian at 390, 768 and 1440, German at 1440, French at 1440. A scrollbar makes the measured width slightly smaller than the window.

## Known limitations

Photography is still a graphic stand-in. The quote form is not built. Games, gallery, about and contact remain scaffolds. Metadata is provisional. Homepage category cards still open the Events page at the top, not at a section anchor.

## Next phase

The Games and Services page is the natural follow-up. The tailored section already links there. Gallery, about, contact and the quote form stay out of that work unless a later brief includes them.
