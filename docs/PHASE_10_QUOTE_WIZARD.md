# Phase 10 — Quote wizard

## Status

COMPLETE. The Quote scaffold is now a three-step request on the existing routes. Sending is not active. No new commercial route was added.

No personal data is transmitted, stored or logged. There is no success state and no send button.

## Page structure

Routes stay `/it/preventivo`, `/de/angebot-anfordern`, `/fr/demander-un-devis` and `/en/request-a-quote`.

1. Hero — one `h1` from `Pages.quote.heading`, a short support line, and a notice that sending will be available soon and that what is typed stays on the page. The media is a named graphic composition.
2. Wizard — progress, the current step, and back / continue controls. The form is centred at `max-w-3xl`.

Step titles are `h2`. The summary and the privacy note on step 3 are `h3`.

| Step | Italian title | Role |
| --- | --- | --- |
| 1 | Partiamo dal tuo evento | Event type, locality, date or undecided, guest range, optional duration |
| 2 | Come immagini l'esperienza? | Experiences of interest, optional objective, optional notes |
| 3 | Quasi fatto | Summary, contact details, preference, privacy note, sending notice |

The Italian support lines are the editorial source: “Anche se non hai ancora deciso tutto, puoi iniziare da qui.” and “Seleziona ciò che ti interessa. La proposta definitiva sarà definita in base al tuo evento.”

## Components

```text
src/components/quote/
  quote-page.tsx
  quote-hero.tsx
  quote-wizard.tsx
  quote-progress.tsx
  quote-step-event.tsx
  quote-step-experience.tsx
  quote-step-contact.tsx
  quote-option-card.tsx
  quote-summary.tsx
  quote-field.tsx
  quote-submission-notice.tsx
src/lib/quote/
  types.ts
  validation.ts
  submission.ts
```

`quote-page.tsx` and `quote-hero.tsx` are server components. The wizard, steps, cards, fields, summary and notice are client components. State lives in `QuoteWizard` only.

`Button` now accepts `onClick` so back, continue and edit can reuse it. Those buttons are `type="button"`.

## Data model

`QuoteDraft` in `src/lib/quote/types.ts` holds stable IDs. Labels stay in the `Quote` messages.

| Field | Stored value |
| --- | --- |
| eventType | `corporate`, `dinner`, `wedding`, `private`, `gala`, `other` |
| eventLocation | trimmed text, max 120 |
| eventDate | `YYYY-MM-DD`, or empty |
| dateUndecided | boolean |
| guestRange | `up-to-30`, `30-60`, `60-100`, `100-200`, `over-200`, `unsure` |
| duration | `up-to-2`, `2-4`, `over-4`, `unsure`, or empty |
| experiences | zero or more of `casino-party`, `roulette`, `blackjack`, `poker`, `dice`, `wheel-of-fortune`, `selfie-mirror`, `experience-360`, `other-games`, `recommendation` |
| eventObjective | `team`, `entertainment`, `clients`, `dinner`, `celebration`, `other`, or empty |
| additionalNotes | text, max 1000 |
| firstName, lastName | text, max 80 |
| email | max 120 |
| phone | max 30 |
| company | optional, max 120 |
| contactPreference | `email`, `phone`, `whatsapp`, `none` |

Dates are not stored in a localised display string. The summary formats `YYYY-MM-DD` with `Intl.DateTimeFormat` (`it-CH`, `de-CH`, `fr-CH`, `en-GB`) from the calendar parts, so the day does not shift with UTC.

Guest ranges and durations are estimates. They are not prices and not a confirmed length of service. `casino-party` is a request for a coordinated proposal, not a package. Selected experiences are interest, not a booking, and the copy does not claim that every service is available in every place.

## Wizard state

React state only: the draft, the current step, the furthest step reached, and the current errors.

- Continue validates the current step, then advances.
- Back, and the summary edit actions, return without validating and keep the draft.
- A progress step that has never been reached is disabled.
- Moving forward revalidates every step in between, so a cleared required field cannot be skipped.
- The form uses `noValidate`. Enter on step 1 or 2 continues. Enter on step 3 runs contact validation and does not send. A valid step 3 leaves the notice in place and shows no success.
- Changing language remounts the wizard (`key` is the locale). The draft is cleared. It is not written to `localStorage` or `sessionStorage`. A line above the progress says so.

## Validation

`validateQuoteStep(draft, step, todayIso)` returns `{ ok: true }` or `{ ok: false, errors, firstField }`. Message values are keys, not Italian sentences. The same function can later be called on a server without the React tree.

Step 1 requires an event type, a locality, a guest range, and a date unless “undecided” is checked. A date must be a real calendar day on or after the local today. Past dates are rejected. Duration is optional and can be cleared by activating the selected card again.

Step 2 does not require an experience or an objective. Unknown IDs fail. Notes over 1000 characters fail.

Step 3 requires first name, last name, a simple email, a telephone number and a contact preference. The telephone may be Swiss or international: optional leading `+`, digits, spaces and `()/. -`, with 8 to 15 digits. A Swiss prefix is not required. Company is optional. No postal address is collected.

On failure the wizard shows an error summary (`role="alert"`), marks the fields, and moves focus to the first invalid control.

## Localization

Italian is the source. German uses Swiss spelling. The `Quote` object was checked for `ß` and contains none. French is written for a Swiss reader (`valable`, `septante` is not needed here). English uses international spelling (`organisation` in the wedding line).

