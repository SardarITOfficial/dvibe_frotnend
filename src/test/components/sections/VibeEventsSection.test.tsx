import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeEventsSection from "@/components/sections/VibeEventsSection";
import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe;
const TODAY = "2026-11-21";

const getEventHeading = (title: string) =>
  screen.queryByRole("heading", { level: 3, name: title });

describe("VibeEventsSection", () => {
  it("should render every upcoming event by default", () => {
    renderWithIntl(
      <VibeEventsSection category="all" time="upcoming" today={TODAY} />,
    );

    VIBE_EVENTS.forEach(({ title }) => {
      expect(getEventHeading(title)).toBeInTheDocument();
    });
  });

  it("should render only the selected category", () => {
    renderWithIntl(
      <VibeEventsSection category="events" time="upcoming" today={TODAY} />,
    );

    VIBE_EVENTS.forEach(({ title, category }) => {
      if (category === "events") {
        expect(getEventHeading(title)).toBeInTheDocument();
      } else {
        expect(getEventHeading(title)).not.toBeInTheDocument();
      }
    });
  });

  it("should render only events on the selected day", () => {
    renderWithIntl(
      <VibeEventsSection category="all" time="today" today={TODAY} />,
    );

    VIBE_EVENTS.forEach(({ title, date }) => {
      if (date === TODAY) {
        expect(getEventHeading(title)).toBeInTheDocument();
      } else {
        expect(getEventHeading(title)).not.toBeInTheDocument();
      }
    });
  });

  it("should render the empty message when nothing matches", () => {
    renderWithIntl(
      <VibeEventsSection category="nightlife" time="today" today={TODAY} />,
    );

    expect(screen.getByText(t.page.empty)).toBeInTheDocument();
  });

  it("should mark the active category and time filters", () => {
    renderWithIntl(
      <VibeEventsSection category="events" time="weekend" today={TODAY} />,
    );

    expect(
      screen.getByRole("link", { name: t.items.events.title }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", { name: new RegExp(`^${t.page.time.weekend}`) }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", { name: new RegExp(`^${t.page.time.today}`) }),
    ).not.toHaveAttribute("aria-current");
  });

  it("should keep the selected category in the time filter links", () => {
    renderWithIntl(
      <VibeEventsSection category="events" time="upcoming" today={TODAY} />,
    );

    expect(
      screen.getByRole("link", {
        name: new RegExp(`^${t.page.time.tomorrow}`),
      }),
    ).toHaveAttribute("href", "/vibe?category=events&when=tomorrow");
  });

  it("should link every event card to its event page", () => {
    renderWithIntl(
      <VibeEventsSection category="all" time="upcoming" today={TODAY} />,
    );

    const links = screen.getAllByRole("link", {
      name: new RegExp(`^${t.card.takeMeThere}`),
    });

    expect(links).toHaveLength(VIBE_EVENTS.length);
    VIBE_EVENTS.forEach(({ id }) => {
      expect(
        links.some((link) => link.getAttribute("href") === `/vibe/${id}`),
      ).toBe(true);
    });
  });
});
