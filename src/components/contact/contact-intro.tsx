import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export async function ContactIntro() {
  const t = await getTranslations("Contact");

  return (
    <section aria-labelledby="contact-intro-title" className="bg-midnight text-text-on-dark">
      <Container className="py-10 sm:py-12 md:py-14 lg:py-16">
        <Eyebrow tone="dark">{t("intro.eyebrow")}</Eyebrow>
        <h1 id="contact-intro-title" className="type-h1 mt-4 max-w-3xl text-balance">
          {t("intro.title")}
        </h1>
        <p className="type-body mt-4 max-w-2xl text-pretty text-text-on-dark">{t("intro.description")}</p>
      </Container>
    </section>
  );
}
