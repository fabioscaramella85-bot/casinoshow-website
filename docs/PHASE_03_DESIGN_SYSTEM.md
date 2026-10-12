# Phase 03 — Swiss premium design system and responsive foundation

## Status

COMPLETE. This phase adds the visual foundation: tokens, typography, layout primitives, header, mobile navigation, footer, and a shared placeholder scaffold on the seven existing commercial pages.

Routing, localized pathnames, the seven-page sitemap, and the `next-intl` setup from Phase 02 are unchanged. No homepage hero, marketing copy, photographs, gallery, quote form, or legal routes were added. No commit, remote, or deployment was created.

## Design tokens

Tokens live in `src/app/globals.css` inside Tailwind CSS 4 `@theme inline`. Components use the generated utilities (`bg-midnight`, `text-brand-red`, `border-line-on-dark`) instead of raw hex values.

| Token | Value | Role |
| --- | --- | --- |
| `--color-midnight` | `#101114` | Header, footer, dark sections |
| `--color-ivory` | `#F5F2EB` | Page background and light sections |
| `--color-graphite` | `#25272B` | Raised dark cards and the mobile panel |
| `--color-brand-green` | `#127A2E` | Wordmark “SHOW” and brand accent |
| `--color-brand-red` | `#B1121B` | Primary commercial CTA |
| `--color-brand-red-hover` | `#8E0E16` | Primary hover and active |
| `--color-brand-gold` | `#C6A66B` | Eyebrows, dividers, and active marks on dark surfaces |
| `--color-gold-ink` | `#5C4314` | Same gold role on ivory, where `#C6A66B` fails small-text contrast |
| `--color-surface-dark` | `#101114` | Dark section surface |
| `--color-surface-raised` | `#25272B` | Dark card surface |
| `--color-surface-light` | `#F5F2EB` | Light section surface |
| `--color-surface-muted` | `#E7E1D6` | Reserved supporting ivory |
| `--color-text-on-dark` | `#F5F2EB` | Primary text on dark |
| `--color-text-muted-on-dark` | `#D4CFC4` | Secondary text on dark |
| `--color-text-on-light` | `#101114` | Primary text on light |
| `--color-text-muted-on-light` | `#3D4046` | Secondary text on light |
| `--color-line-on-dark` | `rgb(245 242 235 / 0.16)` | Borders on dark |
| `--color-line-on-light` | `rgb(16 17 20 / 0.12)` | Borders on light |
| `--color-focus-ring` | `#C6A66B` | `:focus-visible` outline |
| `--radius-sm` | `2px` | Buttons and cards |
| `--shadow-card` | `0 16px 40px rgb(16 17 20 / 0.08)` | Light cards |
| `--shadow-header` | `0 10px 30px rgb(16 17 20 / 0.28)` | Sticky header after scroll |
| `--container-max` | `80rem` (1280px) | Content width |
| `--spacing-section` | `clamp(3.5rem, 2rem + 4vw, 6.5rem)` | Section padding |
| `--ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Shared easing |
| `--duration-fast` | `150ms` | Color and icon transitions |
| `--duration-base` | `220ms` | Card and header transitions |

`#C6A66B` on ivory is about 2:1, so small gold text and the light-surface divider use `#5C4314`. Gold on midnight is used only for eyebrows, dividers, and the active underline. Body copy stays ivory or midnight. White on `#B1121B` is the primary button pair. `#127A2E` on midnight is used at `text-xl` / semibold on the wordmark so it stays in the large-text contrast range.

## Typography

`src/app/fonts.ts` loads Playfair Display (500, 600, 700) and Montserrat (400, 500, 600, 700) through `next/font/google`, with `latin` and `latin-ext` subsets and `display: "swap"`. The variables `--font-playfair` and `--font-montserrat` are applied on `<html>`.

| Utility | Family | Size | Use |
| --- | --- | --- | --- |
| `type-display` | Playfair | `clamp(2.5rem, 1.5rem + 3vw, 4.75rem)` | Reserved for a later hero |
| `type-h1` | Playfair | `clamp(2rem, 1.35rem + 2vw, 3.25rem)` | Page title |
| `type-h2` | Playfair | `clamp(1.625rem, 1.25rem + 1.1vw, 2.25rem)` | Section title |
| `type-h3` | Playfair | `clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)` | Card title |
| `type-h4` | Montserrat | `clamp(1.0625rem, 1rem + 0.25vw, 1.25rem)` | Minor heading |
| `type-body-lg` | Montserrat | `clamp(1.0625rem, 1rem + 0.2vw, 1.25rem)` | Intro copy |
| `type-body` | Montserrat | `1rem` / 1.65 | Body |
| `type-small` | Montserrat | `0.875rem` | Legal and meta |
| `type-eyebrow` | Montserrat | `0.75rem`, uppercase, 0.18em tracking | Eyebrows |
| `type-nav` | Montserrat | `0.8125rem`, uppercase, 0.06em tracking | Navigation |
| `type-button` | Montserrat | `0.8125rem`, uppercase, 0.08em tracking | Buttons |

