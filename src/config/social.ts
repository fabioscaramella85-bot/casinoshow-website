import { contactDetails } from "@/config/contact";

/** Official Fun Casinò Italia profiles used until Casino Show publishes its own. */
export const instagramUrl = "https://www.instagram.com/funcasinoitalia/";
export const instagramName = "Fun Casinò Italia";
export const instagramHandle = "@funcasinoitalia";

export const facebookUrl = "https://www.facebook.com/funcasino1";
export const facebookName = "Fun Casinò Eventi Casinò";
export const facebookShortName = "Fun Casinò";

/** Titles as printed on the Fun Casinò header cards. */
export const instagramCardName = "FUN CASINÒ ITALIA";
export const facebookCardName = "FUNCASINO EVENTI CASINÒ";

export const instagramArtwork = {
  src: "/social/instagram-card.png",
  width: 1536,
  height: 1024,
} as const;

export const facebookArtwork = {
  src: "/social/facebook-card.png",
  width: 1536,
  height: 1024,
} as const;

/**
 * Static figures copied from Fun Casinò `header-social.ts`.
 * They are not loaded from Instagram or Facebook.
 */
export const instagramCardStats = [
  { value: "13,3K", label: "followers" },
  { value: "348", label: "posts" },
] as const;

export const facebookCardStats = [
  { value: "1.770", label: "followers" },
  { value: "OLTRE 10 ANNI", label: "eventsSpan", compact: true },
] as const;

export function whatsappDigits(): string {
  return (contactDetails.phone ?? "").replace(/\D/g, "");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(message)}`;
}
