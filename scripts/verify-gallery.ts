import assert from "node:assert/strict";
import {
  assertGalleryManifest,
  filterGalleryPhotos,
  galleryKeyAction,
  galleryPhotos,
  selectHomepagePreview,
  stepGalleryIndex,
  type GalleryPhoto,
  type GalleryPhotoCategory,
} from "../src/data/gallery.ts";

const text = {
  it: "Tavolo in sala",
  de: "Tisch im Saal",
  fr: "Table dans la salle",
  en: "Table in the room",
};

function photo(
  id: string,
  categories: GalleryPhotoCategory[],
  extra: Partial<GalleryPhoto> = {},
): GalleryPhoto {
  return {
    id,
    src: `/images/gallery/${id}.webp`,
    width: 1600,
    height: 1200,
    categories,
    alt: text,
    rightsStatus: "approved",
    ...extra,
  };
}

const roulette = photo("roulette-table", ["roulette", "corporate"]);
const poker = photo("poker-table", ["poker", "weddings-private"], { featured: true });
const wheel = photo("wheel-night", ["wheel-of-fortune", "casino-party"]);
const fixtures = [roulette, poker, wheel];

assert.equal(galleryPhotos.length, 0);
assert.equal(filterGalleryPhotos(fixtures, "all").length, 3);
assert.deepEqual(
  filterGalleryPhotos(fixtures, "roulette").map((item) => item.id),
  ["roulette-table"],
);
assert.deepEqual(
  filterGalleryPhotos(fixtures, "corporate").map((item) => item.id),
  ["roulette-table"],
);
assert.deepEqual(filterGalleryPhotos(fixtures, "dice"), []);
assert.equal(filterGalleryPhotos(fixtures, "all")[0], fixtures[0]);
assert.notEqual(filterGalleryPhotos(fixtures, "all"), fixtures);

assert.equal(stepGalleryIndex(0, -1, 3), 0);
assert.equal(stepGalleryIndex(2, 1, 3), 2);
assert.equal(stepGalleryIndex(1, 1, 3), 2);
assert.equal(stepGalleryIndex(1, -1, 3), 0);
assert.equal(stepGalleryIndex(0, 1, 0), 0);

assert.deepEqual(galleryKeyAction("Escape", 1, 3), { type: "close" });
assert.deepEqual(galleryKeyAction("ArrowRight", 1, 3), { type: "index", index: 2 });
assert.deepEqual(galleryKeyAction("ArrowLeft", 0, 3), { type: "index", index: 0 });
assert.deepEqual(galleryKeyAction("ArrowRight", 2, 3), { type: "index", index: 2 });
assert.deepEqual(galleryKeyAction("Enter", 1, 3), { type: "none" });

assert.deepEqual(selectHomepagePreview([]), []);
assert.deepEqual(
  selectHomepagePreview(fixtures).map((item) => item.id),
  ["poker-table"],
);
assert.deepEqual(
  selectHomepagePreview([roulette, wheel]).map((item) => item.id),
  ["roulette-table", "wheel-night"],
);

function rejects(sample: GalleryPhoto[]) {
  assert.throws(() => assertGalleryManifest(sample));
}

rejects([photo("Bad Id", ["dice"])]);
rejects([photo("same", ["dice"]), photo("same", ["poker"])]);
rejects([photo("shared", ["dice"], { src: "/images/gallery/other.webp" }), photo("other", ["poker"], { src: "/images/gallery/other.webp" })]);
rejects([photo("logo", ["dice"], { src: "/loghi/logo.png" })]);
rejects([photo("small", ["dice"], { width: 800 })]);
rejects([photo("none", [])]);
rejects([photo("unknown", ["tables" as GalleryPhotoCategory])]);
rejects([photo("repeat", ["dice", "dice"])]);
rejects([photo("blank-alt", ["dice"], { alt: { ...text, fr: "  " } })]);
rejects([photo("rights", ["dice"], { rightsStatus: "unknown" as "approved" })]);
rejects([photo("credit", ["dice"], { credit: "  " })]);
assert.doesNotThrow(() => assertGalleryManifest(fixtures));

const filtered = filterGalleryPhotos(fixtures, "poker");
assert.equal(galleryKeyAction("ArrowRight", 0, filtered.length).type, "index");
assert.equal(
  (galleryKeyAction("ArrowRight", 0, filtered.length) as { index: number }).index,
  0,
);

console.log("Gallery manifest checks passed");
