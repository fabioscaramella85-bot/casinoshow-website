"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitCareersApplication } from "@/app/[locale]/careers/actions";
import { Link } from "@/i18n/navigation";
import { legalPathnames } from "@/i18n/routes";
import {
  careerAvailability,
  careerCountries,
  careerCvAccept,
  careerExperienceLevels,
  careerGames,
  careerLanguages,
  careerLimits,
  careerRegions,
  preliminaryCvError,
  readCareersValues,
  validateCareersValues,
  type CareerAvailability,
  type CareerGame,
  type CareerLanguage,
  type CareerRegion,
  type CareersFieldErrors,
} from "@/lib/careers/schema";

const controlClass =
  "type-body mt-2 box-border block min-h-11 w-full min-w-0 max-w-full border border-line-on-light bg-white px-3 text-midnight aria-invalid:border-brand-red disabled:opacity-50";

function focusField(id: string) {
  const node = document.getElementById(id);
  if (!node) {
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.focus();
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
}

export function CareersForm() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const [regions, setRegions] = useState<CareerRegion[]>([]);
  const [games, setGames] = useState<CareerGame[]>([]);
  const [availability, setAvailability] = useState<CareerAvailability[]>([]);
  const [languages, setLanguages] = useState<CareerLanguage[]>([]);
  const [fileLabel, setFileLabel] = useState("");
  const [errors, setErrors] = useState<CareersFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [focusId, setFocusId] = useState<string | null>(null);
  const submitting = status === "submitting";

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) {
      startedRef.current.value = String(Date.now());
    }
  }, []);

  useEffect(() => {
    if (status === "sent") {
      successRef.current?.focus();
      return;
    }
    if (focusId) {
      focusField(focusId);
      return;
    }
    if (status === "error") {
      alertRef.current?.focus();
    }
  }, [status, focusId]);

  function toggle<T extends string>(current: readonly T[], value: T): T[] {
    return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
  }

  function toggleRegion(value: CareerRegion) {
    setRegions((current) => {
      if (value === "all") {
        return current.includes("all") ? [] : ["all"];
      }
      const withoutAll = current.filter((item) => item !== "all");
      return withoutAll.includes(value)
        ? withoutAll.filter((item) => item !== value)
        : [...withoutAll, value];
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const read = readCareersValues(formData);
    if (read === "spam") {
      setErrors({});
      setFocusId(null);
      setStatus("error");
      return;
    }

    const nextErrors = validateCareersValues(read, formData);
    const rawCv = formData.get("cv");
    const file = rawCv instanceof File ? rawCv : null;
    const cvError = preliminaryCvError(file);
    if (cvError) {
      nextErrors.cv = cvError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      setFocusId(`careers-${Object.keys(nextErrors)[0]}`);
      return;
    }

    setErrors({});
    setFocusId(null);
    setStatus("submitting");

    try {
      const result = await submitCareersApplication(formData);
      if (result.status === "sent") {
        setStatus("sent");
        return;
      }
      if (result.status === "invalid") {
        setErrors(result.fields);
        setStatus("idle");
        setFocusId(`careers-${Object.keys(result.fields)[0] ?? "firstName"}`);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="candidatura" aria-labelledby="careers-form-title" className="scroll-mt-28 py-[var(--spacing-section)]">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <h2 id="careers-form-title" className="type-h2 text-balance">
          {t("form.title")}
        </h2>
        <p className="type-body mt-4 max-w-2xl text-text-muted-on-light">{t("form.description")}</p>
        <p className="type-small mt-3 text-text-muted-on-light">{t("form.requiredNote")}</p>

        {status === "sent" ? (
          <p
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="type-body mt-8 border border-brand-green/30 bg-white px-5 py-4 text-midnight"
          >
            {t("success")}
          </p>
        ) : (
          <form
            className="mt-8 border border-line-on-light bg-white px-4 py-6 sm:px-8 sm:py-8"
            noValidate
            aria-busy={submitting}
            onSubmit={onSubmit}
          >
            <p className="sr-only" aria-live="polite">
              {submitting ? t("submitting") : ""}
            </p>
            {status === "error" || Object.keys(errors).length > 0 ? (
              <div
                ref={alertRef}
                tabIndex={-1}
                role="alert"
                className="mb-8 border border-brand-red/30 bg-ivory px-4 py-3"
              >
                <p className="type-small text-brand-red">
                  {status === "error" ? t("sendError") : t("errors.summary")}
                </p>
              </div>
            ) : null}

            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>
            <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
            <input type="hidden" name="locale" defaultValue={locale} />

            <div className="grid gap-8">
              <FormSection title={t("form.sections.personal")}>
                <TextField id="careers-firstName" name="firstName" label={t("fields.firstName")} autoComplete="given-name" required maxLength={careerLimits.name} error={errors.firstName ? t(errors.firstName) : undefined} />
                <TextField id="careers-lastName" name="lastName" label={t("fields.lastName")} autoComplete="family-name" required maxLength={careerLimits.name} error={errors.lastName ? t(errors.lastName) : undefined} />
                <TextField id="careers-email" name="email" type="email" label={t("fields.email")} autoComplete="email" required maxLength={careerLimits.email} error={errors.email ? t(errors.email) : undefined} />
                <TextField id="careers-phone" name="phone" type="tel" label={t("fields.phone")} autoComplete="tel" required maxLength={careerLimits.phone} error={errors.phone ? t(errors.phone) : undefined} />
                <TextField id="careers-locality" name="locality" label={t("fields.locality")} autoComplete="address-level2" required maxLength={careerLimits.locality} error={errors.locality ? t(errors.locality) : undefined} />
                <SelectField
                  id="careers-country"
                  name="country"
                  label={t("fields.country")}
                  placeholder={t("placeholders.country")}
                  required
                  autoComplete="country"
                  error={errors.country ? t(errors.country) : undefined}
                  options={careerCountries.map((id) => ({ value: id, label: t(`options.country.${id}`) }))}
                />
                <TextField
                  id="careers-birthDate"
                  name="birthDate"
                  type="date"
                  label={t("fields.birthDate")}
                  autoComplete="bday"
                  optional={t("form.optional")}
                  hint={t("hints.birthDate")}
                  error={errors.birthDate ? t(errors.birthDate) : undefined}
                  className="md:col-span-2"
                />
              </FormSection>

              <FormSection title={t("form.sections.experience")}>
                <SelectField
                  id="careers-experience"
                  name="experience"
                  label={t("fields.experience")}
                  placeholder={t("placeholders.experience")}
                  required
                  error={errors.experience ? t(errors.experience) : undefined}
                  className="md:col-span-2"
                  options={careerExperienceLevels.map((id) => ({ value: id, label: t(`options.experience.${id}`) }))}
                />
                <CheckGroup
                  id="careers-games"
                  legend={t("fields.games")}
                  hint={t("hints.games")}
                  optional={t("form.optional")}
                  error={errors.games ? t(errors.games) : undefined}
                  className="md:col-span-2"
                >
                  {careerGames.map((id) => (
                    <CheckItem
                      key={id}
                      name="games"
                      value={id}
                      checked={games.includes(id)}
                      label={t(`options.games.${id}`)}
                      onChange={() => setGames((current) => toggle(current, id))}
                    />
                  ))}
                </CheckGroup>
                <TextArea
                  id="careers-hospitality"
                  name="hospitality"
                  label={t("fields.hospitality")}
                  optional={t("form.optional")}
                  hint={t("hints.hospitality")}
                  maxLength={careerLimits.hospitality}
                  error={errors.hospitality ? t(errors.hospitality) : undefined}
                  className="md:col-span-2"
                />
              </FormSection>

              <FormSection title={t("form.sections.availability")}>
                <CheckGroup
                  id="careers-regions"
                  legend={t("fields.regions")}
                  required
                  error={errors.regions ? t(errors.regions) : undefined}
                  className="md:col-span-2"
                >
                  {careerRegions.map((id) => (
                    <CheckItem
                      key={id}
                      name="regions"
                      value={id}
                      checked={regions.includes(id)}
                      disabled={id !== "all" && regions.includes("all")}
                      label={t(`options.regions.${id}`)}
                      onChange={() => toggleRegion(id)}
                    />
                  ))}
                </CheckGroup>
                <CheckGroup
                  id="careers-availability"
                  legend={t("fields.availability")}
                  hint={t("hints.availability")}
                  optional={t("form.optional")}
                  error={errors.availability ? t(errors.availability) : undefined}
                  className="md:col-span-2"
                >
                  {careerAvailability.map((id) => (
                    <CheckItem
                      key={id}
                      name="availability"
                      value={id}
                      checked={availability.includes(id)}
                      label={t(`options.availability.${id}`)}
                      onChange={() => setAvailability((current) => toggle(current, id))}
                    />
                  ))}
                </CheckGroup>
                <CheckGroup
                  id="careers-languages"
                  legend={t("fields.languages")}
                  hint={t("hints.languages")}
                  optional={t("form.optional")}
                  error={errors.languages ? t(errors.languages) : undefined}
                  className="md:col-span-2"
                >
                  {careerLanguages.map((id) => (
                    <CheckItem
                      key={id}
                      name="languages"
                      value={id}
                      checked={languages.includes(id)}
                      label={t(`options.languages.${id}`)}
                      onChange={() => setLanguages((current) => toggle(current, id))}
                    />
                  ))}
                </CheckGroup>
              </FormSection>

              <FormSection title={t("form.sections.presentation")}>
                <TextArea
                  id="careers-presentation"
                  name="presentation"
                  label={t("fields.presentation")}
                  required
                  hint={t("hints.presentation")}
                  maxLength={careerLimits.presentation}
                  error={errors.presentation ? t(errors.presentation) : undefined}
                  className="md:col-span-2"
                />
              </FormSection>

              <FormSection title={t("form.sections.cv")}>
                <div className="md:col-span-2">
                  <label htmlFor="careers-cv" className="type-h4 block">
                    {t("fields.cv")}
                    <span aria-hidden="true"> *</span>
                  </label>
                  <input
                    id="careers-cv"
                    name="cv"
                    type="file"
                    required
                    accept={careerCvAccept}
                    aria-invalid={errors.cv ? true : undefined}
                    aria-describedby={[errors.cv ? "careers-cv-error" : undefined, "careers-cv-hint", fileLabel ? "careers-cv-file" : undefined].filter(Boolean).join(" ") || undefined}
                    disabled={submitting}
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setFileLabel(file ? file.name : "");
                      const issue = file ? preliminaryCvError(file) : null;
                      setErrors((current) => {
                        const next = { ...current };
                        if (issue) next.cv = issue;
                        else delete next.cv;
                        return next;
                      });
                    }}
                    className="type-small mt-2 block w-full max-w-full text-midnight file:mr-4 file:inline-flex file:min-h-11 file:items-center file:border-0 file:bg-midnight file:px-4 file:font-sans file:text-xs file:font-semibold file:uppercase file:tracking-[0.08em] file:text-ivory"
                  />
                  <p id="careers-cv-hint" className="type-small mt-2 text-text-muted-on-light">
                    {t("hints.cv")}
                  </p>
                  {fileLabel ? (
                    <p id="careers-cv-file" className="type-small mt-1 text-midnight">
                      {fileLabel}
                    </p>
                  ) : null}
                  {errors.cv ? (
                    <p id="careers-cv-error" className="type-small mt-2 text-brand-red">
                      {t(errors.cv)}
                    </p>
                  ) : null}
                </div>
              </FormSection>

              <FormSection title={t("form.sections.privacy")}>
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <input
                      id="careers-privacy"
                      name="privacy"
                      type="checkbox"
                      value="yes"
                      required
                      disabled={submitting}
                      aria-invalid={errors.privacy ? true : undefined}
                      aria-describedby={errors.privacy ? "careers-privacy-error" : undefined}
                      className="mt-1 size-5 shrink-0 accent-brand-red"
                    />
                    {/* Privacy page is an unapproved draft. It describes applications and CVs and is not a published policy. */}
                    <label htmlFor="careers-privacy" className="type-body text-midnight">
                      {t("privacy.before")}
                      <Link
                        href={legalPathnames.privacy}
                        className="underline decoration-brand-gold/70 underline-offset-4 hover:text-brand-red"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {t("privacy.link")}
                      </Link>
                      {t("privacy.after")}
                      <span aria-hidden="true"> *</span>
                    </label>
                  </div>
                  {errors.privacy ? (
                    <p id="careers-privacy-error" className="type-small mt-2 text-brand-red">
                      {t(errors.privacy)}
                    </p>
                  ) : null}
                </div>
              </FormSection>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="type-button mt-8 inline-flex min-h-11 w-full items-center justify-center bg-brand-red px-5 text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-brand-red-hover disabled:opacity-45 sm:w-auto"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line-on-light pt-8 first:border-t-0 first:pt-0">
      <h3 className="type-h3 text-balance">{title}</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="type-h4 block">
      {label}
      {required ? <span aria-hidden="true"> *</span> : null}
      {optional ? <span className="type-small mt-1 block font-normal text-text-muted-on-light">{optional}</span> : null}
    </label>
  );
}

function FieldMessage({ hint, hintId, error, errorId }: { hint?: string; hintId?: string; error?: string; errorId?: string }) {
  return (
    <>
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
    </>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  optional,
  hint,
  error,
  maxLength,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  required?: boolean;
  optional?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
}) {
  const describedBy = [error ? `${id}-error` : undefined, hint ? `${id}-hint` : undefined].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={controlClass}
      />
      <FieldMessage hint={hint} hintId={`${id}-hint`} error={error} errorId={`${id}-error`} />
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  required,
  autoComplete,
  error,
  className,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  autoComplete?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessage error={error} errorId={`${id}-error`} />
    </div>
  );
}

function TextArea({
  id,
  name,
  label,
  required,
  optional,
  hint,
  error,
  maxLength,
  className,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  optional?: string;
  hint?: string;
  error?: string;
  maxLength: number;
  className?: string;
}) {
  const describedBy = [error ? `${id}-error` : undefined, hint ? `${id}-hint` : undefined].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      <textarea
        id={id}
        name={name}
        required={required}
        maxLength={maxLength}
        rows={6}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${controlClass} min-h-36 py-3`}
      />
      <FieldMessage hint={hint} hintId={`${id}-hint`} error={error} errorId={`${id}-error`} />
    </div>
  );
}

function CheckGroup({
  id,
  legend,
  hint,
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  legend: string;
  hint?: string;
  required?: boolean;
  optional?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      className={`${className ?? ""} scroll-mt-28`}
      aria-describedby={[error ? `${id}-error` : undefined, hint ? `${id}-hint` : undefined].filter(Boolean).join(" ") || undefined}
    >
      <legend className="type-h4">
        {legend}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="type-small mt-1 block font-normal text-text-muted-on-light">{optional}</span> : null}
      </legend>
      <div className="mt-3 grid gap-1 sm:grid-cols-2">{children}</div>
      <FieldMessage hint={hint} hintId={`${id}-hint`} error={error} errorId={`${id}-error`} />
    </fieldset>
  );
}

function CheckItem({
  name,
  value,
  checked,
  disabled,
  label,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
}) {
  const id = `${name}-${value}`;
  return (
    <label htmlFor={id} className="flex min-h-11 items-center gap-3 py-1 text-midnight">
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="size-5 shrink-0 accent-brand-red disabled:opacity-40"
      />
      <span className="type-body">{label}</span>
    </label>
  );
}
