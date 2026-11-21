import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeDetails from "@/components/sections/VibeDetails";
import { VIBE_EVENTS, type VibeEvent } from "@/mocks/vibeEvents";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe;
const [event] = VIBE_EVENTS;

const bareEvent: VibeEvent = {
  ...event,
  endDate: undefined,
  venue: undefined,
  tickets: undefined,
  highlights: undefined,
  policy: undefined,
  booking: undefined,
};

describe("VibeDetails", () => {
  it("should render the event title as the main heading", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(
      screen.getByRole("heading", { level: 1, name: event.title }),
    ).toBeInTheDocument();
  });

  it("should render the description, location and time", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByText(event.time)).toBeInTheDocument();
  });

  it("should link back to the vibe page", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(
      screen.getByRole("link", { name: t.details.back }),
    ).toHaveAttribute("href", "/vibe");
  });

  it("should render the ticket types and the WhatsApp booking link", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.details.booking.title }),
    ).toBeInTheDocument();
    event.tickets?.forEach(({ name, price }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(price)).toBeInTheDocument();
    });
    expect(
      screen
        .getByRole("link", { name: t.details.booking.cta })
        .getAttribute("href"),
    ).toContain("https://wa.me/2389990001");
  });

  it("should render highlights, venue and policy when the event has them", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.details.whatToExpect }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.details.venue.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: t.details.venue.openMap }),
    ).toHaveAttribute("href", event.venue?.mapUrl);
    expect(
      screen.getByRole("heading", { level: 2, name: t.details.policy.title }),
    ).toBeInTheDocument();
  });

  it("should hide every optional section when the event has no data for it", () => {
    renderWithIntl(<VibeDetails event={bareEvent} />);

    [
      t.details.booking.title,
      t.details.whatToExpect,
      t.details.venue.title,
      t.details.policy.title,
    ].forEach((name) => {
      expect(
        screen.queryByRole("heading", { name }),
      ).not.toBeInTheDocument();
    });
  });

  it("should render the share button", () => {
    renderWithIntl(<VibeDetails event={event} />);

    expect(
      screen.getByRole("button", { name: t.details.share.label }),
    ).toBeInTheDocument();
  });
});