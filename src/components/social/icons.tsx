type IconProps = {
  className?: string;
};

export function InstagramIcon({ className = "size-4" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-4" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M14.2 8.5H16.5V5.5h-2.5C11.6 5.5 10 7.2 10 9.6v1.9H8v3h2V21h3v-6.5h2.3l.4-3H13v-1.7c0-.7.4-1.3 1.2-1.3z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-4" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M12 3.2A8.3 8.3 0 0 0 5.2 16.4L4 20.2l3.9-1.2A8.3 8.3 0 1 0 12 3.2zm4.6 11.7c-.2.5-1 .9-1.4 1-.4.1-.8.1-1.3-.1-.3-.1-.7-.2-1.2-.5-2.1-1.1-3.5-3.3-3.6-3.5-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4.2.4.6 1.4.7 1.5.1.1.1.3 0 .5l-.3.4c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.4-.6c.1-.2.3-.1.5-.1.2.1 1.3.6 1.5.7.2.1.3.2.4.3.1.3 0 .7-.2 1.1z"
      />
    </svg>
  );
}
