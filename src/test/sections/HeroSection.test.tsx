import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import HeroSection from "@/components/sections/HeroSection";
import { HERO_CONFIG } from "@/mocks/hero";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const { search, categories } = HERO_CONFIG;
const t = messages.Hero;

describe("HeroSection", () => {
  it("should render the main heading", () => {
    renderWithIntl(<HeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: t.heading }),
    ).toBeInTheDocument();
  });

  it("should render the welcome badge", () => {
    renderWithIntl(<HeroSection />);

    expect(screen.getByText(t.badge)).toBeInTheDocument();
  });

  it("should render the background image", () => {
    renderWithIntl(<HeroSection />);

    expect(screen.getByAltText(t.imageAlt)).toBeInTheDocument();
  });

  it("should render the location select", () => {
    renderWithIntl(<HeroSection />);

    expect(
      screen.getByRole("combobox", { name: t.search.locationLabel }),
    ).toHaveTextContent(t.search.locationPlaceholder);
  });

  it("should render the search input and submit button", () => {
    renderWithIntl(<HeroSection />);

    expect(
      screen.getByRole("searchbox", { name: t.search.inputLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: t.search.submitLabel }),
    ).toHaveAttribute("type", "submit");
  });

  it("should submit the search form to the configured action", () => {
    renderWithIntl(<HeroSection />);

    expect(screen.getByRole("search")).toHaveAttribute(
      "action",
      search.action,
    );
  });

  it("should render every category link", () => {
    renderWithIntl(<HeroSection />);

    categories.forEach(({ id, href }) => {
      const name = t.categories[id as keyof typeof t.categories];

      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    });
  });
});