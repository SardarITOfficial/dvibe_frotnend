import { FiMinus, FiPlus } from "react-icons/fi";

type QuantityStepperProps = {
  quantity: number;
  max?: number;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (quantity: number) => void;
  className?: string;
};

const BUTTON_CLASSES =
  "flex size-8 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40";

export function QuantityStepper({
  quantity,
  max,
  decreaseLabel,
  increaseLabel,
  onChange,
  className,
}: QuantityStepperProps) {
  const classes = [
    "inline-flex items-center gap-1 rounded-full border border-border bg-background p-1",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <button
        type="button"
        aria-label={decreaseLabel}
        className={BUTTON_CLASSES}
        onClick={() => onChange(quantity - 1)}
      >
        <FiMinus size={16} aria-hidden />
      </button>
      <span
        aria-live="polite"
        className="min-w-6 text-center text-sm font-semibold text-charcoal"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label={increaseLabel}
        className={BUTTON_CLASSES}
        disabled={max !== undefined && quantity >= max}
        onClick={() => onChange(quantity + 1)}
      >
        <FiPlus size={16} aria-hidden />
      </button>
    </div>
  );
}