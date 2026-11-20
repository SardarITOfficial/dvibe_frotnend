import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavDropdown from "@/components/layout/NavDropdown";

const items = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "Events", href: "/services/events" },
];

describe("NavDropdown", () => {
  it("should hide the items by default", () => {
    render(<NavDropdown label="Services" items={items} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should show the items when the button is clicked", async () => {
    const user = userEvent.setup();

    render(<NavDropdown label="Services" items={items} />);

    await user.click(screen.getByRole("button", { name: "Services" }));

    items.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    });
  });

  it("should close after selecting an item", async () => {
    const user = userEvent.setup();

    render(<NavDropdown label="Services" items={items} />);

    await user.click(screen.getByRole("button", { name: "Services" }));
    await user.click(screen.getByRole("link", { name: "Events" }));

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should close when clicking outside", async () => {
    const user = userEvent.setup();

    render(<NavDropdown label="Services" items={items} />);

    await user.click(screen.getByRole("button", { name: "Services" }));
    await user.click(document.body);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});