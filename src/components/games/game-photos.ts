import type { StaticImageData } from "next/image";
import experience from "../../../public/home-page/giochi/foto-360-experience.png";
import blackjack from "../../../public/home-page/giochi/foto-black-jack.png";
import dice from "../../../public/home-page/giochi/foto-dadi-chuck-a-luck.png";
import custom from "../../../public/home-page/giochi/foto-giochi-personalizzati.png";
import poker from "../../../public/home-page/giochi/foto-poker-texas-hold'em.png";
import roulette from "../../../public/home-page/giochi/foto-roulette.png";
import wheel from "../../../public/home-page/giochi/foto-ruouta-della-fortuna.png";
import selfie from "../../../public/home-page/giochi/foto-selfie-mirror.png";
import backdrop from "../../../public/home-page/giochi/foto-sfondo.png";

export const gameBackdrop = backdrop;

export const gameOrder = [
  "roulette",
  "blackjack",
  "poker",
  "wheel",
  "dice",
  "selfie",
  "experience",
  "custom",
] as const;

export type GameKey = (typeof gameOrder)[number];

export const gamePhotos: Record<GameKey, StaticImageData> = {
  roulette,
  blackjack,
  poker,
  wheel,
  dice,
  selfie,
  experience,
  custom,
};

export const gameAnchors: Record<GameKey, string> = {
  roulette: "roulette",
  blackjack: "blackjack",
  poker: "poker",
  wheel: "wheel",
  dice: "dice",
  selfie: "selfie",
  experience: "experience",
  custom: "custom",
};
