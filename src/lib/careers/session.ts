export type FormSession = {
  readonly startedAt: number;
};

/** One opening time per form mount. Later field updates must keep this value. */
export function openFormSession(now = Date.now()): FormSession {
  return { startedAt: now };
}

export function applySessionStamp(formData: FormData, session: FormSession): FormData {
  formData.set("startedAt", String(session.startedAt));
  return formData;
}
