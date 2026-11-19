import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "accent" | "soft" | "glass";
type ButtonSize = "sm" | "md" | "lg";

type ButtonAsButtonProps = ComponentProps<"button"> & {
  href?: undefined;
};

type ButtonAsLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

type ButtonProps = (ButtonAsButtonProps | ButtonAsLinkProps) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-80";

const VARIANT_CLASSES: Record<
  ButtonVariant,
  { look: string; lgSpacing: string }
> = {
  accent: {
    look: "bg-accent text-background",
    lgSpacing: "px-6 text-lg font-semibold",
  },
  soft: {
    look: "bg-accent-soft text-ink",
    lgSpacing: "p-4 text-base font-medium",
  },
  glass: {
    look: "border-[0.5px] border-stroke bg-background/5 text-background backdrop-blur-md",
    lgSpacing: "px-6 text-base font-medium",
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8.25 gap-3 px-3 text-xs font-normal leading-3.75",
  md: "h-11 gap-2 px-4 text-base font-medium leading-5",
  lg: "h-14 gap-3",
};

export function Button({
  variant,
  size = "lg",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    variant && BASE_CLASSES,
    variant && VARIANT_CLASSES[variant].look,
    variant &&
      (size === "lg"
        ? `${SIZE_CLASSES.lg} ${VARIANT_CLASSES[variant].lgSpacing}`
        : SIZE_CLASSES[size]),
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