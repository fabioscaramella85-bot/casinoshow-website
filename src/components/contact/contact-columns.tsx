import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/social/icons";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { enabledContactChannels } from "@/config/contact";
import { routePathnames } from "@/i18n/routes";

const contactGridCss = `
.contact-band {
  width: min(75rem, calc(100% - 2rem));
  margin-inline: auto;
  padding-block: 2.25rem;
}
.contact-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}
.contact-column {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border-top: 1px solid var(--color-line-on-light);
  padding-block: 1.5rem;
}
.contact-column:first-child {
  border-top: 0;
  padding-top: 0;
}
.contact-column:last-child {
  padding-bottom: 0;
}
@media (min-width: 900px) {
  .contact-band {
    padding-block: 2.75rem;
  }
  .contact-columns {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
  }
  .contact-column {
    border-top: 0;
    padding: 0 1.5rem;
  }
  .contact-column:first-child {
    padding-left: 0;
  }
  .contact-column:last-child {
    padding-right: 0;
  }
  .contact-column + .contact-column {
    border-left: 1px solid var(--color-line-on-light);
  }
}
`;

const detailLinkClass =
  "inline-flex min-h-11 items-center text-midnight underline decoration-transparent underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-brand-red hover:decoration-current";

const actionClass =
  "w-full min-w-0 whitespace-normal px-4 py-3 text-center sm:w-auto sm:px-5 [&>span]:min-w-0 [&>span]:text-balance";

export async function ContactColumns() {
  const t = await getTranslations("Contact");
  const shell = await getTranslations("Shell");
  const channels = enabledContactChannels();
  const email = channels.find((channel) => channel.id === "email");
  const phone = channels.find((channel) => channel.id === "phone");
  const whatsappHref = phone ? `https://wa.me/${phone.value.replace(/\D/g, "")}` : null;

  return (
    <section aria-label={t("columns.label")} className="bg-ivory text-text-on-light">
      <style href="contact-columns-grid">{contactGridCss}</style>
      <div className="contact-band">
        <ol className="contact-columns">
          <Column
            number="01"
            eyebrow={t("columns.general.eyebrow")}
            title={t("columns.general.title")}
            description={t("columns.general.description")}
          >
            <dl className="flex flex-col gap-4">
              {email ? (
                <div>
                  <dt className="type-eyebrow text-gold-ink">{t("channels.email")}</dt>
                  <dd>
                    <a
                      href={email.href}
                      aria-label={t("channels.emailLabel", { value: email.value })}
                      className={`type-body ${detailLinkClass}`}
                    >
                      {email.value}
                    </a>
                  </dd>
                </div>
              ) : null}
              {phone && whatsappHref ? (
                <div>
                  <dt className="type-eyebrow text-gold-ink">{t("channels.phoneWhatsapp")}</dt>
                  <dd className="flex flex-col items-start">
                    <a
                      href={phone.href}
                      aria-label={t("channels.phoneLabel", { value: phone.value })}
                      className={`type-body ${detailLinkClass}`}
                    >
                      {phone.value}
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("channels.whatsappLabel", { value: phone.value })} (${shell("newTab")})`}
                      className={`type-button gap-2 ${detailLinkClass}`}
                    >
                      <WhatsAppIcon />
                      {t("channels.whatsapp")}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Column>
          <Column
            number="02"
            eyebrow={t("columns.event.eyebrow")}
            title={t("columns.event.title")}
            description={t("columns.event.description")}
          >
            <Button href={routePathnames.quote} className={actionClass}>
              {t("columns.event.cta")}
            </Button>
          </Column>
          <Column
            number="03"
            eyebrow={t("columns.careers.eyebrow")}
            title={t("columns.careers.title")}
            description={t("columns.careers.description")}
          >
            <Button href={routePathnames.careers} className={actionClass}>
              {t("columns.careers.cta")}
            </Button>
          </Column>
        </ol>
      </div>
    </section>
  );
}

function Column({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <li className="contact-column">
      <p aria-hidden="true" className="font-display text-[1.75rem] font-medium leading-none tracking-[0.08em] text-gold-ink">
        {number}
      </p>
      <div className="mt-3">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="type-h3 mt-2 text-balance">{title}</h2>
      <p className="type-body mt-2 text-pretty text-text-muted-on-light">{description}</p>
      <div className="mt-auto pt-6">{children}</div>
    </li>
  );
}
