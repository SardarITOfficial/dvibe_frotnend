import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "@/components/ui/Select";

const OPTIONS = [
  { label: "Mindelo", value: "mindelo" },
  { label: "Calhau", value: "calhau" },
];

describe("Select", () => {
  it("should render the select with its options", () => {
    render(<Select aria-label="Location" options={OPTIONS} />);

    expect(screen.getByRole("combobox", { name: "Location" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mindelo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Calhau" })).toBeInTheDocument();
  });

  it("should have an empty value when a placeholder is provided", () => {
    render(
      <Select
        aria-label="Location"
        placeholder="Choose your location"
        options={OPTIONS}
      />
    );

    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("should change value when the user selects an option", async () => {
    const user = userEvent.setup();

    render(
      <Select
        aria-label="Location"
        placeholder="Choose your location"
        options={OPTIONS}
      />
    );

    await user.selectOptions(screen.getByRole("combobox"), "calhau");

    expect(screen.getByRole("combobox")).toHaveValue("calhau");
  });

  it("should render the icon", () => {
    render(
      <Select
        aria-label="Location"
        options={OPTIONS}
        icon={<svg data-testid="icon" />}
      />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is passed", () => {
    render(<Select aria-label="Location" options={OPTIONS} disabled />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});