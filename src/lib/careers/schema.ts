export const careerLocales = ["it", "de", "fr", "en"] as const;

export type CareerLocale = (typeof careerLocales)[number];

export const careerCountries = ["ch", "it", "fr", "de", "at", "other"] as const;
export const careerExperienceLevels = ["none", "lt1", "y1_3", "y3_5", "gt5"] as const;
export const careerGames = ["roulette", "blackjack", "poker", "other"] as const;
export const careerRegions = ["ticino", "german", "french", "all"] as const;
export const careerAvailability = ["weekdays", "weekend", "evening", "variable"] as const;
export const careerLanguages = ["it", "de", "fr", "en", "other"] as const;
export const careerCvExtensions = ["pdf", "doc", "docx"] as const;

export type CareerCountry = (typeof careerCountries)[number];
export type CareerExperience = (typeof careerExperienceLevels)[number];
export type CareerGame = (typeof careerGames)[number];
export type CareerRegion = (typeof careerRegions)[number];
export type CareerAvailability = (typeof careerAvailability)[number];
export type CareerLanguage = (typeof careerLanguages)[number];
export type CareerCvExtension = (typeof careerCvExtensions)[number];

export const careerLimits = {
  name: 80,
  email: 254,
  phone: 40,
  locality: 120,
  hospitality: 1500,
  presentation: 3000,
  filename: 60,
  cvBytes: 5 * 1024 * 1024,
} as const;

export const careerCvAccept =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const countrySet = new Set<string>(careerCountries);
const experienceSet = new Set<string>(careerExperienceLevels);
const gameSet = new Set<string>(careerGames);
const regionSet = new Set<string>(careerRegions);
const availabilitySet = new Set<string>(careerAvailability);
const languageSet = new Set<string>(careerLanguages);
const extensionSet = new Set<string>(careerCvExtensions);
const localeSet = new Set<string>(careerLocales);

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CareersValues = {
  locale: CareerLocale;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  locality: string;
  country: CareerCountry | "";
  birthDate: string;
  experience: CareerExperience | "";
  games: CareerGame[];
  hospitality: string;
  regions: CareerRegion[];
  availability: CareerAvailability[];
  languages: CareerLanguage[];
  presentation: string;
  privacyConsent: boolean;
};

export type CareersField =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "locality"
  | "country"
  | "birthDate"
  | "experience"
  | "games"
  | "hospitality"
  | "regions"
  | "availability"
  | "languages"
  | "presentation"
  | "cv"
  | "privacy";

export type CareersFieldErrors = Partial<Record<CareersField, string>>;

export function isCareerCountry(value: string): value is CareerCountry {
  return countrySet.has(value);
}

export function isCareerExperience(value: string): value is CareerExperience {
  return experienceSet.has(value);
}

export function isCareerGame(value: string): value is CareerGame {
  return gameSet.has(value);
}

export function isCareerRegion(value: string): value is CareerRegion {
  return regionSet.has(value);
}

export function isCareerAvailability(value: string): value is CareerAvailability {
  return availabilitySet.has(value);
}

export function isCareerLanguage(value: string): value is CareerLanguage {
  return languageSet.has(value);
}

export function isCareerLocale(value: string): value is CareerLocale {
  return localeSet.has(value);
}

export function isCareerCvExtension(value: string): value is CareerCvExtension {
  return extensionSet.has(value);
}

