import { CareersForm } from "@/components/careers/careers-form";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersOpportunity } from "@/components/careers/careers-opportunity";
import { CareersQualities } from "@/components/careers/careers-qualities";
import { SiteShell } from "@/components/site-shell";

export function CareersPageView() {
  return (
    <SiteShell routeId="careers">
      <div className="overflow-x-clip bg-ivory">
        <CareersHero />
        <CareersQualities />
        <CareersOpportunity />
        <CareersForm />
      </div>
    </SiteShell>
  );
}
