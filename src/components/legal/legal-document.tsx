import { getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/site-shell";
import { Container } from "@/components/ui/container";
import { isLegalContentPublished } from "@/config/legal";
import type { LegalRouteId } from "@/i18n/routes";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalDocumentProps = {
  routeId: LegalRouteId;
};

const marker = "[DA CONFERMARE]";

function isSection(value: unknown): value is LegalSection {
  if (!value || typeof value !== "object") return false;
  const section = value as Partial<LegalSection>;
  return (
    typeof section.title === "string" &&
    Array.isArray(section.paragraphs) &&
    section.paragraphs.every((paragraph) => typeof paragraph === "string") &&
    (section.items === undefined ||
      (Array.isArray(section.items) && section.items.every((item) => typeof item === "string")))
  );
}

function MarkedText({ text }: { text: string }) {
  const parts = text.split(marker);
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 ? <strong className="font-semibold text-gold-ink">{marker}</strong> : null}
    </span>
  ));
}

export async function LegalDocument({ routeId }: LegalDocumentProps) {
  if (!isLegalContentPublished(routeId)) {
    const unpublished = await getTranslations("Legal.unpublished");

    return (
      <SiteShell routeId={routeId}>
        <article className="py-16 md:py-24" data-legal-status="unpublished">
          <Container>
            <div className="max-w-3xl">
              <h1 className="type-h1 text-balance">{unpublished(`${routeId}.title`)}</h1>
              <p className="type-body mt-6 border border-line-on-light bg-ivory px-4 py-4 text-text-on-light">
                {unpublished("notice")}
              </p>
            </div>
          </Container>
        </article>
      </SiteShell>
    );
  }

  const legal = await getTranslations("Legal");
  const copy = await getTranslations(`Legal.${routeId}`);
  const sections = copy.raw("sections");
  const draft = Array.isArray(sections) ? sections.filter(isSection) : [];

  return (
    <SiteShell routeId={routeId}>
      <article className="py-16 md:py-24" data-legal-draft="true">
        <Container>
          <div className="max-w-3xl">
            <p className="type-eyebrow text-gold-ink">{legal("status")}</p>
            <h1 className="type-h1 mt-4 text-balance">{copy("title")}</h1>
            <p className="type-body mt-6 border border-line-on-light bg-ivory px-4 py-4 text-text-muted-on-light">
              {legal("draftNotice")}
            </p>
            {draft.length > 0 ? (
              <div className="mt-10 space-y-10">
                {draft.map((section) => (
                  <section key={section.title}>
                    <h2 className="type-h3 text-balance">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="type-body mt-4 text-text-muted-on-light">
                        <MarkedText text={paragraph} />
                      </p>
                    ))}
                    {section.items && section.items.length > 0 ? (
                      <ul className="type-body mt-4 list-disc space-y-2 pl-5 text-text-muted-on-light">
                        {section.items.map((item) => (
                          <li key={item}>
                            <MarkedText text={item} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            ) : (
              <p className="type-body mt-6 max-w-2xl text-text-muted-on-light">{copy("unavailable")}</p>
            )}
          </div>
        </Container>
      </article>
    </SiteShell>
  );
}
