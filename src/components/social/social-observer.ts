export type SocialObserverAction = "keep" | "connect" | "disconnect";

/**
 * Desktop drops the observer. Mobile connects when the overlap answer
 * changes, and also when no observer is attached yet. The second case is
 * the desktop-to-mobile resize: visibility can stay "shown" while the
 * previous desktop pass had cleared the observer.
 */
export function planSocialObserver(input: {
  desktop: boolean;
  blocked: boolean;
  nextBlocked: boolean;
  hasObserver: boolean;
}): { blocked: boolean; action: SocialObserverAction } {
  if (input.desktop) {
    return {
      blocked: false,
      action: input.hasObserver ? "disconnect" : "keep",
    };
  }

  if (input.nextBlocked !== input.blocked || !input.hasObserver) {
    return { blocked: input.nextBlocked, action: "connect" };
  }

  return { blocked: input.blocked, action: "keep" };
}
