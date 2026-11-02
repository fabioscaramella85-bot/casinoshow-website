import localFont from "next/font/local";

/**
 * Self-hosted faces for the four families previously loaded from next/font/google.
 * Each file contains the latin and latin-ext glyphs for one roman weight.
 * next/font/local applies one declaration list to every file, so the subset
 * split stays inside the file instead of a per-file unicode-range.
 * No italic files are loaded.
 */

export const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display/playfair-display-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/playfair-display/playfair-display-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/playfair-display/playfair-display-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-playfair",
});

export const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat/montserrat-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat/montserrat-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat/montserrat-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat/montserrat-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-montserrat",
});

/** Fun Casinò header-card faces. Applied only on those cards. */
export const socialSerif = localFont({
  src: [
    { path: "../fonts/source-serif-4/source-serif-4-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-social-serif",
});

export const socialSans = localFont({
  src: [
    { path: "../fonts/source-sans-3/source-sans-3-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/source-sans-3/source-sans-3-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-social-sans",
});

export const fontVariables = `${playfair.variable} ${montserrat.variable}`;
