import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import VibeCountdown from "@/components/sections/VibeCountdown";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe.details.countdown;

describe("VibeCountdown", () => {
  it("should render every unit for a future event", () => {
    renderWithIntl(<VibeCountdown date="2999-01-01" time="20:00" />);

    expect(screen.getByText(t.label)).toBeInTheDocument();
    [t.days, t.hours, t.minutes, t.seconds].forEach((unit) => {
      expect(screen.getByText(unit)).toBeInTheDocument();
    });
  });

  it("should render nothing once the event has started", () => {
    renderWithIntl(<VibeCountdown date="2000-01-01" time="20:00" />);

    expect(screen.queryByText(t.label)).not.toBeInTheDocument();
  });
});