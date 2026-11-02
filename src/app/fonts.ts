import { Montserrat, Playfair_Display, Source_Sans_3, Source_Serif_4 } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

/** Fun Casinò header-card faces. Applied only on those cards. */
export const socialSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  display: "swap",
  variable: "--font-social-serif",
});

export const socialSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-social-sans",
});

export const fontVariables = `${playfair.variable} ${montserrat.variable}`;
