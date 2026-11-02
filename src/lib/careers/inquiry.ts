import type { CareersCv } from "./cv";
import type { CareerCountry, CareerExperience, CareersValues } from "./schema";

export type CareersInquiry = Omit<CareersValues, "country" | "experience" | "privacyConsent"> & {
  country: CareerCountry;
  experience: CareerExperience;
  privacyConsent: true;
  consentedAt: string;
  submittedAt: string;
  cv: CareersCv;
};
