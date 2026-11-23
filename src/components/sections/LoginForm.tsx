"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiLock, FiMail } from "react-icons/fi";

import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/Button";
import { useFormErrors } from "@/hooks/useFormErrors";
import { AuthError, login } from "@/lib/api/auth";
import { useRouter } from "@/lib/i18n/navigation";
import { getInvalidFields } from "@/utils/validation";
import { loginSchema } from "@/validations";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { errors, setMultipleErrors, setFieldError, clearError } =
    useFormErrors();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field: string) => () => {
    clearError(field);
    clearError("form");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const data = new FormData(event.currentTarget);
    const values = {
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    };

    const invalid = getInvalidFields(loginSchema, values);

    if (invalid.length > 0) {
      setMultipleErrors(
        Object.fromEntries(
          invalid.map((field) => [field, t(`errors.${field}`)]),
        ),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await login(values);
      router.push("/");
    } catch (error) {
      const isInvalid =
        error instanceof AuthError && error.code === "invalid-credentials";

      setFieldError(
        "form",
        t(isInvalid ? "errors.invalidCredentials" : "errors.generic"),
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField
        name="email"
        type="email"
        autoComplete="email"
        label={t("fields.email")}
        icon={<FiMail size={16} strokeWidth={1.5} />}
        error={errors.email}
        onChange={clearFieldError("email")}
      />
      <FormField
        name="password"
        type="password"
        autoComplete="current-password"
        label={t("fields.password")}
        icon={<FiLock size={16} strokeWidth={1.5} />}
        error={errors.password}
        onChange={clearFieldError("password")}
      />

      {errors.form && (
        <p role="alert" className="text-sm font-medium text-danger">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        disabled={isSubmitting}
        className="w-full"
      >
        {t("login.submit")}
      </Button>
    </form>
  );
}