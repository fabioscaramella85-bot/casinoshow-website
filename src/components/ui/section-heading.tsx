import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  id,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={`type-h2 text-balance ${eyebrow ? "mt-3" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p
          className={`type-body-lg mt-4 ${
            tone === "dark" ? "text-text-muted-on-dark" : "text-text-muted-on-light"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
