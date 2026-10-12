type MediaAspect = "4/3" | "4/5";
type MediaAccent = "green" | "gold" | "red" | "ivory";

type MediaFrameProps = {
  aspect?: MediaAspect;
  accent?: MediaAccent;
  label?: string;
  decorative?: boolean;
  className?: string;
};

const accents: Record<MediaAccent, string> = {
  green: "bg-brand-green",
  gold: "bg-brand-gold",
  red: "bg-brand-red",
  ivory: "bg-ivory",
};

const aspects: Record<MediaAspect, string> = {
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
};

/**
 * Graphic stand-in for a photograph. Replace the inner composition with
 * next/image once an approved event picture exists; keep the aspect box.
 */
export function MediaFrame({
  aspect = "4/3",
  accent = "gold",
  label,
  decorative = false,
  className,
}: MediaFrameProps) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      className={`relative overflow-hidden bg-graphite ${className ?? aspects[aspect]}`}
    >
      <div className={`absolute inset-y-0 left-0 w-1.5 ${accents[accent]}`} />
      <div className="absolute inset-4 border border-ivory/15 sm:inset-5" />
      <div className="absolute top-[16%] left-[14%] h-[28%] w-[42%] bg-midnight" />
      <div className="absolute right-[12%] bottom-[14%] h-[42%] w-[48%] border border-brand-gold/55" />
      <div className="absolute top-[20%] right-[16%] size-12 rounded-full border border-ivory/35 sm:size-16" />
    </div>
  );
}
