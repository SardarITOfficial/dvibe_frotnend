import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import ToursSection from "@/components/sections/ToursSection";
import { TOURS } from "@/mocks/tours";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Tours;

const getName = (id: string) => t.items[id as keyof typeof t.items].name;

describe("ToursSection", () => {
  it("should render the section heading", () => {
    renderWithIntl(<ToursSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.listTitle }),
    ).toBeInTheDocument();
  });

  it("should render a card for every tour", () => {
    renderWithIntl(<ToursSection />);

    TOURS.forEach(({ id }) => {
      expect(
        screen.getByRole("heading", { level: 3, name: getName(id) }),
      ).toBeInTheDocument();
    });
  });

  it("should link every card to its tour page", () => {
    renderWithIntl(<ToursSection />);

    const links = screen.getAllByRole("link", {
      name: new RegExp(`^${t.card.viewDetails}`),
    });

    expect(links).toHaveLength(TOURS.length);
    TOURS.forEach(({ id }, index) => {
      expect(links[index]).toHaveAttribute("href", `/tours/${id}`);
    });
  });
});