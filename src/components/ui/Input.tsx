import type { InputHTMLAttributes, ReactNode } from "react";

type InputVariant = "bare";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  icon?: ReactNode;
  wrapperClassName?: string;
};

const VARIANT_CLASSES: Record<InputVariant, string> = {
  bare: "h-full min-w-0 flex-1 bg-transparent text-sm leading-4.5 text-ink outline-none placeholder:text-subtle",
};

export function Input({
  type = "text",
  variant,
  icon,
  wrapperClassName,
  className,
  ...props
}: InputProps) {
  const classes = [variant && VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(" ");

  const input = (
    <input type={type} className={classes || undefined} {...props} />
  );

  if (!icon) {
    return input;
  }

  return (
    <div
      className={["flex items-center gap-3", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden className="shrink-0 text-subtle">
        {icon}
      </span>
      {input}
    </div>
  );
}