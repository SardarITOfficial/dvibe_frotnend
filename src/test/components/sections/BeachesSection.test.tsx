import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import BeachesSection from "@/components/sections/BeachesSection";
import { BEACHES } from "@/mocks/beaches";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Beaches;

describe("BeachesSection", () => {
  it("should render the section heading", () => {
    renderWithIntl(<BeachesSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.listTitle }),
    ).toBeInTheDocument();
  });

  it("should render a card for every beach", () => {
    renderWithIntl(<BeachesSection />);

    BEACHES.forEach(({ name }) => {
      expect(
        screen.getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();
    });
  });

  it("should show the highlight of each beach", () => {
    renderWithIntl(<BeachesSection />);

    expect(screen.getAllByText(t.highlights["calm-water"])).toHaveLength(
      BEACHES.filter(({ highlight }) => highlight === "calm-water").length,
    );
    expect(screen.getByText(t.highlights.windsurf)).toBeInTheDocument();
  });

  it("should open each beach in Google Maps in a new tab", () => {
    renderWithIntl(<BeachesSection />);

    const links = screen.getAllByRole("link", {
      name: new RegExp(`^${t.card.takeMeThere}`),
    });

    expect(links).toHaveLength(BEACHES.length);
    BEACHES.forEach(({ mapUrl }, index) => {
      expect(links[index]).toHaveAttribute("href", mapUrl);
      expect(links[index]).toHaveAttribute("target", "_blank");
      expect(links[index]).toHaveAttribute(
        "rel",
        expect.stringContaining("noopener"),
      );
    });
  });
});