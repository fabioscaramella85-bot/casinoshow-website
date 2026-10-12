import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactDetails, enabledContactChannels } from "@/config/contact";

export async function ContactChannels() {
  const t = await getTranslations("Contact");
  const channels = enabledContactChannels();
  const profiles = contactDetails.socialProfiles;

  return (
    <Section id="channels" tone="muted" labelledBy="contact-channels">
      <Container>
        <SectionHeading
          id="contact-channels"
          eyebrow={t("channels.eyebrow")}
          title={t("channels.title")}
          description={channels.length === 0 ? t("channels.empty") : t("channels.ready")}
        />
        {channels.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.id} className="border-t border-line-on-light pt-5">
                <p className="type-eyebrow text-gold-ink">{t(`channels.items.${channel.id}`)}</p>
                <a
                  href={channel.href}
                  className="type-body mt-3 inline-flex min-h-11 items-center text-midnight underline decoration-transparent underline-offset-4 hover:decoration-current"
                >
                  {channel.value}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {contactDetails.address ? (
          <p className="type-body mt-8 max-w-xl text-text-on-light">{contactDetails.address}</p>
        ) : null}
        {profiles.length > 0 ? (
          <ul className="mt-8 flex flex-col">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <a
                  href={profile.href}
                  className="type-body inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 hover:decoration-current"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
