import { getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/site-shell";
import { Container } from "@/components/ui/container";
import type { LegalRouteId } from "@/i18n/routes";
import { isLegalRoutePublic, legalCopyIsPublishable } from "@/lib/legal/publication";

type LegalDocumentProps = {
  routeId: LegalRouteId;
};

async function UnpublishedLegal({ routeId }: LegalDocumentProps) {
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

export async function LegalDocument({ routeId }: LegalDocumentProps) {
  if (!isLegalRoutePublic(routeId)) {
    return <UnpublishedLegal routeId={routeId} />;
  }

  const copy = await getTranslations(`Legal.public.${routeId}`);
  const candidate = {
    title: copy("title"),
    summary: copy("summary"),
    sections: copy.raw("sections"),
  };

  if (!legalCopyIsPublishable(candidate)) {
    return <UnpublishedLegal routeId={routeId} />;
  }

  return (
    <SiteShell routeId={routeId}>
      <article className="py-16 md:py-24" data-legal-status="published">
        <Container>
          <div className="max-w-3xl">
            <h1 className="type-h1 text-balance">{candidate.title}</h1>
            <p className="type-body mt-6 max-w-2xl text-text-muted-on-light">{candidate.summary}</p>
            <div className="mt-10 space-y-10">
              {candidate.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="type-h3 text-balance">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="type-body mt-4 text-text-muted-on-light">
                      {paragraph}
                    </p>
                  ))}
                  {section.items && section.items.length > 0 ? (
                    <ul className="type-body mt-4 list-disc space-y-2 pl-5 text-text-muted-on-light">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </article>
    </SiteShell>
  );
}
