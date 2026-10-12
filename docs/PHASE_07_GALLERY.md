# Phase 07 — Premium multilingual photo gallery

## Status

COMPLETE as a gallery architecture. No approved event photograph was available, so the production page publishes none. The manifest, filters, grid, lightbox and homepage preview are implemented and stay idle until a real file is added. No stock image and no generated photograph was used.

## Page structure

The four existing routes are unchanged: `/it/gallery`, `/de/galerie`, `/fr/galerie`, `/en/gallery`.

1. Hero — one `h1`, support line, an honest lead that says no photograph is published, and a graphic frame. The frame is named as a composition, not as a photo.
2. Introduction — the page is ready to show tables, guest interaction and the tone of a casino-themed event. It does not invent dates, clients or stories.
3. Selection — with an empty manifest this is the empty state, not a filter bar. Filters, the count and the grid render only after at least one approved photograph is in the manifest.
4. Final call to action — closing headline and the existing quote link. The form is not built.

The hero support follows the Italian direction without the verb “scopri”, because that would imply the pictures are already there.

## Components

```text
src/components/gallery/
  gallery-page.tsx
  gallery-hero.tsx
  gallery-introduction.tsx
  gallery-empty-state.tsx
  gallery-browser.tsx
  gallery-filters.tsx
  gallery-grid.tsx
  gallery-image-card.tsx
  gallery-lightbox.tsx
  gallery-final-cta.tsx
src/data/gallery.ts
```

Hero, introduction, empty state and final call to action are server components. `GalleryBrowser` is loaded with `next/dynamic` and is not rendered while the manifest is empty, so the filter and lightbox script is not part of the empty page. Filters, grid, card and lightbox are client components.

## Image manifest

`galleryPhotos` in `src/data/gallery.ts` is the only list. It is empty. Each future record needs:

- stable slug `id`
- `src` under `/images/gallery/`, as webp, avif or jpeg
- intrinsic `width` and `height` (at least 1200 by 900)
- one or more category ids, never `all`
- alt text in Italian, German, French and English
- optional caption in all four languages
- optional credit
- optional `featured` flag for the homepage
- `rightsStatus: "approved"`

`assertGalleryManifest` runs when the module loads. A bad record fails the build. It rejects duplicate ids, duplicate paths, unknown categories, a repeated category, missing alt or caption text, an empty credit and any rights status other than approved.

Filenames are not used as captions.

## Category taxonomy

Internal ids, not translated:

`all`, `roulette`, `blackjack`, `poker`, `atmosphere`, `corporate`, `weddings-private`, `casino-party`, `wheel-of-fortune`, `dice`, `selfie-mirror`, `experience-360`.

Labels live in `Gallery.filters.items`. A photograph may carry several ids. `all` shows every approved image once. Another category shows the images that include that id. An empty category shows a localized status and no fabricated card. The visible count uses a plural message and is omitted when the gallery itself is empty, so the page never shows a fake zero.

## Filter behavior

One category is active at a time. The controls are buttons with `aria-pressed`, in a group, and they wrap. Text stays at the small body size with a 44px minimum height. Changing the category closes the lightbox, because the open sequence is the filtered list.

## Lightbox behavior

The lightbox is a native `<dialog>` opened with `showModal()`.

- Thumbnail click or keyboard activation opens it.
- Close, previous and next are named buttons. Previous is disabled on the first image. Next is disabled on the last. The sequence does not wrap.
- Escape cancels the dialog and closes it.
- Arrow keys move inside the filtered list and do not move past either end.
- A horizontal swipe of at least 48px moves previous or next.
- On open, focus moves to Close. On close, focus returns to the thumbnail.
- The dialog locks body scrolling. The browser top layer blocks the page behind it.
- The large image uses `next/image` with `object-contain` and `loading="eager"`. Thumbnails use `fill`, `object-cover` and the default lazy load. Nothing is preloaded.
- A caption is shown when the record has one. A credit line is shown when the record has one.
- With an empty manifest the dialog is not mounted.

## Translation strategy

Italian is the source. German uses Swiss spelling, without ß (`Schliessen`, `Vergrösserte`). French is written for a Swiss reader. English stays plain.

`Pages.gallery.heading` is the only `h1` and the document title. `Pages.gallery.description` is the meta description. Visible copy is under `Gallery`. Per-image alt text and captions live on the manifest, with the file, rather than in the shared dictionary.

Homepage strings `gallery.readyTitle` and `gallery.readyDescription` are used only when the preview has photographs. The current homepage still uses the existing “not published yet” copy.

## Homepage integration

`HomeGallery` reads `galleryPhotos`. Featured records come first, otherwise the first four in manifest order. Those records are not copied into a second list. With an empty manifest the four graphic frames stay. When photographs exist, the same records render through `next/image` in a 4:3 grid.

## Image import workflow

Put delivery files in `public/images/gallery/`. Keep camera originals out of the repository.