function stripControls(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function singleLine(value: string): string {
  return stripControls(value).replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

export function messageText(value: string): string {
  return stripControls(value).replace(/\r\n?/g, "\n").trim();
}

function ordered<T extends string>(allowed: readonly T[], selected: readonly string[]): T[] {
  const present = new Set(selected);
  return allowed.filter((item) => present.has(item));
}

function readList(formData: FormData, name: string): string[] {
  return formData.getAll(name).map((value) => singleLine(String(value)));
}

export function extensionOf(filename: string): string {
  const base = filename.split(/[/\\]/).pop() ?? "";
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.slice(index + 1).toLowerCase();
}

export function preliminaryCvError(file: File | null): string | null {
  if (!file || file.size === 0) {
    return "errors.cv";
  }
  if (file.size > careerLimits.cvBytes) {
    return "errors.cvSize";
  }
  if (!isCareerCvExtension(extensionOf(file.name))) {
    return "errors.cvType";
  }
  return null;
}

function plausibleBirthDate(iso: string, now = new Date()): boolean {
  const match = datePattern.exec(iso);
  if (!match) {
    return false;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return false;
  }
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  if (date.getTime() > today) {
    return false;
  }
  return year >= now.getUTCFullYear() - 100;
}

function reasonablePhone(value: string): boolean {
  if (!/^[+\d][\d\s()./-]*$/.test(value)) {
    return false;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function readCareersValues(formData: FormData): CareersValues | "spam" {
  if (singleLine(String(formData.get("company_website") ?? "")) !== "") {
    return "spam";
  }

  const localeRaw = singleLine(String(formData.get("locale") ?? ""));
  const countryRaw = singleLine(String(formData.get("country") ?? ""));
  const experienceRaw = singleLine(String(formData.get("experience") ?? ""));
  const games = readList(formData, "games");
  const regions = readList(formData, "regions");
  const availability = readList(formData, "availability");
  const languages = readList(formData, "languages");

  return {
    locale: isCareerLocale(localeRaw) ? localeRaw : "it",
    firstName: singleLine(String(formData.get("firstName") ?? "")),
    lastName: singleLine(String(formData.get("lastName") ?? "")),
    email: singleLine(String(formData.get("email") ?? "")),
    phone: singleLine(String(formData.get("phone") ?? "")),
    locality: singleLine(String(formData.get("locality") ?? "")),
    country: isCareerCountry(countryRaw) ? countryRaw : "",
    birthDate: singleLine(String(formData.get("birthDate") ?? "")),
    experience: isCareerExperience(experienceRaw) ? experienceRaw : "",
    games: ordered(careerGames, games.filter(isCareerGame)),
    hospitality: messageText(String(formData.get("hospitality") ?? "")),
    regions: ordered(careerRegions, regions.filter(isCareerRegion)),
    availability: ordered(careerAvailability, availability.filter(isCareerAvailability)),
    languages: ordered(careerLanguages, languages.filter(isCareerLanguage)),
    presentation: messageText(String(formData.get("presentation") ?? "")),
    privacyConsent: formData.get("privacy") === "yes",
  };
}

export function validateCareersValues(
  values: CareersValues,
  formData?: FormData,
  now = new Date(),
): CareersFieldErrors {
  const errors: CareersFieldErrors = {};

  if (values.firstName.length < 2) {
    errors.firstName = "errors.firstName";
  } else if (values.firstName.length > careerLimits.name) {
    errors.firstName = "errors.nameMax";
  }

  if (values.lastName.length < 2) {
    errors.lastName = "errors.lastName";
  } else if (values.lastName.length > careerLimits.name) {
    errors.lastName = "errors.nameMax";
  }

  if (!emailPattern.test(values.email) || values.email.length > careerLimits.email) {
    errors.email = "errors.email";
  }

  if (!values.phone || values.phone.length > careerLimits.phone || !reasonablePhone(values.phone)) {
    errors.phone = "errors.phone";
  }

  if (values.locality.length < 2) {
    errors.locality = "errors.locality";
  } else if (values.locality.length > careerLimits.locality) {
    errors.locality = "errors.localityMax";
  }

  if (!values.country) {
    errors.country = formData && unknownSelection(formData, "country") ? "errors.choice" : "errors.country";
  }

  if (values.birthDate && !plausibleBirthDate(values.birthDate, now)) {
    errors.birthDate = "errors.birthDate";
  }

  if (!values.experience) {
    errors.experience = "errors.experience";
  }

  if (formData && unknownSelection(formData, "games", gameSet)) {
    errors.games = "errors.choice";
  }

  if (values.hospitality.length > careerLimits.hospitality) {
    errors.hospitality = "errors.hospitalityMax";
  }

  if (formData && unknownSelection(formData, "regions", regionSet)) {
    errors.regions = "errors.choice";
  } else if (values.regions.length === 0) {
    errors.regions = "errors.regions";
  } else if (values.regions.includes("all") && values.regions.length > 1) {
    errors.regions = "errors.regionsConflict";
  }

  if (formData && unknownSelection(formData, "availability", availabilitySet)) {
    errors.availability = "errors.choice";
  }

  if (formData && unknownSelection(formData, "languages", languageSet)) {
    errors.languages = "errors.choice";
  }

  if (values.presentation.length < 20) {
    errors.presentation = "errors.presentation";
  } else if (values.presentation.length > careerLimits.presentation) {
    errors.presentation = "errors.presentationMax";
  }

  if (!values.privacyConsent) {
    errors.privacy = "errors.privacy";
  }

  return errors;
}

function unknownSelection(formData: FormData, name: string, allowed?: Set<string>): boolean {
  const values = readList(formData, name).filter(Boolean);
  if (values.length > 12) {
    return true;
  }
  if (!allowed) {
    return false;
  }
  return values.some((value) => !allowed.has(value));
}

export function careersTimingError(formData: FormData, now = Date.now()): boolean {
  const raw = singleLine(String(formData.get("startedAt") ?? ""));
  if (!/^\d{10,16}$/.test(raw)) {
    return true;
  }
  const started = Number(raw);
  const elapsed = now - started;
  return elapsed < 1500 || elapsed > 6 * 60 * 60 * 1000;
}
