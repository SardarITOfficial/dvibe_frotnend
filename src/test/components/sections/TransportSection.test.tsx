import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { FEATURES } from "@/constants/features";
import TransportSection from "@/components/sections/TransportSection";
import { TRANSPORT_CONFIG } from "@/mocks/transport";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Transport;

describe("TransportSection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<TransportSection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render every service card as a link", () => {
    renderWithIntl(<TransportSection />);

    TRANSPORT_CONFIG.services.forEach(({ id, href }) => {
      const item = t.items[id as keyof typeof t.items];

      expect(
        screen.getByRole("heading", { level: 3, name: item.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.cta)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: new RegExp(item.title) }),
      ).toHaveAttribute("href", href);
    });
  });
  it("should show the car rental card only when the feature is enabled", () => {
    renderWithIntl(<TransportSection />);

    const heading = screen.queryByRole("heading", {
      level: 3,
      name: t.items["car-rental"].title,
    });

    expect(heading !== null).toBe(FEATURES.carRental);
  });
});
