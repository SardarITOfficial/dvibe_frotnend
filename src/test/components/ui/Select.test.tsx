import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "@/components/ui/Select";

const OPTIONS = [
  { label: "Mindelo", value: "mindelo" },
  { label: "Calhau", value: "calhau" },
];

describe("Select", () => {
  it("should hide the options until it is opened", async () => {
    const user = userEvent.setup();

    render(<Select aria-label="Location" options={OPTIONS} />);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(screen.getByRole("combobox", { name: "Location" }));

    expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
  });

  it("should show the placeholder and submit an empty value by default", () => {
    const { container } = render(
      <Select
        name="location"
        aria-label="Location"
        placeholder="Choose your location"
        options={OPTIONS}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Choose your location",
    );
    expect(container.querySelector('input[name="location"]')).toHaveValue("");
  });

  it("should update the label and form value when an option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(
      <Select
        name="location"
        aria-label="Location"
        placeholder="Choose your location"
        options={OPTIONS}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Calhau" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Calhau");
    expect(container.querySelector('input[name="location"]')).toHaveValue(
      "calhau",
    );
    expect(handleChange).toHaveBeenCalledWith("calhau");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should mark the selected option", async () => {
    const user = userEvent.setup();

    render(
      <Select
        aria-label="Location"
        options={OPTIONS}
        defaultValue="mindelo"
      />,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "Mindelo" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("should close when clicking outside", async () => {
    const user = userEvent.setup();

    render(<Select aria-label="Location" options={OPTIONS} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(document.body);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should close when pressing Escape", async () => {
    const user = userEvent.setup();

    render(<Select aria-label="Location" options={OPTIONS} />);

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should be operable with the keyboard", async () => {
    const user = userEvent.setup();

    render(<Select aria-label="Location" options={OPTIONS} />);

    await user.tab();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(screen.getByRole("combobox")).toHaveTextContent("Calhau");
  });

  it("should render the icon", () => {
    render(
      <Select
        aria-label="Location"
        options={OPTIONS}
        icon={<svg data-testid="icon" />}
      />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is passed", () => {
    render(<Select aria-label="Location" options={OPTIONS} disabled />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});