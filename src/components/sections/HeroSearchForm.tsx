"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiMapPin, FiSearch } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useFormErrors } from "@/hooks/useFormErrors";
import { HERO_CONFIG } from "@/mocks/hero";
import { searchSchema } from "@/validations";

const ERROR_ID = "hero-search-error";

export default function HeroSearchForm() {
  const t = useTranslations("Hero");
  const { errors, setFieldError, clearAllErrors } = useFormErrors();

  const { search } = HERO_CONFIG;

  const locations = search.locations.map((id) => ({
    value: id,
    label: t(`locations.${id}`),
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);

    const values = {
      location: String(data.get(search.locationName) ?? ""),
      q: String(data.get(search.inputName) ?? ""),
    };

    if (!searchSchema.isValidSync(values)) {
      event.preventDefault();
      setFieldError("form", t("search.error"));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        action={search.action}
        method="get"
        role="search"
        noValidate
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 rounded-3xl bg-background p-2 sm:flex-row sm:items-center sm:gap-6 sm:rounded-full sm:py-1"
      >
        <div className="flex min-w-0 flex-col sm:flex-1 sm:flex-row sm:items-center">
          <Select
            name={search.locationName}
            aria-label={t("search.locationLabel")}
            placeholder={t("search.locationPlaceholder")}
            options={locations}
            variant="bare"
            icon={<FiMapPin size={16} strokeWidth={1.5} />}
            onChange={clearAllErrors}
            wrapperClassName="h-12.5 w-full shrink-0 border-b-[0.2px] border-subtle pl-4 sm:w-[219.2px] sm:border-b-0 sm:border-r-[0.2px]"
          />

          <Input
            name={search.inputName}
            type="search"
            aria-label={t("search.inputLabel")}
            aria-invalid={Boolean(errors.form)}
            aria-describedby={errors.form ? ERROR_ID : undefined}
            placeholder={t("search.inputPlaceholder")}
            variant="bare"
            icon={<FiSearch size={16} strokeWidth={1.5} />}
            onChange={clearAllErrors}
            wrapperClassName="h-12.5 min-w-0 px-4 sm:flex-1"
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          size="md"
          className="w-full sm:w-auto"
        >
          {t("search.submitLabel")}
        </Button>
      </form>
      {errors.form && (
        <p
          id={ERROR_ID}
          role="alert"
          className="w-fit rounded-full px-4 py-1 text-sm font-medium text-danger"
        >
          {errors.form}
        </p>
      )}
    </div>
  );
}
