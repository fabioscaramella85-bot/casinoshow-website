# Phase 09 — Contact page

## Status

COMPLETE. The Contact scaffold is now an editorial page in Italian, German, French and English. No contact form was built. The Quote page is still the existing scaffold. No new routes were added.

No email, telephone, WhatsApp number, address or social profile was published, because none is verified.

## Page structure

Routes stay `/it/contatti`, `/de/kontakt`, `/fr/contact` and `/en/contact`.

1. Hero — one `h1`, a welcome line, and a lead that says unconfirmed details are not published. The media is a named graphic composition, not an office photograph.
2. Two paths — a quote path for someone already planning an event, and an information path for a general question or a collaboration. The quote button uses the existing localized label and opens the Quote route. A note under it says the submission form is not active yet. The information path has no button, because no direct channel is confirmed.
3. Channels — an editorial statement that email, telephone and messages will appear only after confirmation. No empty cards and no sample address.
4. How to start — five points of guidance: event type, general idea, approximate area, preferred period, particular requests. There are no fields and no promised response time.
5. Close — links to Events and Games and Services. The quote button is not repeated here, so the page does not end on a second action that could be read as a working form.

The information-path sentence in the brief, “scegli il canale disponibile”, was rewritten. No channel is available, so the published line says a direct contact will appear only once it is confirmed.

## Components

```text
src/components/contact/
  contact-page.tsx
  contact-hero.tsx
  contact-paths.tsx
  contact-channels.tsx
  contact-introduction.tsx
  contact-final-cta.tsx
src/config/contact.ts
```

All page components are server components. `Section` gained an optional `label` so the two-path section can be named without inventing a third heading.

## Contact configuration

`contactDetails` holds `email`, `phone`, `whatsapp`, `address` and `socialProfiles`. Every value is `null` or an empty list. `enabledContactChannels()` returns a link only for a non-blank email, phone or WhatsApp value. The page renders those links, a confirmed address and social profiles only when the config contains them. Adding a verified value later does not require a layout change.

The production config was checked: all fields empty, and the serialized object contains neither `@` nor `casinoshow.ch`. A fixture with sample values, used only in `scripts/verify-contact.ts`, checks `mailto:`, `tel:` and `https://wa.me/` formatting. That fixture is not rendered.

## Verified information

None. The repository, the phase documents, the footer and the environment files contain no confirmed Casino Show email, telephone, WhatsApp number, postal address, legal entity or social profile. Placeholder copy and the logo files were not treated as contact data.

## Missing information, required before launch

- A confirmed public email, if email is a channel
- A confirmed telephone number, if telephone is a channel
- A confirmed WhatsApp number, if that channel is wanted
- A decision on whether any public address should exist
- Any social profile that is actually operated for this site

Until those exist, the channels section stays a statement and not a list.

## Localization

Italian is the source. German uses Swiss spelling, without ß (`grosse`). French is written for a Swiss reader. English uses “organising”.

`Pages.contact.heading` is the only `h1`. The four `Contact` dictionaries share 38 keys.

| Locale | Path | Title (`h1`) |
| --- | --- | --- |
| it | `/it/contatti` | Parliamo del tuo prossimo evento |
| de | `/de/kontakt` | Sprechen wir über Ihren nächsten Anlass |
| fr | `/fr/contact` | Parlons de votre prochain événement |
| en | `/en/contact` | Let's talk about your next event |

## SEO metadata

The existing helper supplies title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image, no map and no LocalBusiness data. The sitemap is unchanged.

Heading order: one `h1`, five `h2` elements, seven `h3` elements.

## Navigation

The quote button uses `routePathnames.quote`. The close uses `routePathnames.events` and `routePathnames.games`. No locale string is assembled by hand. The information path does not link anywhere while the channel list is empty. When a channel exists, that path links to `#channels`.

## Accessibility

One `h1`. The two-path section is named “Percorsi di contatto” and its two choices are `h2` elements. Links and the quote button keep a 44px minimum. The hero frame is named as a graphic composition. No inert control is shown. Focus and reduced motion stay on the existing CSS. No new client component.

## Performance

Server-rendered. No form script, no map embed, no widget, no analytics and no new dependency.

## Privacy

This phase collects no personal data. There is no form, cookie, CAPTCHA, email API, database or webhook. The page does not claim GDPR or Swiss FADP compliance.

A future contact form, and the Phase 10 quote form, need a confirmed delivery path, a privacy notice reviewed for Swiss use, a stated purpose and retention period, and spam protection. None of that is implemented here.

## Tests

| Check | Result |
| --- | --- |
| Contact key parity | 38 keys, matched |
| `node --experimental-strip-types scripts/verify-contact.ts` | Passed. Production config is empty |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0, 28 localized URLs, against `http://127.0.0.1:3457` |

The server already listening on port 3457 was stopped on purpose before this build. The replacement started cleanly and is the server the checks used.

Headless Chrome, all four contact URLs, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920: no horizontal overflow, one `h1`, five `h2` elements, seven `h3` elements, no form, no image, one quote link in `main`, one Events link, one Games link, no `mailto:`, no `tel:`, and no sample address. No console errors were recorded. Screenshots: Italian at 390 and 768, German and French at 1440. A scrollbar makes the measured width slightly smaller than the window from 1024 upward. The Cursor IDE browser was not available.

## Known limitations

Direct contact channels are unpublished. The quote link opens a page whose form is not built. Metadata has no social image. A company address remains unpublished until it is explicitly confirmed.

## Phase 10

The Quote page can collect event date, place, guest count, event type, games and services only after a delivery path and a privacy notice exist. This contact page should keep its note that the form is not active until that work is live. Do not add a contact form in that phase unless the brief includes it.