Body copy is 16px. Headings are fluid and use a tight but readable line height so they do not overflow a 320px screen.

## Components

Primitives live in `src/components/ui/`. They are server components. Client components are limited to scroll state and the mobile menu.

| Component | API | Notes |
| --- | --- | --- |
| `Container` | `children`, `className` | `max-w` 80rem, padding `px-4 sm:px-6 lg:px-8` |
| `Section` | `tone` `light` \| `dark`, `id`, `labelledBy` | Full-bleed surface, fluid vertical padding |
| `SectionHeading` | `eyebrow`, `title`, `description`, `tone`, `id` | Renders an `h2` |
| `Eyebrow` | `children`, `tone`, `id` | Gold on dark, gold-ink on light |
| `Divider` | `tone` | 64px rule, same gold pairing as the eyebrow |
| `Button` | `variant` `primary` \| `secondary` \| `light` \| `text`, `href`, `icon`, `disabled`, `ariaCurrent` | `href` renders a `next-intl` `Link`. Disabled stays a `<button>`. `text` adds an arrow. Minimum height 44px |
| `Card` | `title`, `description`, `tone`, `media`, `action` | `article` with an `h3`. Hover changes the border, not the layout |

`Button` always includes `inline-flex`. A later `hidden` class on the same element does not win, because Tailwind 4 resolves conflicting utilities by stylesheet order. Hide a button by wrapping it, as the desktop quote control does.

Shell components:

- `Wordmark` — “CASINO” in ivory or midnight, “SHOW” in Casino Green. No “.CH” and no emblem. Links home unless `linked={false}`.
- `HeaderFrame` — sticky midnight header. `data-scrolled` starts `false` so the server HTML matches the first client render, then a passive scroll listener adds the border and shadow after 8px.
- `MobileNav` — disclosure panel under the header.
- `SiteHeader`, `SiteFooter`, `SiteShell`, `LanguageSwitcher`, `CommercialPage`.

## Header

Desktop starts at `xl` (1280px): wordmark, centered primary navigation, language selector, red quote link. Below `xl`: wordmark, language selector, hamburger. The quote link stays in the menu at those widths.

Active links use `aria-current="page"` and a gold inset underline, not color alone. Hover and `:focus-visible` are visible. The focus ring is a 2px gold outline with a 3px offset.

At 1280px the German and French uppercase labels fit on one row. Measured client width was 1265px because of the scrollbar. French “Jeux et services” left about 24px between the nav and the language cluster. The header stays one row (69px) from 768px upward.

At 390px and 320px the wordmark and the control cluster wrap onto two rows. The header is about 103px. Nothing overflows horizontally. Language controls stay 44px squares.

## Mobile navigation

`MobileNav` is a disclosure, not a modal.

- The button exposes `aria-expanded`, `aria-controls`, and a localized name (`Menü öffnen` / `Menü schliessen`, and the Italian, French, and English equivalents).
- The panel uses the `hidden` attribute while closed, so its links are not tabbable.
- Escape closes the panel and returns focus to the button.
- A pathname change closes the panel after the first render, so opening the menu does not immediately collapse it.
- The panel is full width, anchored under the header, on graphite.
- The quote link is a full-width primary button inside the panel.
- The desktop nav is `hidden` until `xl`. The mobile control is `xl:hidden`.
- `prefers-reduced-motion: reduce` collapses transition duration globally.

There is no focus trap. Tab can leave the panel into the page. That is intentional for a disclosure that does not cover the page with a backdrop.

## Language selector

`LanguageSwitcher` is unchanged in contract. The first `nav[data-language-switcher="true"]` still contains exactly four `next-intl` links, one per locale, with `hrefLang`, `lang`, an endonym `aria-label`, and `aria-current="true"` on the active locale. Locale changes go through the `locale` prop on `Link`, which keeps the semantic page and the localized slug.

The same control is rendered in the header and again in the footer. The route verifier reads the first one, in the header.

Checked in the browser: `/de/galerie` → Français → `/fr/galerie`.

## Footer

Midnight background. Contents: wordmark, localized brand line, the six primary links, the quote button, a second language selector, a legal label plus the existing legal sentence, and `© {year} Casino Show` from `new Date().getFullYear()` at build time.

The legal block is two paragraphs. It does not link to pages that do not exist. No address, phone, email, registration number, VAT number, or social profiles were added.

## Responsive rules

