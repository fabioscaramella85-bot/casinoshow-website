import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ShellRouteId } from "@/i18n/routes";

type SiteShellProps = {
  routeId: ShellRouteId | null;
  children: ReactNode;
};

export async function SiteShell({ routeId, children }: SiteShellProps) {
  const shell = await getTranslations("Shell");

  return (
    <>
      <a className="skip-link" href="#main">
        {shell("skip")}
      </a>
      <SiteHeader routeId={routeId} />
      <main id="main" data-route={routeId ?? "not-found"} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
