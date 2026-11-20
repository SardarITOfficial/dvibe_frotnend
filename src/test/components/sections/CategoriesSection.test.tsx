import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CategoriesSection from "@/components/sections/CategoriesSection";
import { CATEGORIES_CONFIG } from "@/mocks/categories";
import { WEATHER_CONFIG } from "@/mocks/weather";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const { categories } = CATEGORIES_CONFIG;
const t = messages.Categories;
const w = messages.Weather;

describe("CategoriesSection", () => {
  const scrollBy = vi.fn();

  beforeEach(() => {
    scrollBy.mockClear();
    HTMLElement.prototype.scrollBy = scrollBy;
  });

  it("should render the eyebrow and heading", () => {
    renderWithIntl(<CategoriesSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render every category link", () => {
    renderWithIntl(<CategoriesSection />);

    categories.forEach(({ id, href }) => {
      const name = t.items[id as keyof typeof t.items];

      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    });
  });

  it("should scroll the slider forward and backward", async () => {
    const user = userEvent.setup();

    renderWithIntl(<CategoriesSection />);

    await user.click(
      screen.getByRole("button", { name: t.slider.nextLabel }),
    );
    expect(scrollBy).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: 20, behavior: "smooth" }),
    );

    await user.click(
      screen.getByRole("button", { name: t.slider.prevLabel }),
    );
    expect(scrollBy).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: -20, behavior: "smooth" }),
    );
  });

  it("should render the weather strip with every metric", () => {
    renderWithIntl(<CategoriesSection />);

    expect(
      screen.getByRole("heading", { level: 3, name: w.title }),
    ).toBeInTheDocument();

    const weatherList = within(screen.getAllByRole("list").at(-1)!);

    WEATHER_CONFIG.metrics.forEach(({ id, value }) => {
      expect(weatherList.getByText(value)).toBeInTheDocument();
      expect(
        weatherList.getByText(w.metrics[id as keyof typeof w.metrics]),
      ).toBeInTheDocument();
    });
  });
});