- Content width is 1280px with fluid side padding.
- Sections are full-bleed. The shell `main` does not cap their width.
- Comfortable measurements: no horizontal overflow at 320, 390, 768, 1280, and 1440. Sections and the footer match the layout viewport at 768 and 390.
- Cards stack on small screens and sit in a row from the `md` grid used by the scaffold.
- Navigation labels stay `whitespace-nowrap`. The breakpoint, not shrinking the type, absorbs German and French length.

## Accessibility

- Landmarks: `header`, `nav` (primary, language, footer), `main`, `footer`.
- One `h1` per commercial page, then `h2` section titles and `h3` card titles.
- Skip link to `#main`.
- Visible `:focus-visible` on interactive elements.
- Touch targets are at least 44px for nav links, language options, the menu button, and buttons.
- Closed menu links are removed from the accessibility tree.
- Reduced motion is respected through a global media query.
- No keyboard trap in the menu.

## Motion

CSS only. No Framer Motion and no scroll library. Used for button color, the text-link arrow, card border, header shadow, and the wordmark is static. Hover does not translate cards.

## Placeholder pages

`CommercialPage` still renders the existing dictionary `h1` and description as direct text, so `verify:routes` keeps passing. Around that it shows an ivory intro, a dark section with three dark cards, and a light section with three light cards. Card and section strings come from `Scaffold` keys and say the area is reserved. They are not commercial claims.

## Files

Created:

- `src/app/fonts.ts`
- `src/components/ui/container.tsx`
- `src/components/ui/section.tsx`
- `src/components/ui/section-heading.tsx`
- `src/components/ui/eyebrow.tsx`
- `src/components/ui/divider.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/wordmark.tsx`
- `src/components/header-frame.tsx`
- `src/components/mobile-nav.tsx`
- `docs/PHASE_03_DESIGN_SYSTEM.md`

Modified:

- `src/app/globals.css`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/not-found.tsx`
- `src/app/global-not-found.tsx`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/site-shell.tsx`
- `src/components/site-header` language control styling in `src/components/language-switcher.tsx`
- `src/components/commercial-page.tsx`
- `messages/it.json`
- `messages/de.json`
- `messages/fr.json`
- `messages/en.json`

Dictionary additions are shell strings (brand line, menu labels, legal title, copyright) and scaffold placeholders. Existing page headings and descriptions were left as Phase 02 wrote them. `Nav.about` in English is “About Us”; the page `h1` remains “About”.

## Dependencies

None added. Fonts come from `next/font`. The existing audit warnings from Phase 01 were not changed.

## Tests

Executed after the desktop quote-button visibility fix:

| Check | Result |
| --- | --- |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages, proxy registered |
| `npm run verify:routes` | Exit 0 against `http://127.0.0.1:3457` — 28 URLs, root redirect, 404s, sitemap |

Browser, production server on port 3457:

| Check | Result |
| --- | --- |
| 1440px German `/de/events` | One-row header, no overlap, no overflow, hamburger hidden |
| 1280px German `/de/events` | Same, about 24px between nav and controls |
| 1440px and 1280px French `/fr/jeux-services` | One-row header, “Demander un devis” visible, no overlap, no overflow |
| 768px French `/fr/jeux-services` | Hamburger visible, desktop nav `display: none`, header 69px, sections full width, no overflow |
| 390px German | Menu opens (`aria-expanded`, “Menü schliessen”), Escape closes and restores focus, Galerie navigates to `/de/galerie` and closes the menu, Français goes to `/fr/galerie`, no overflow |
| 320px French | No element wider than the viewport. Header wraps to two rows |
| Footer at 390px French | Brand line, nav, quote link, language links, legal text without a legal URL, copyright 2026 |
| Closed menu | Panel `hidden`, links absent from the accessibility tree |

A console hook for hydration errors did not stay attached: reloading the instrumented tab closed it. The interactive session showed no hydration mismatch. The menu starts collapsed, matching the server render, and `HeaderFrame` starts with `data-scrolled="false"`.

## Known limitations

- The graphic logo asset is still a typographic placeholder.
- Legal routes are not built. The footer states that they will be published there.
- Placeholder scaffold copy is not page content.
- Below roughly 400px the header uses two rows so the 44px language targets can remain.
- The mobile menu does not trap focus.
- Desktop navigation is dense at 1280px in German and French. It fits; it should be rechecked if labels get longer.
- `Button` cannot be hidden with a `hidden` utility on the same node. Wrap it.
- Pre-existing npm warnings remain: unknown `devdir` config, ESLint 9 deprecation notice, and the high-severity audit findings recorded in Phase 01. They were not “fixed”.
- The copyright year is the year of the production build.

## Phase 04

Do not start it from this phase. The next authorized phase should compose the real pages on this foundation: homepage structure first, then the other six pages, once copy and photography are approved. Keep legal pages, the quote form, and the production gallery out of that work unless a later brief includes them.
