import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import IslandSection from "@/components/sections/IslandSection";
import { ISLAND_CONFIG } from "@/mocks/island";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Island;

describe("IslandSection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<IslandSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render the call to action link", () => {
    renderWithIntl(<IslandSection />);

    expect(screen.getByRole("link", { name: t.cta })).toHaveAttribute(
      "href",
      ISLAND_CONFIG.href,
    );
  });

  it("should render every place card as a link", () => {
    renderWithIntl(<IslandSection />);

    ISLAND_CONFIG.places.forEach(({ id, href }) => {
      const item = t.items[id as keyof typeof t.items];

      expect(
        screen.getByRole("heading", { level: 3, name: item.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: new RegExp(item.title) }),
      ).toHaveAttribute("href", href);
    });
  });
});