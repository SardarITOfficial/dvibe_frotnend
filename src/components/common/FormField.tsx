"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Input } from "@/components/ui/Input";

type FormFieldProps = {
  name: string;
  label: string;
  icon: ReactNode;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: () => void;
};

export default function FormField({
  name,
  label,
  icon,
  error,
  type = "text",
  autoComplete,
  onChange,
}: FormFieldProps) {
  const t = useTranslations("Auth");
  const [isVisible, setIsVisible] = useState(false);

  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <div
        className={[
          "flex h-12 items-center gap-3 rounded-xl border bg-background px-4 transition-colors focus-within:border-accent",
          error ? "border-danger" : "border-border",
        ].join(" ")}
      >
        <span aria-hidden className="shrink-0 text-subtle">
          {icon}
        </span>
        <Input
          id={id}
          name={name}
          type={isPassword && isVisible ? "text" : type}
          autoComplete={autoComplete}
          variant="bare"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={isVisible ? t("hidePassword") : t("showPassword")}
            onClick={() => setIsVisible((previous) => !previous)}
            className="shrink-0 cursor-pointer text-subtle transition-colors hover:text-accent"
          >
            {isVisible ? (
              <FiEyeOff size={16} aria-hidden />
            ) : (
              <FiEye size={16} aria-hidden />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}