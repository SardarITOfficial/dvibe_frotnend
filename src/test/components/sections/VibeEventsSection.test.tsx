import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeEventsSection from "@/components/sections/VibeEventsSection";
import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe;

describe("VibeEventsSection", () => {
  it("should render every event when no category is selected", () => {
    renderWithIntl(<VibeEventsSection filter="all" />);

    VIBE_EVENTS.forEach(({ title }) => {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    });
  });

  it("should render only the selected category", () => {
    renderWithIntl(<VibeEventsSection filter="events" />);

    VIBE_EVENTS.forEach(({ title, category }) => {
      const heading = screen.queryByRole("heading", { level: 3, name: title });

      if (category === "events") {
        expect(heading).toBeInTheDocument();
      } else {
        expect(heading).not.toBeInTheDocument();
      }
    });
  });

  it("should mark the active filter as the current page", () => {
    renderWithIntl(<VibeEventsSection filter="events" />);

    expect(
      screen.getByRole("link", { name: t.items.events.title }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: t.page.all })).not.toHaveAttribute(
      "aria-current",
    );
  });
});