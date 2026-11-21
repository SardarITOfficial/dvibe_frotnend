import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeDetails from "@/components/sections/VibeDetails";
import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe;
const [event] = VIBE_EVENTS;

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
});