"use client";

type QuoteFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  errorId?: string;
  hint?: string;
  hintId?: string;
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  required?: boolean;
  requirement?: string;
  maxLength?: number;
  disabled?: boolean;
  min?: string;
  placeholder?: string;
  suppressHydrationWarning?: boolean;
};

export function QuoteField({
  id,
  label,
  value,
  onChange,
  error,
  errorId,
  hint,
  hintId,
  type = "text",
  autoComplete,
  required = false,
  requirement,
  maxLength,
  disabled = false,
  min,
  placeholder,
  suppressHydrationWarning = false,
}: QuoteFieldProps) {
  const describedBy = [error ? errorId : undefined, hint ? hintId : undefined].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="type-h4 block">
        {label}
        {requirement ? (
          <span className="type-small mt-1 block font-normal text-gold-ink">{requirement}</span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        min={min}
        placeholder={placeholder}
        suppressHydrationWarning={suppressHydrationWarning}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        onChange={(event) => onChange(event.target.value)}
        className="type-body mt-2 min-h-11 w-full min-w-0 max-w-full border border-line-on-light bg-ivory px-3 text-midnight disabled:opacity-50"
      />
      {hint ? (
        <p id={hintId} className="type-small mt-2 text-text-muted-on-light">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="type-small mt-2 text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type QuoteSelectOption = {
  value: string;
  label: string;
};

type QuoteSelectProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly QuoteSelectOption[];
  onChange: (value: string) => void;
  error?: string;
  errorId?: string;
  hint?: string;
  hintId?: string;
  requirement?: string;
};

export function QuoteSelect({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  error,
  errorId,
  hint,
  hintId,
  requirement,
}: QuoteSelectProps) {
  const describedBy = [error ? errorId : undefined, hint ? hintId : undefined].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="type-h4 block">
        {label}
        {requirement ? (
          <span className="type-small mt-1 block font-normal text-gold-ink">{requirement}</span>
        ) : null}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        onChange={(event) => onChange(event.target.value)}
        className="type-body mt-2 box-border block min-h-11 w-full min-w-0 max-w-full border border-line-on-light bg-ivory px-3 text-midnight"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={hintId} className="type-small mt-2 text-text-muted-on-light">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="type-small mt-2 text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}
