import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../../../components/ui/Button";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(<Button>Submit</Button>);

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    await user.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should forward native button props", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Submit form" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("should render a link when href is provided", () => {
    render(<Button href="/login">Login</Button>);

    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should apply variant classes to a button", () => {
    render(<Button variant="accent">Login</Button>);

    expect(screen.getByRole("button", { name: "Login" })).toHaveClass(
      "bg-accent",
      "rounded-full",
    );
  });

  it("should apply variant classes to a link", () => {
    render(
      <Button href="/login" variant="soft">
        Login
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Login" })).toHaveClass(
      "bg-accent-soft",
      "rounded-full",
    );
  });

  it("should not add any classes when no variant is given", () => {
    render(<Button className="p-2">Plain</Button>);

    expect(screen.getByRole("button", { name: "Plain" }).className).toBe("p-2");
  });

  it("should apply the glass variant", () => {
    render(<Button variant="glass">Chip</Button>);

    expect(screen.getByRole("button", { name: "Chip" })).toHaveClass(
      "bg-background/5",
      "backdrop-blur-md",
    );
  });

  it("should apply the requested size", () => {
    render(
      <Button variant="accent" size="md">
        Search
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Search" })).toHaveClass(
      "gap-2",
      "text-base",
      "font-medium",
    );
  });

  it("should use the large size by default", () => {
    render(<Button variant="accent">Login</Button>);

    expect(screen.getByRole("button", { name: "Login" })).toHaveClass(
      "gap-3",
      "px-6",
      "py-3",
    );
  });

  it("should apply the outline variant", () => {
    render(<Button variant="outline">Back</Button>);

    expect(screen.getByRole("button", { name: "Back" })).toHaveClass(
      "border-2",
      "border-accent",
    );
  });

  it("should apply the icon-wide size", () => {
    render(
      <Button variant="accent" size="icon-wide" aria-label="Next">
        →
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Next" })).toHaveClass(
      "h-11.25",
      "w-20.5",
    );
  });
});
