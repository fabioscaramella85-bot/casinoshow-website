import assert from "node:assert/strict";
import {
  contactDetails,
  enabledContactChannels,
  type ContactDetails,
} from "../src/config/contact.ts";

assert.equal(contactDetails.email, null);
assert.equal(contactDetails.phone, null);
assert.equal(contactDetails.whatsapp, null);
assert.equal(contactDetails.address, null);
assert.deepEqual(contactDetails.socialProfiles, []);
assert.deepEqual(enabledContactChannels(), []);

const sample: ContactDetails = {
  email: " desk@example.test ",
  phone: "+41 79 000 00 00",
  whatsapp: "+41 79 000 00 01",
  address: null,
  socialProfiles: [],
};

assert.deepEqual(enabledContactChannels(sample), [
  { id: "email", href: "mailto:desk@example.test", value: "desk@example.test" },
  { id: "phone", href: "tel:+41790000000", value: "+41 79 000 00 00" },
  { id: "whatsapp", href: "https://wa.me/41790000001", value: "+41 79 000 00 01" },
]);

assert.deepEqual(
  enabledContactChannels({
    email: "   ",
    phone: null,
    whatsapp: null,
    address: null,
    socialProfiles: [],
  }),
  [],
);

const published = JSON.stringify(contactDetails);
assert.equal(published.includes("@"), false);
assert.equal(published.includes("casinoshow.ch"), false);

console.log("Contact configuration checks passed");
