"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { instagramUrl, whatsappUrl } from "@/config/social";
import { InstagramIcon, WhatsAppIcon } from "@/components/social/icons";

const buttonClass =
  "inline-flex size-14 items-center justify-center rounded-full text-white shadow-[0_8px_20px_rgb(16_17_20/0.2)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100";

export function FloatingSocial() {
  const social = useTranslations("Social");
  const shell = useTranslations("Shell");
  const pathname = usePathname();

  if (pathname === "/quote" || pathname === "/careers") {
    return null;
  }

  const newTab = shell("newTab");

  return (
    <div className="fixed right-6 bottom-6 z-30 hidden flex-col gap-3 xl:flex">
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social("instagram")} (${newTab})`}
          className={`${buttonClass} bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]`}
        >
          <InstagramIcon className="size-6" />
        </a>
      ) : null}
      <a
        href={whatsappUrl(social("whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social("whatsapp")} (${newTab})`}
        className={`${buttonClass} bg-[#25D366]`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
