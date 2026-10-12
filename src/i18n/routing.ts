import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales, pathnames } from "./routes";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames,
});
