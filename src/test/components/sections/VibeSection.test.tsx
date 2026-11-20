import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeSection from "@/components/sections/VibeSection";
import { VIBES_CONFIG } from "@/mocks/vibes";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe;

describe("VibeSection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<VibeSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render the call to action link", () => {
    renderWithIntl(<VibeSection />);

    expect(screen.getByRole("link", { name: t.cta })).toHaveAttribute(
      "href",
      VIBES_CONFIG.href,
    );
  });

  it("should render every vibe card as a link", () => {
    renderWithIntl(<VibeSection />);

    VIBES_CONFIG.vibes.forEach(({ id, href }) => {
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
