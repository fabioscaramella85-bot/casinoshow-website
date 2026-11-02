import type { Locale } from "@/i18n/routes";

const frame = "h-3.5 w-5 shrink-0 overflow-hidden border border-midnight/15";

export function LanguageFlag({ code }: { code: Locale }) {
  if (code === "it") {
    return (
      <svg aria-hidden="true" viewBox="0 0 3 2" className={frame}>
        <rect width="1" height="2" fill="#009246" />
        <rect x="1" width="1" height="2" fill="#fff" />
        <rect x="2" width="1" height="2" fill="#CE2B37" />
      </svg>
    );
  }

  if (code === "de") {
    return (
      <svg aria-hidden="true" viewBox="0 0 5 3" className={frame}>
        <rect width="5" height="1" fill="#000" />
        <rect y="1" width="5" height="1" fill="#DD0000" />
        <rect y="2" width="5" height="1" fill="#FFCE00" />
      </svg>
    );
  }

  if (code === "fr") {
    return (
      <svg aria-hidden="true" viewBox="0 0 3 2" className={frame}>
        <rect width="1" height="2" fill="#002395" />
        <rect x="1" width="1" height="2" fill="#fff" />
        <rect x="2" width="1" height="2" fill="#ED2939" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 60 30" className={frame}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="14" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}
