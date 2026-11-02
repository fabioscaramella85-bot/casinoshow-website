import { previewOutboundMailBlocked } from "../preview/protection";

export type ResendAttachment = {
  filename: string;
  content: string;
  content_type: string;
};

export type ResendMessage = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachments?: ResendAttachment[];
};

/**
 * One HTTPS call to Resend for Casino Show mail.
 * Logs the outcome only: never the message body or the API key.
 */
export async function postResendMessage(
  apiKey: string,
  message: ResendMessage,
  logLabel: string,
): Promise<"sent" | "error"> {
  if (previewOutboundMailBlocked()) {
    console.error(`[${logLabel}] delivery blocked for this deployment`);
    return "error";
  }

  const body: Record<string, unknown> = {
    from: message.from,
    to: [message.to],
    reply_to: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
  };
  if (message.attachments && message.attachments.length > 0) {
    body.attachments = message.attachments;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      console.error(`[${logLabel}] mail provider rejected the message (${response.status})`);
      return "error";
    }

    const payload = (await response.json()) as { id?: unknown };
    if (typeof payload.id !== "string" || payload.id.length === 0) {
      console.error(`[${logLabel}] mail provider returned no message id`);
      return "error";
    }

    return "sent";
  } catch (error) {
    console.error(`[${logLabel}] delivery failed`, error instanceof Error ? error.name : "unknown");
    return "error";
  }
}
