import { getTranslations } from "next-intl/server";
import { CareersForm } from "@/components/careers/careers-form";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersOpportunity } from "@/components/careers/careers-opportunity";
import { CareersQualities } from "@/components/careers/careers-qualities";
import { SiteShell } from "@/components/site-shell";
import { careersIntake } from "@/lib/careers/intake";

export function CareersPageView() {
  const intake = careersIntake();

  return (
    <SiteShell routeId="careers">
      <div className="overflow-x-clip bg-ivory">
        <CareersHero />
        <CareersQualities />
        <CareersOpportunity />
        {intake === "open" ? <CareersForm /> : <CareersClosed reason={intake} />}
      </div>
    </SiteShell>
  );
}

async function CareersClosed({ reason }: { reason: "preview" | "unpublished" }) {
  const t = await getTranslations("Careers");

  return (
    <section
      id="candidatura"
      aria-labelledby="careers-form-title"
      data-careers-intake={reason}
      className="scroll-mt-28 py-[var(--spacing-section)]"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <h2 id="careers-form-title" className="type-h2 text-balance">
          {t("form.title")}
        </h2>
        <p className="type-body mt-6 border border-brand-gold bg-white px-4 py-4 text-text-on-light" role="status">
          {reason === "preview" ? t("closed.preview") : t("closed.privacy")}
        </p>
      </div>
    </section>
  );
}
