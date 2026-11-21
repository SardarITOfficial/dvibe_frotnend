import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuantityStepper } from "@/components/ui/QuantityStepper";

const labels = { decreaseLabel: "Decrease", increaseLabel: "Increase" };

describe("QuantityStepper", () => {
  it("calls onChange with the next quantity", () => {
    const onChange = vi.fn();
    render(<QuantityStepper quantity={2} onChange={onChange} {...labels} />);

    fireEvent.click(screen.getByLabelText("Increase"));
    fireEvent.click(screen.getByLabelText("Decrease"));

    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 1);
  });

  it("disables increase at the max quantity", () => {
    render(
      <QuantityStepper quantity={5} max={5} onChange={vi.fn()} {...labels} />,
    );

    expect(
      (screen.getByLabelText("Increase") as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});