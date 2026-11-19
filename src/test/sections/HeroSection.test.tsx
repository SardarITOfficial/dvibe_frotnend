import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import HeroSection from "@/components/sections/HeroSection";
import { HERO_CONFIG } from "@/mocks/hero";

const { image, badge, heading, search, categories } = HERO_CONFIG;

describe("HeroSection", () => {
  it("should render the main heading", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: heading })
    ).toBeInTheDocument();
  });

  it("should render the welcome badge", () => {
    render(<HeroSection />);

    expect(screen.getByText(badge)).toBeInTheDocument();
  });

  it("should render the background image", () => {
    render(<HeroSection />);

    expect(screen.getByAltText(image.alt)).toBeInTheDocument();
  });

  it("should render the location select", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("combobox", { name: search.locationLabel })
    ).toBeInTheDocument();
  });

  it("should render the search input and submit button", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("searchbox", { name: search.inputLabel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: search.submitLabel })
    ).toHaveAttribute("type", "submit");
  });

  it("should submit the search form to the configured action", () => {
    render(<HeroSection />);

    expect(screen.getByRole("search")).toHaveAttribute(
      "action",
      search.action
    );
  });

  it("should render every category link", () => {
    render(<HeroSection />);

    categories.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href
      );
    });
  });
});