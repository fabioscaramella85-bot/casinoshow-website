export type ContactChannelId = "email" | "phone" | "whatsapp";

export type SocialProfile = {
  id: string;
  label: string;
  href: string;
};

export type ContactDetails = {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  socialProfiles: readonly SocialProfile[];
};

export type EnabledContactChannel = {
  id: ContactChannelId;
  href: string;
  value: string;
};

/**
 * Public contact details. Every field stays empty until a value is
 * confirmed for casinoshow.ch. Do not put an example address here.
 */
export const contactDetails: ContactDetails = {
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  socialProfiles: [],
};

function present(value: string | null): value is string {
  return value !== null && value.trim() !== "";
}

export function enabledContactChannels(
  details: ContactDetails = contactDetails,
): EnabledContactChannel[] {
  const channels: EnabledContactChannel[] = [];

  if (present(details.email)) {
    channels.push({
      id: "email",
      href: `mailto:${details.email.trim()}`,
      value: details.email.trim(),
    });
  }

  if (present(details.phone)) {
    channels.push({
      id: "phone",
      href: `tel:${details.phone.replace(/[^\d+]/g, "")}`,
      value: details.phone.trim(),
    });
  }

  if (present(details.whatsapp)) {
    channels.push({
      id: "whatsapp",
      href: `https://wa.me/${details.whatsapp.replace(/\D/g, "")}`,
      value: details.whatsapp.trim(),
    });
  }

  return channels;
}
