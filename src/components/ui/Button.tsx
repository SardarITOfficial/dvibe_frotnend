import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "accent" | "soft";

type ButtonAsButtonProps = ComponentProps<"button"> & {
  href?: undefined;
};

type ButtonAsLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

type ButtonProps = (ButtonAsButtonProps | ButtonAsLinkProps) & {
  variant?: ButtonVariant;
};

const BASE_CLASSES =
  "inline-flex  items-center justify-center gap-3 rounded-full transition-opacity hover:opacity-80 cursor-pointer";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  accent: "bg-accent px-6 py-3 text-base font-semibold text-background",
  soft: "bg-accent-soft px-6 py-3 text-base font-medium text-ink",
};

export function Button({
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    variant && BASE_CLASSES,
    variant && VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}