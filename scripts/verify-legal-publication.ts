import assert from "node:assert/strict";
import fs from "node:fs";
import { legalContentPublished } from "../src/config/legal.ts";
import { messagesForClient } from "../src/i18n/public-messages.ts";
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

const expectedDraftMarkers = { privacy: 15, cookies: 3, legalNotice: 8 } as const;
const expectedPublicSections = { privacy: 12, cookies: 3, legalNotice: 6 } as const;

for (const routeId of routeIds) {
  assert.equal(legalContentPublished[routeId], true);
  assert.equal(isLegalRoutePublic(routeId), true);
  const counts = locales.map((locale) => {
    const legal = messages[locale].Legal;
    assert.equal(typeof legal.draftNotice, "string");
    assert.equal(legal.draftNotice.includes(DRAFT_MARKER), true);
    const doc = legal[routeId];
    assert.equal(Array.isArray(doc.sections), true);
    const prepared = legal.public[routeId];
    assert.equal(prepared.sections.length, expectedPublicSections[routeId]);
    assert.equal(prepared.title.includes(DRAFT_MARKER), false);
    assert.equal(prepared.summary.includes(DRAFT_MARKER), false);
    const serialized = JSON.stringify(prepared);
    assert.equal(serialized.includes("CHE-139.225.071"), routeId !== "cookies");
    assert.equal(serialized.includes("Via Carona 47"), routeId !== "cookies");
    return markerCount(doc);
  });
  assert.equal(counts[0], expectedDraftMarkers[routeId]);
  assert.deepEqual(counts, [counts[0], counts[0], counts[0], counts[0]]);
}

for (const locale of locales) {
  const prepared = messages[locale].Legal.public;
  assert.equal(markerCount(prepared.privacy), 0);
  assert.equal(markerCount(prepared.cookies), 0);
  assert.equal(markerCount(prepared.legalNotice), 0);
  assert.equal(legalCopyIsPublishable(prepared.privacy), true);
  assert.equal(legalCopyIsPublishable(prepared.cookies), true);
  assert.equal(legalCopyIsPublishable(prepared.legalNotice), true);
  const client = JSON.stringify(messagesForClient(messages[locale]));
  assert.equal(client.includes("Via Carona 47"), false);
  assert.equal(client.includes("CHE-139.225.071"), false);
  assert.equal(client.includes(DRAFT_MARKER), false);
}
assert.equal(JSON.stringify(messages.de.Legal.public).includes("ß"), false);
const internalPublicLanguage = [
  /repository/i,
  /dépôt/,
  /\bcodice\b/i,
  /\bDer Code\b/,
  /im Code/,
  /\bthe code\b/i,
  /CLI/,
];
for (const locale of locales) {
  const prepared = JSON.stringify(messages[locale].Legal.public);
  for (const pattern of internalPublicLanguage) {
    assert.equal(pattern.test(prepared), false, `${locale} public copy matches ${pattern}`);
  }
  assert.equal(prepared.includes("infofuncasino@gmail.com"), true);
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
