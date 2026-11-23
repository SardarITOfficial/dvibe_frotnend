"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";

import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/Button";
import { useFormErrors } from "@/hooks/useFormErrors";
import { AuthError, register } from "@/lib/api/auth";
import { useRouter } from "@/lib/i18n/navigation";
import { getInvalidFields } from "@/utils/validation";
import { signupSchema } from "@/validations";

export default function SignupForm() {
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
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      password: String(data.get("password") ?? ""),
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    };

    const invalid = getInvalidFields(signupSchema, values);

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
      await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      router.push("/login");
    } catch (error) {
      const isTaken = error instanceof AuthError && error.code === "email-taken";

      setFieldError(
        "form",
        t(isTaken ? "errors.emailTaken" : "errors.generic"),
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField
        name="name"
        autoComplete="name"
        label={t("fields.name")}
        icon={<FiUser size={16} strokeWidth={1.5} />}
        error={errors.name}
        onChange={clearFieldError("name")}
      />
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
        name="phone"
        type="tel"
        autoComplete="tel"
        label={t("fields.phone")}
        icon={<FiPhone size={16} strokeWidth={1.5} />}
        error={errors.phone}
        onChange={clearFieldError("phone")}
      />
      <FormField
        name="password"
        type="password"
        autoComplete="new-password"
        label={t("fields.password")}
        icon={<FiLock size={16} strokeWidth={1.5} />}
        error={errors.password}
        onChange={clearFieldError("password")}
      />
      <FormField
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        label={t("fields.confirmPassword")}
        icon={<FiLock size={16} strokeWidth={1.5} />}
        error={errors.confirmPassword}
        onChange={clearFieldError("confirmPassword")}
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
        {t("signup.submit")}
      </Button>
    </form>
  );
}