- Formats: WebP first, AVIF when the source is already efficient, JPEG if a browser-ready WebP is not available. The manifest rejects other extensions.
- Filename: lowercase slug, for example `roulette-table-01.webp`. No spaces. The filename is not a caption.
- Frame: 4:3. The grid crops with `object-cover`. The lightbox shows the whole frame with `object-contain`.
- Size: at least 1600 by 1200 pixels is the practical target. The checker requires 1200 by 900. Aim for a compressed file under about 400 KB. Do not commit multi-megabyte originals.
- Delivery: `next/image` builds the responsive set. Thumbnails declare `sizes` for one column under 375px, two columns from 375px, three from 768px and four from 1280px. The lightbox asks for up to 72rem.
- Alt text: one sentence in each language that could stand in for the picture. Do not repeat the caption. Do not name an event, a date or a client unless that fact is documented.
- Categories: one or more ids from the taxonomy. `featured: true` marks a homepage candidate. Four is the homepage limit.
- Rights: add the record only when use on casinoshow.ch is confirmed. Set `rightsStatus` to `approved` and fill `credit` when a credit is required. If rights are unclear, leave the file out and note it in the phase log. The logo files in `public/loghi/` are brand marks, not gallery photographs. `non usare.png` stays unused.
- Duplicates: the checker rejects a repeated id or a repeated path.
- Volume: below a few dozen images, one grid is enough. Past that, slice the filtered list in `GalleryBrowser` without a new route. Pagination is not built now, because the list is empty.

No image-processing package was installed.

## SEO metadata

The existing metadata helper supplies title, description, canonical URL, reciprocal hreflang and Open Graph text. There is no Open Graph image and no new structured data. The sitemap is unchanged.

| Locale | Path | Title (`h1`) |
| --- | --- | --- |
| it | `/it/gallery` | La nostra casino experience in immagini |
| de | `/de/galerie` | Unser Casino-Erlebnis in Bildern |
| fr | `/fr/galerie` | Notre expérience casino en images |
| en | `/en/gallery` | Our casino experience in pictures |

Heading order on the empty page: one `h1`, then an `h2` for the introduction, the empty state and the close. When photographs exist, the empty-state heading is replaced by the collection heading. Filter controls are not headings.

## Performance

Server sections carry the empty page. The interactive chunk loads only when the manifest has photographs. Thumbnails are lazy. The open lightbox image is eager and is not preloaded ahead of the click. Aspect boxes are fixed at 4:3 so the grid does not jump. No gallery image request is made today.

## Missing assets

Every photographic slot is empty:

- Hero photograph
- Roulette, blackjack, poker
- Croupiers and atmosphere
- Corporate events
- Weddings and private events
- Casino party
- Wheel of fortune, dice, selfie mirror, 360 experience
- Open Graph image

The files in `public/loghi/` were not used.

## Accessibility

One `h1`. Sections point at their `h2`. The empty page has no filter controls and no dialog, so it does not offer controls that do nothing. When photographs exist, filters are real buttons, the dialog is a modal, focus moves to Close and returns to the thumbnail, and the page behind the dialog does not scroll. Motion stays on the existing CSS transitions. The graphic frames that stand in for photographs are either named or hidden from assistive technology.

## Responsive decisions

- Hero copy comes first. The frame is 4:3, then 4:5 from `lg`.
- Empty state stacks, then splits into two columns from `lg`.
- Future grid: 1 column under 375px, 2 from 375px, 3 from 768px, 4 from 1280px. Crops stay 4:3.
- Filter labels wrap. They are not forced onto one line and they are not reduced below the small text size.

## Tests

| Check | Result |
| --- | --- |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Exit 0, 32 static pages |
| `npm run verify:routes` | Exit 0, 28 localized URLs, against `http://127.0.0.1:3457` |
| `node --experimental-strip-types scripts/verify-gallery.ts` | Passed |

The fixture script uses three synthetic records that are not in `galleryPhotos`. It checks the empty production list, the all-filter, a single category, a photograph that belongs to two categories, an empty category, first and last indexes, Escape, both arrow keys, a non-navigation key, homepage preview preference for `featured`, and rejection of bad ids, duplicates, logo paths, small dimensions, unknown categories, blank alt text, unapproved rights and an empty credit.

Headless Chrome against the production server, `/it/gallery`, `/de/galerie`, `/fr/galerie` and `/en/gallery`, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920: no horizontal overflow, one `h1`, three `h2` elements, no `img`, no `dialog`, no pressed filter, one quote link in `main`. No console errors were recorded. Screenshots: Italian at 390 and 768, German and French at 1440. A scrollbar makes the measured width slightly smaller than the window from 1024 upward. The Cursor IDE browser was not available.

The lightbox was not opened in the browser, because the production page has no photograph to activate it.

## Known limitations

The page does not yet show event photography. Filter layout and lightbox focus were not exercised on a populated page. Metadata is provisional and has no social image. About, contact and the quote form remain scaffolds. `scripts/verify-gallery.ts` is excluded from `tsconfig.json` so Node can import the manifest with a `.ts` extension.

## Next phase

The About page is the natural follow-up. Contact and the quote form stay out of that work unless a later brief includes them. Adding photographs is an import into this gallery, not a new route.
