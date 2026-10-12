import { Montserrat, Playfair_Display } from "next/font/google";

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

export const fontVariables = `${playfair.variable} ${montserrat.variable}`;
