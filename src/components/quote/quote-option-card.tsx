"use client";

import { useTranslations } from "next-intl";

type QuoteOptionCardProps = {
  name: string;
  value: string;
  checked: boolean;
  title: string;
  body?: string;
  type: "radio" | "checkbox";
  allowClear?: boolean;
  onSelect: () => void;
  onClear?: () => void;
};

export function QuoteOptionCard({
  name,
  value,
  checked,
  title,
  body,
  type,
  allowClear = false,
  onSelect,
  onClear,
}: QuoteOptionCardProps) {
  const t = useTranslations("Quote");

  return (
    <label
      className={`flex min-h-11 cursor-pointer flex-col gap-2 border p-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-gold ${
        checked
          ? "border-midnight bg-midnight text-ivory"
          : "border-line-on-light bg-ivory text-midnight hover:border-midnight"
      }`}
    >
      <input
        className="sr-only"
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        onClick={(event) => {
          if (checked && allowClear && onClear) {
            event.preventDefault();
            onClear();
          }
        }}
      />
      <span
        aria-hidden="true"
        className={`type-eyebrow ${checked ? "text-ivory" : "text-transparent"}`}
      >
        {t("selected")}
      </span>
      <span className="type-h4">{title}</span>
      {body ? (
        <span className={`type-small ${checked ? "text-text-muted-on-dark" : "text-text-muted-on-light"}`}>
          {body}
        </span>
      ) : null}
    </label>
  );
}
