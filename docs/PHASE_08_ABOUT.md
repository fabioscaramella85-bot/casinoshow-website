# Phase 08 — About Us

## Status

COMPLETE. The About scaffold is now an editorial page in Italian, German, French and English. No new routes were added. The quote form, the contact page and the legal pages were not built.

No company history, staff profile, address, founding date, client project or legal claim was published.

## Page structure

Routes stay `/it/chi-siamo`, `/de/ueber-uns`, `/fr/a-propos` and `/en/about-us`.

1. Hero — one `h1`, a conceptual support line, a lead that separates the project from online gambling and from play for money, and a named graphic frame.
2. The idea — two columns. Copy on the left, including a short aside, and a decorative frame on the right. Atmosphere and participation, not a win.
3. The approach — five steps for shaping a proposal: occasion, guests, space, selection, coordination. The copy says this is not an operational guarantee and not a claim that Casino Show performs every technical service.
4. The experience — a dark typographic section. The tables set the scene. The people make the evening.
5. What defines the project — four pillars in an uneven grid: atmosphere, participation, flexibility, attention to detail. They are not certifications and they do not describe staff or equipment.
6. Discover the experience — links to Events, Games and Services, and Gallery. The gallery line says photographs appear only after approval. The event line says the categories are contexts, not completed work.
7. Final call to action — closing headline and the existing quote link. The form is not built.

## Components

```text
src/components/about/
  about-page.tsx
  about-hero.tsx
  about-idea.tsx
  about-approach.tsx
  about-experience.tsx
  about-pillars.tsx
  about-explore.tsx
  about-final-cta.tsx
```

All are server components. `src/app/[locale]/about/page.tsx` renders them inside `SiteShell`. Shared pieces are `Section`, `SectionHeading`, `Eyebrow`, `Container`, `Button`, `Divider`, `MediaFrame` and the next-intl `Link`.

## Editorial strategy

The page states a philosophy, not a biography. “Nasce dall’idea”, “geht von der Idee aus”, “part de l’idée” and “starts from the idea” describe the concept. They do not date a company.

The tone stays specific: tables, guests, the room, a proposal that is confirmed later. Event types are listed as possible contexts. Games and services stay subject to the proposal. The homepage process (“Dalla richiesta alla serata”) is not repeated.

Italian is the source. German uses Swiss spelling, without ß (`auszuschliessen`, `Mass`). French is written for a Swiss reader. English uses international spelling (`centre`, `programme`).

## Verified and unverified claims

Published, and limited to what the project can say without a company file:

- Casino Show is casino-themed entertainment for events.
- It is not an online gambling platform and not play for money.
- A proposal is shaped around the occasion, the guests, the space and the experiences that fit.
- The combination is confirmed in the proposal.
- Approved photographs are not published yet.

Not published, because they are not established:

- Foundation date, years of activity, legal entity, registered office, address, VAT
- Founder, named team, headcount, certifications
- Client names, project counts, market rank
- A promise that every listed service is available in Switzerland
- A promise that Casino Show performs every technical service itself

## Translation keys

`Pages.about.heading` is the only `h1` and the document title. `Pages.about.description` is the meta description.

`About` holds the visible copy. The four dictionaries share 57 keys:

- `hero.eyebrow`, `hero.support`, `hero.lead`, `hero.mediaLabel`
- `idea.eyebrow`, `idea.title`, `idea.body`, `idea.aside`
- `approach.eyebrow`, `approach.title`, `approach.body`, `approach.points.{occasion,guests,space,selection,coordination}.{title,body}`
- `experience.eyebrow`, `experience.title`, `experience.body`, `experience.notes.{participation,conversation,discovery,shared,atmosphere}.{title,body}`
- `pillars.eyebrow`, `pillars.title`, `pillars.body`, `pillars.items.{atmosphere,participation,flexibility,detail}.{title,body}`
- `explore.eyebrow`, `explore.title`, `explore.body`, `explore.items.{events,games,gallery}.{title,body}`
- `final.eyebrow`, `final.title`, `final.body`

The quote label stays on `Nav.quote`.

## SEO metadata

The existing metadata helper supplies the title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image and no new structured data. The sitemap is unchanged.

| Locale | Path | Title (`h1`) |
| --- | --- | --- |
| it | `/it/chi-siamo` | Non solo giochi. Esperienze da vivere. |
| de | `/de/ueber-uns` | Nicht nur Spiele. Erlebnisse zum Teilen. |
| fr | `/fr/a-propos` | Pas seulement des jeux. Des expériences à vivre. |
| en | `/en/about-us` | Not only games. Experiences to live. |

Heading order: one `h1`, six `h2` elements, then seventeen `h3` elements inside the approach, the experience, the pillars and the explore links.

## Navigation

Explore links use the next-intl `Link` with `routePathnames.events`, `routePathnames.games` and `routePathnames.gallery`. The close uses `routePathnames.quote`. No locale string is assembled by hand.

## Responsive behavior

Hero copy comes first. The frame is 4:3, then 4:5 from `lg`. The idea section stacks, then splits from `lg`. The approach is a stacked row, then a 12-column line from `md`. Experience notes are one column, two from `sm`, five from `lg`. Pillars stack, then an uneven 7/5 grid from `lg`. Explore links stack, then three columns from `lg`.

## Accessibility

One `h1`. Sections point at their `h2`. Explore titles are the links and keep a 44px minimum. The hero frame has an accessible name that says it is a graphic composition. The second frame is decorative. Focus uses the existing gold ring. Motion stays on the existing CSS transitions. No new client components. Gold small text on light surfaces uses `gold-ink`.

## Performance

The page is server-rendered. Visuals are CSS frames and type. No image file, no video, no animation library and no new dependency.

## Missing assets

- Portrait or editorial photograph of the activity, only if rights and accuracy are confirmed
- Open Graph image

No team portrait and no office photograph should be invented to fill these slots. The files in `public/loghi/` were not used.

## Tests

| Check | Result |
| --- | --- |
| About key parity, four locales | 57 keys, matched |
| German `About` copy | No ß |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0, 28 localized URLs, against `http://127.0.0.1:3457` |

The production server that was already listening on port 3457 was stopped on purpose before this build. The replacement started cleanly and is the server the checks used.

Headless Chrome, `/it/chi-siamo`, `/de/ueber-uns`, `/fr/a-propos` and `/en/about-us`, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920: no horizontal overflow, one `h1`, six `h2` elements, seventeen `h3` elements, no `img`, one quote link in `main`, and one link each to Events, Games and Gallery. No console errors were recorded. Screenshots: Italian at 390 and 768, German and French at 1440. A scrollbar makes the measured width slightly smaller than the window from 1024 upward. The Cursor IDE browser was not available.

## Known issues

There is still no approved photograph. Metadata is provisional and has no social image. Contact and the quote form remain scaffolds. The company file required for a factual biography does not exist, so the page stays conceptual.

## Next phase

The Contact page is the natural follow-up. The quote form stays out of that work unless a later brief includes it. A company biography stays out until the facts are supplied.
