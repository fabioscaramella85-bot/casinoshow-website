import davidePortrait from "../../../public/home-page/davide-merli/Davide con coppa.png";
import heroLead from "../../../public/chi-siamo/staff/staff 3.jpg";
import heroSide from "../../../public/chi-siamo/staff/staff 5.jpg";
import heroWide from "../../../public/chi-siamo/staff/staff 9.jpg";
import italyImage from "../../../public/chi-siamo/sfondo-funcasino.png";

/**
 * Single manifest for the About page.
 * Static imports content-hash the file, so a replaced photograph cannot stay
 * cached under the previous URL. Do not generate stand-in people.
 * A future vertical portrait can take the place of `davide` at
 * /chi-siamo/davide-merli-casino-show.webp once that file is supplied.
 */
export const aboutMedia = {
  hero: {
    lead: heroLead,
    side: heroSide,
    wide: heroWide,
  },
  italy: italyImage,
  story: "/images/gallery/fc-croupier-roulette-001.webp",
  davide: davidePortrait,
  staff: {
    group: "/images/gallery/fc-staff-group-corporate-001.webp",
    croupier: "/images/gallery/fc-corporate-roulette-croupier-001.webp",
    guests: "/images/gallery/fc-roulette-croupier-guests-003.webp",
  },
} as const;

/** Original Fun Casinò logo. Rendered only when this file is present on disk. */
export const funCasinoLogoSrc = "/chi-siamo/logo-funcasino.png";

/** The only promotional external destination on the About page. */
export const funCasinoSite = "https://www.funcasino.it/";
