type Messages = Record<string, unknown>;

function publishedLegalEntry(value: unknown) {
  if (!value || typeof value !== "object") return {};
  const entry = value as { title?: unknown; unavailable?: unknown };
  return {
    title: entry.title,
    unavailable: entry.unavailable,
  };
}

/**
 * Legal drafts stay on the server. The client catalog keeps only the titles
 * the footer will use after publication, plus the short unpublished description.
 */
export function messagesForClient(messages: Messages): Messages {
  const legal = messages.Legal;
  if (!legal || typeof legal !== "object") return messages;
  const source = legal as Record<string, unknown>;

  return {
    ...messages,
    Legal: {
      status: source.status,
      privacy: publishedLegalEntry(source.privacy),
      cookies: publishedLegalEntry(source.cookies),
      legalNotice: publishedLegalEntry(source.legalNotice),
    },
  };
}
