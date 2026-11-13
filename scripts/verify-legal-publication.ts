import assert from "node:assert/strict";
import fs from "node:fs";
import { legalContentPublished } from "../src/config/legal.ts";
import type { LegalRouteId } from "../src/i18n/routes.ts";
import {
  DRAFT_MARKER,
  isLegalRoutePublic,
  isLegalRoutePublicFrom,
  legalCopyIsPublishable,
} from "../src/lib/legal/publication.ts";

const locales = ["it", "de", "fr", "en"] as const;
const routeIds = ["privacy", "cookies", "legalNotice"] as const satisfies readonly LegalRouteId[];
const messages = Object.fromEntries(
  locales.map((locale) => [locale, JSON.parse(fs.readFileSync(`src/messages/${locale}.json`, "utf8"))]),
);

function markerCount(doc: { sections?: { paragraphs?: string[]; items?: string[] }[] }): number {
  return (doc.sections ?? []).reduce((total, section) => {
    const texts = [...(section.paragraphs ?? []), ...(section.items ?? [])];
    return total + texts.reduce((count, text) => count + text.split(DRAFT_MARKER).length - 1, 0);
  }, 0);
}

const expectedMarkers = { privacy: 15, cookies: 3, legalNotice: 8 } as const;

for (const routeId of routeIds) {
  assert.equal(legalContentPublished[routeId], false);
  assert.equal(isLegalRoutePublic(routeId), false);
  const counts = locales.map((locale) => {
    const legal = messages[locale].Legal;
    assert.equal(legal.public, undefined);
    assert.equal(typeof legal.draftNotice, "string");
    assert.equal(legal.draftNotice.includes(DRAFT_MARKER), true);
    const doc = legal[routeId];
    assert.equal(Array.isArray(doc.sections), true);
    return markerCount(doc);
  });
  assert.equal(counts[0], expectedMarkers[routeId]);
  assert.deepEqual(counts, [counts[0], counts[0], counts[0], counts[0]]);
}

assert.equal(
  messages.it.Legal.privacy.sections[0].paragraphs[0].includes("Questa bozza descrive"),
  true,
);

const clean = {
  title: "Fixture privacy title",
  summary: "Fixture summary that is not a production legal text.",
  sections: [{ title: "Fixture scope", paragraphs: ["Fixture paragraph kept out of the site."] }],
};
const withMarker = {
  ...clean,
  sections: [{ title: "Fixture scope", paragraphs: [`Fixture ${DRAFT_MARKER} paragraph.`] }],
};
const flags = { privacy: true, cookies: true, legalNotice: true };
const fourClean = locales.map(() => ({ Legal: { public: { privacy: clean, cookies: clean, legalNotice: clean } } }));
const oneMarked = fourClean.map((entry, index) =>
  index === 2 ? { Legal: { public: { privacy: withMarker, cookies: clean, legalNotice: clean } } } : entry,
);

assert.equal(legalCopyIsPublishable(clean), true);
assert.equal(legalCopyIsPublishable(withMarker), false);
assert.equal(legalCopyIsPublishable({ ...clean, title: "" }), false);
assert.equal(legalCopyIsPublishable({ ...clean, summary: "" }), false);
assert.equal(legalCopyIsPublishable({ ...clean, sections: [] }), false);
assert.equal(isLegalRoutePublicFrom("privacy", flags, fourClean), true);
assert.equal(isLegalRoutePublicFrom("privacy", { ...flags, privacy: false }, fourClean), false);
assert.equal(isLegalRoutePublicFrom("privacy", flags, oneMarked), false);
assert.equal(isLegalRoutePublicFrom("cookies", flags, oneMarked), true);

const documentSource = fs.readFileSync("src/components/legal/legal-document.tsx", "utf8");
assert.equal(documentSource.includes("data-legal-draft"), false);
assert.equal(documentSource.includes("draftNotice"), false);
assert.equal(documentSource.includes(DRAFT_MARKER), false);
assert.equal(documentSource.includes('data-legal-status="unpublished"'), true);
assert.equal(documentSource.includes('data-legal-status="published"'), true);

console.log("verify:legal-publication ok");
