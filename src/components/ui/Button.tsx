import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "accent" | "soft" | "glass" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon-wide";

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
  "inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-80 cursor-pointer";

const VARIANT_CLASSES: Record<
  ButtonVariant,
  { look: string; lgSpacing: string }
> = {
  accent: {
    look: "bg-accent text-background",
    lgSpacing: "px-6 py-3 text-md font-semibold",
  },
  soft: {
    look: "bg-accent-soft text-ink",
    lgSpacing: "px-6 py-3 text-base font-medium",
  },
  glass: {
    look: "border-[0.5px] border-stroke bg-background/5 text-background backdrop-blur-md",
    lgSpacing: "px-6 py-3 text-base font-medium",
  },
  outline: {
    look: "border-2 border-accent bg-background/54 text-accent",
    lgSpacing: "px-6 py-3 text-base font-medium",
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: " gap-3 px-4 py-2 text-xs font-normal leading-3.75",
  md: " gap-2 px-6 py-3 text-base font-medium leading-5",
  lg: " gap-3",
  "icon-wide": "h-11.25 w-20.5",
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
