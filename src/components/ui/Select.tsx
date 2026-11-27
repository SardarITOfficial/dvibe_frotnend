"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

import { useClickOutside } from "@/hooks/useClickOutside";

type SelectVariant = "bare" | "field";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  name?: string;
  placeholder?: string;
  variant?: SelectVariant;
  icon?: ReactNode;
  wrapperClassName?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  "aria-label"?: string;
};

const VARIANT_CLASSES: Record<SelectVariant, string> = {
  bare: "h-full min-w-0 flex-1 pr-8 text-sm leading-4.5",
  field: "h-full min-w-0 flex-1 pr-10 text-sm font-medium",
};

const VARIANT_WRAPPER_CLASSES: Partial<Record<SelectVariant, string>> = {
  field: "h-12 w-full rounded-full border border-border bg-background pl-4",
};

export function Select({
  options,
  name,
  placeholder,
  variant,
  icon,
  wrapperClassName,
  className,
  value,
  defaultValue = "",
  disabled,
  onChange,
  "aria-label": ariaLabel,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const currentValue = value ?? internalValue;
  const selectedOption = options.find(
    (option) => option.value === currentValue,
  );

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, close);

  function open() {
    const selectedIndex = options.findIndex(
      (option) => option.value === currentValue,
    );

    setActiveIndex(Math.max(selectedIndex, 0));
    setIsOpen(true);
  }

  function select(option: SelectOption) {
    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
    close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      close();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!isOpen) {
        open();
        return;
      }

      setActiveIndex((previous) =>
        event.key === "ArrowDown"
          ? Math.min(previous + 1, options.length - 1)
          : Math.max(previous - 1, 0),
      );
      return;
    }

    if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      select(options[activeIndex]);
    }
  }

  const triggerClasses = [
    "flex cursor-pointer items-center text-left outline-none disabled:cursor-not-allowed",
    variant && VARIANT_CLASSES[variant],
    selectedOption ? "text-ink" : "text-subtle",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={[
        "relative flex items-center gap-3",
        variant && VARIANT_WRAPPER_CLASSES[variant],
        wrapperClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && (
        <span aria-hidden className="shrink-0 text-subtle">
          {icon}
        </span>
      )}

      {name && <input type="hidden" name={name} value={currentValue} />}

      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        className={triggerClasses}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
      </button>

      <FiChevronDown
        aria-hidden
        size={16}
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle transition-transform ${isOpen ? "rotate-180" : ""}`}
      />

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-20 mt-3 w-full min-w-56 rounded-2xl bg-background p-2 shadow-lg"
        >
          {options.map((option, index) => {
            const isSelected = option.value === currentValue;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  isSelected ? "text-accent" : "text-ink"
                } ${index === activeIndex ? "bg-accent-soft" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(option)}
              >
                {option.label}
                {isSelected && <FiCheck size={16} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
