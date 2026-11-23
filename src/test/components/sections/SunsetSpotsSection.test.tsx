import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import SunsetSpotsSection from "@/components/sections/SunsetSpotsSection";
import { SUNSET_SPOTS } from "@/mocks/sunsetSpots";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.SunsetSpots;

describe("SunsetSpotsSection", () => {
  it("should render the section heading", () => {
    renderWithIntl(<SunsetSpotsSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.listTitle }),
    ).toBeInTheDocument();
  });

  it("should render a card for every sunset spot", () => {
    renderWithIntl(<SunsetSpotsSection />);

    SUNSET_SPOTS.forEach(({ name }) => {
      expect(
        screen.getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();
    });
  });

  it("should open each spot in Google Maps in a new tab", () => {
    renderWithIntl(<SunsetSpotsSection />);

    const links = screen.getAllByRole("link", {
      name: new RegExp(`^${t.card.takeMeThere}`),
    });

    expect(links).toHaveLength(SUNSET_SPOTS.length);
    SUNSET_SPOTS.forEach(({ mapUrl }, index) => {
      expect(links[index]).toHaveAttribute("href", mapUrl);
      expect(links[index]).toHaveAttribute("target", "_blank");
      expect(links[index]).toHaveAttribute(
        "rel",
        expect.stringContaining("noopener"),
      );
    });
  });
});