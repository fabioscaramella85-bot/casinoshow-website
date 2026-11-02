import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const qualities = ["professionalism", "presence", "communication", "team"] as const;

export async function CareersQualities() {
  const t = await getTranslations("Careers.team");

  return (
    <section aria-labelledby="careers-team-title" className="bg-ivory py-[var(--spacing-section)] text-midnight">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="careers-team-title" className="type-h2 mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="type-body mt-4 text-text-muted-on-light">{t("intro")}</p>
        </div>
        <ol className="mt-10 grid gap-0 md:grid-cols-2">
          {qualities.map((key, index) => (
            <li
              key={key}
              className="border-t border-[rgb(92_67_20/0.35)] py-6 md:px-8 md:odd:pl-0 md:even:pr-0"
            >
              <p className="font-display text-[1.75rem] leading-none text-gold-ink">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="type-eyebrow mt-3 text-midnight">{t(`items.${key}.title`)}</h3>
              <p className="type-body mt-2 text-text-muted-on-light">{t(`items.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
