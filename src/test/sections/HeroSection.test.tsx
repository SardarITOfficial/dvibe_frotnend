import { describe, it, expect } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FEATURES } from "@/constants/features";
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

    expect(screen.getByRole("search")).toHaveAttribute("action", search.action);
  });

  it("should render every category link", () => {
    renderWithIntl(<HeroSection />);

    categories.forEach(({ id, href }) => {
      const name = t.categories[id as keyof typeof t.categories];

      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    });
  });

  it("should block the submit and show an error when the form is empty", () => {
    renderWithIntl(<HeroSection />);

    const wasNotPrevented = fireEvent.submit(screen.getByRole("search"));

    expect(wasNotPrevented).toBe(false);
    expect(screen.getByRole("alert")).toHaveTextContent(t.search.error);
  });

  it("should allow the submit when a search term is entered", async () => {
    const user = userEvent.setup();

    renderWithIntl(<HeroSection />);

    await user.type(
      screen.getByRole("searchbox", { name: t.search.inputLabel }),
      "pizza",
    );

    expect(fireEvent.submit(screen.getByRole("search"))).toBe(true);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should clear the error when the user starts typing", async () => {
    const user = userEvent.setup();

    renderWithIntl(<HeroSection />);

    fireEvent.submit(screen.getByRole("search"));
    await user.type(
      screen.getByRole("searchbox", { name: t.search.inputLabel }),
      "a",
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  it("should show the car rental shortcut only when the feature is enabled", () => {
    renderWithIntl(<HeroSection />);

    const link = screen.queryByRole("link", {
      name: t.categories["car-rental"],
    });

    expect(link !== null).toBe(FEATURES.carRental);
  });
  it("should render the search form outside the hero image section", () => {
    renderWithIntl(<HeroSection />);

    const hero = screen.getByRole("region", { name: t.heading });

    expect(within(hero).queryByRole("search")).not.toBeInTheDocument();
    expect(screen.getByRole("search")).toBeInTheDocument();
  });
});
