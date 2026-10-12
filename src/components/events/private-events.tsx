import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const pointKeys = ["birthday", "anniversary", "party", "occasion"] as const;

export async function PrivateEvents() {
  const t = await getTranslations("Events");

  return (
    <Section id="private" labelledBy="events-private" tone="dark">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">{t("private.eyebrow")}</Eyebrow>
            <h2 id="events-private" className="type-h2 mt-3 text-balance">
              {t("private.title")}
            </h2>
          </div>
          <p className="type-body-lg text-text-muted-on-dark lg:col-span-7 lg:pt-10">
            {t("private.body")}
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-line-on-dark sm:grid-cols-2">
          {pointKeys.map((key) => (
            <article key={key} className="bg-surface-dark p-6 sm:p-8">
              <h3 className="type-h3">{t(`private.points.${key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-dark">
                {t(`private.points.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