The four `Quote` dictionaries share 128 leaf keys. `Pages.quote` is the `h1` and the meta description.

| Locale | Path | Title (`h1`) |
| --- | --- | --- |
| it | `/it/preventivo` | Raccontaci il tuo evento |
| de | `/de/angebot-anfordern` | Erzählen Sie uns von Ihrem Anlass |
| fr | `/fr/demander-un-devis` | Racontez-nous votre événement |
| en | `/en/request-a-quote` | Tell us about your event |

The navigation label stays “Richiedi un preventivo” / “Angebot anfordern” / “Demander un devis” / “Request a Quote”.

## SEO metadata

The existing helper supplies title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image and no review schema. The sitemap is unchanged. Each quote URL has one `h1`.

## Accessibility

Native radios and checkboxes sit inside labels. The visible word “Selezionato” is `aria-hidden`; the control state is what a screen reader uses. The selected card also inverts to ivory on midnight, so the state is not colour alone. Optional duration and objective cards can be cleared.

Progress is an ordered list. The current step has `aria-current="step"`. Future steps are disabled buttons.

Fields use `label for`, `aria-invalid` and `aria-describedby`. Required and optional are written out. Autocomplete is `address-level2`, `given-name`, `family-name`, `email`, `tel` and `organization`.

Focus rings use midnight on the light surface. After a step change, focus moves to the step heading. After an error, focus moves to the first invalid field. Scroll uses `prefers-reduced-motion`. The button arrow already disables its shift under reduced motion.

Touch targets use `min-h-11`.

A screen reader pass and a full tab walk of every card were not run. The browser check did confirm label association, the error summary, and focus on the first invalid field.

## Responsive behaviour

Headless Chrome checked all four quote URLs at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920. No horizontal overflow. From 1024 upward the scrollbar makes the measured width slightly smaller (1009, 1265, 1425, 1905). Progress is one column below `sm` and three columns from there, so long French and German labels have a full row on a narrow screen. Option cards are one column, two from `sm`.

Screenshots of the Italian page at 390 and 768, and the German and French pages at 1440, were reviewed. The step 3 screenshot at 390 shows the summary (wedding, Lugano, undecided date, 30 to 60 guests, roulette and poker, celebration, the terrace note) and the start of the contact fields.

## Privacy

The privacy area is an identified note, not a checkbox and not a link. The published text says the notice is under legal review, is not an approved legal text, does not activate sending, and does not present consent as the only legal basis. Fun Casino privacy copy was not used. No GDPR or Swiss FADP compliance is claimed.

The contact page note now says the quote page can be prepared and that sending is not active. It does not say a request can already be transmitted. No telephone number was added.

## Submission architecture

`quoteSubmissionStatus()` returns `"unconfigured"`. `canTransmitQuote()` returns `false`. The type also names `ready`, `submitting`, `success` and `error` for a later adapter. Nothing in the module returns those values.

The notice, in Italian: “Il servizio di invio delle richieste sarà disponibile a breve.” The same meaning is published in German, French and English, in the hero and again on step 3. There is no send button and no “request sent” view.

There is no verified email or telephone, so the disabled state has no `mailto:` or `tel:` fallback. No address was invented.

The wizard does not call `fetch`, does not write storage, and does not log the draft.

## Activation requirements

Sending stays off until all of the following exist:

- An approved privacy notice, and a decision on whether a checkbox is required
- A verified delivery channel
- A server endpoint that validates the same draft independently
- Rate limiting, spam protection and abuse handling
- A retention rule and access control
- Secure transport and an error path that does not claim success when delivery failed

Until then, `quoteSubmissionStatus()` must stay `"unconfigured"`.

## Testing

- `npm run lint` — exit 0
- `npx tsc --noEmit` — exit 0
- `npm run build` — exit 0, 32 static pages
- `npm run verify:routes` — 28 URLs, root redirect, 404s and sitemap, against `http://127.0.0.1:3457`
- `node --experimental-strip-types --import ./scripts/quote-node-loader.mjs scripts/verify-quote.ts` — fixture only. Covers missing step 1, undecided date, today, past date, 31 February, telephone length, Swiss and international numbers, email, optional experiences, unknown IDs, note length, contact fields, preference, and the unconfigured adapter. The fixture is not transmitted.
- Headless Chrome — layout at the nine widths, wizard behaviour on `/it/preventivo` with synthetic values (`Ada`, `Lovelace`, `ada@example.test`, `+41 79 000 00 00`), edit back to step 1, contact errors, no success after a valid step 3, language switch to `/de/angebot-anfordern` with an empty draft, contact-page note, and network log of 38 requests, all GET or HEAD to `127.0.0.1`, none external.

The listener that was already on port 3457 was stopped on purpose so the production build could replace `.next`. That process ended with Windows status `4294967295`. The replacement server was started afterwards and is the one the route and browser checks used.

No Lighthouse run was made. The quote routes are statically generated, and the browser console showed no hydration error during the checks.

## Known limitations

- Sending is intentionally unavailable.
- A language change clears the draft.
- Step 3 has no control labelled as send. Validation on that step runs when the form submit event fires.
- Optional experiences can be left empty.
- The privacy sentence is a pending design note, not a legal text.
- Reduced motion is implemented in code and was not emulated in Chrome.
- A screen reader was not used.
