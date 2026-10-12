import { getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames, type RouteId } from "@/i18n/routes";

type CommercialPageProps = {
  routeId: RouteId;
};

export async function CommercialPage({ routeId }: CommercialPageProps) {
  const page = await getTranslations(`Pages.${routeId}`);
  const scaffold = await getTranslations("Scaffold");
  const labels = await getNavLabels();
  const heading = page("heading");
  const description = page("description");

  return (
    <SiteShell routeId={routeId}>
      <Section tone="light">
        <Container>
          <Eyebrow>{scaffold("eyebrow")}</Eyebrow>
          <h1 className="type-h1 mt-4 max-w-4xl">{heading}</h1>
          <p className="type-body-lg mt-5 max-w-2xl text-text-muted-on-light">{description}</p>
          <div className="mt-8">
            <Divider />
          </div>
        </Container>
      </Section>
      <Section tone="dark" labelledBy="scaffold-dark">
        <Container>
          <SectionHeading
            id="scaffold-dark"
            tone="dark"
            eyebrow={scaffold("eyebrow")}
            title={scaffold("darkHeading")}
            description={scaffold("cardBody")}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["one", "two", "three"].map((slot) => (
              <Card
                key={slot}
                tone="dark"
                title={scaffold("cardTitle")}
                description={scaffold("cardBody")}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
            <Button href={routePathnames.contact} variant="light">
              {labels.contact}
            </Button>
            <Button href={routePathnames.home} variant="text">
              {labels.home}
            </Button>
          </div>
        </Container>
      </Section>
      <Section tone="light" labelledBy="scaffold-light">
        <Container>
          <SectionHeading
            id="scaffold-light"
            eyebrow={scaffold("eyebrow")}
            title={scaffold("lightHeading")}
            description={scaffold("cardBody")}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["one", "two", "three"].map((slot) => (
              <Card
                key={slot}
                tone="light"
                title={scaffold("cardTitle")}
                description={scaffold("cardBody")}
              />
            ))}
          </div>
          <div className="mt-10">
            <Button href={routePathnames.events} variant="secondary">
              {labels.events}
            </Button>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
