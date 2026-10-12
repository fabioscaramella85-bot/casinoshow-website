/**
 * Preferred public origin of the current casinoshow.ch site, checked on
 * 2026-10-10:
 * - https://casinoshow.ch returns 200 and publishes
 *   <link rel="canonical" href="https://casinoshow.ch/">
 * - https://www.casinoshow.ch returns 301 to https://casinoshow.ch/
 * - http://casinoshow.ch returns 301 to https://casinoshow.ch/
 *
 * www is not the preferred host. This constant is the single place that
 * turns localized pathnames into absolute canonical and sitemap URLs.
 */
export const CANONICAL_ORIGIN = "https://casinoshow.ch";
