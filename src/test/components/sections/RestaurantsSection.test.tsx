import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";

import RestaurantsSection from "@/components/sections/RestaurantsSection";
import { RESTAURANTS_CONFIG } from "@/mocks/restaurants";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Restaurants;

describe("RestaurantsSection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<RestaurantsSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render the call to action link", () => {
    renderWithIntl(<RestaurantsSection />);

    expect(screen.getByRole("link", { name: t.cta })).toHaveAttribute(
      "href",
      RESTAURANTS_CONFIG.href,
    );
  });

  it("should render every restaurant card", () => {
    renderWithIntl(<RestaurantsSection />);

    RESTAURANTS_CONFIG.restaurants.forEach(
      ({ id, name, location, hours, href }) => {
        const card = within(
          screen
            .getByRole("heading", { level: 3, name })
            .closest("article") as HTMLElement,
        );

        expect(
          card.getByText(t.items[id as keyof typeof t.items]),
        ).toBeInTheDocument();
        expect(card.getByText(location)).toBeInTheDocument();
        expect(
          card.getByText(`${t.days} ${hours}`, { exact: false }),
        ).toBeInTheDocument();
        expect(
          card.getByRole("link", {
            name: t.viewMenuLabel.replace("{name}", name),
          }),
        ).toHaveAttribute("href", href);
      },
    );
  });
});