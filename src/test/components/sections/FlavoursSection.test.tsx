import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import FlavoursSection from "@/components/sections/FlavoursSection";
import { FLAVOURS_CONFIG } from "@/mocks/flavours";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Flavours;

describe("FlavoursSection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<FlavoursSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render the call to action link", () => {
    renderWithIntl(<FlavoursSection />);

    expect(screen.getByRole("link", { name: t.cta })).toHaveAttribute(
      "href",
      FLAVOURS_CONFIG.href,
    );
  });

  it("should render every flavour label", () => {
    renderWithIntl(<FlavoursSection />);

    FLAVOURS_CONFIG.flavours.forEach(({ id }) => {
      expect(
        screen.getByText(t.items[id as keyof typeof t.items]),
      ).toBeInTheDocument();
    });
  });
});