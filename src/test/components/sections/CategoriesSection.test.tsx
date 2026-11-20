import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CategoriesSection from "@/components/sections/CategoriesSection";
import { CATEGORIES_CONFIG } from "@/mocks/categories";
import { WEATHER_CONFIG } from "@/mocks/weather";

const { eyebrow, title, slider, categories } = CATEGORIES_CONFIG;

describe("CategoriesSection", () => {
  const scrollBy = vi.fn();

  beforeEach(() => {
    scrollBy.mockClear();
    HTMLElement.prototype.scrollBy = scrollBy;
  });

  it("should render the eyebrow and heading", () => {
    render(<CategoriesSection />);

    expect(screen.getByText(eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it("should render every category link", () => {
    render(<CategoriesSection />);

    categories.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href
      );
    });
  });

  it("should scroll the slider forward and backward", async () => {
    const user = userEvent.setup();

    render(<CategoriesSection />);

    await user.click(screen.getByRole("button", { name: slider.nextLabel }));
    expect(scrollBy).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: 20, behavior: "smooth" })
    );

    await user.click(screen.getByRole("button", { name: slider.prevLabel }));
    expect(scrollBy).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: -20, behavior: "smooth" })
    );
  });

  it("should render the weather strip with every metric", () => {
    render(<CategoriesSection />);

    expect(
      screen.getByRole("heading", { level: 3, name: WEATHER_CONFIG.title })
    ).toBeInTheDocument();

    WEATHER_CONFIG.metrics.forEach(({ value, label }) => {
      expect(screen.getAllByText(value).length).toBeGreaterThan(0);
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });
});