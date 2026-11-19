import type { ReactNode, SelectHTMLAttributes } from "react";
import { FiChevronDown } from "react-icons/fi";

type SelectVariant = "bare";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  options: SelectOption[];
  placeholder?: string;
  variant?: SelectVariant;
  icon?: ReactNode;
  wrapperClassName?: string;
};

const VARIANT_CLASSES: Record<SelectVariant, string> = {
  bare: "h-full min-w-0 flex-1 appearance-none bg-transparent pr-8 text-sm leading-4.5 text-ink outline-none has-[option:disabled:checked]:text-subtle",
};

export function Select({
  options,
  placeholder,
  variant,
  icon,
  wrapperClassName,
  className,
  defaultValue,
  ...props
}: SelectProps) {
  const classes = [variant && VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(" ");

  const initialValue =
    props.value === undefined
      ? (defaultValue ?? (placeholder ? "" : undefined))
      : undefined;

  return (
    <div
      className={["relative flex items-center gap-3", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && (
        <span aria-hidden className="shrink-0 text-subtle">
          {icon}
        </span>
      )}

      <select
        {...props}
        defaultValue={initialValue}
        className={classes || undefined}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FiChevronDown
        aria-hidden
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle"
      />
    </div>
  );
}