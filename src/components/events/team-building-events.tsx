import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const pointKeys = ["participation", "interaction", "challenge", "collaboration"] as const;

export async function TeamBuildingEvents() {
  const t = await getTranslations("Events");

  return (
    <Section id="team" labelledBy="events-team" tone="light">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow>{t("team.eyebrow")}</Eyebrow>
          <h2 id="events-team" className="type-h2 mt-3 text-balance">
            {t("team.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-light">{t("team.body")}</p>
          <ol className="mt-8 border-t border-line-on-light">
            {pointKeys.map((key, index) => (
              <li key={key} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line-on-light py-5">
                <span className="type-eyebrow pt-1 text-gold-ink">0{index + 1}</span>
                <div>
                  <h3 className="type-h4">{t(`team.points.${key}.title`)}</h3>
                  <p className="type-body mt-2 text-text-muted-on-light">
                    {t(`team.points.${key}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <MediaFrame decorative accent="green" className="aspect-[4/3] lg:order-1" />
      </Container>
    </Section>
  );
}
