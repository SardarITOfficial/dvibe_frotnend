import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";

import FerrySection from "@/components/sections/FerrySection";
import { FERRY_CONFIG } from "@/mocks/ferry";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Ferry;

const getCard = (name: string) =>
  within(
    screen
      .getByRole("heading", { level: 3, name })
      .closest("article") as HTMLElement,
  );

describe("FerrySection", () => {
  it("should render the eyebrow and heading", () => {
    renderWithIntl(<FerrySection />);

    expect(screen.getByText(t.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
  });

  it("should render the before ferry card", () => {
    renderWithIntl(<FerrySection />);

    const card = getCard(t.before.title);

    expect(card.getByText(t.before.description)).toBeInTheDocument();
    FERRY_CONFIG.before.items.forEach((id) => {
      expect(
        card.getByText(t.before.items[id as keyof typeof t.before.items]),
      ).toBeInTheDocument();
    });
    expect(card.getByRole("link", { name: t.before.cta })).toHaveAttribute(
      "href",
      FERRY_CONFIG.before.href,
    );
  });

  it("should render every ferry schedule", () => {
    renderWithIntl(<FerrySection />);

    const card = getCard(t.schedules.title);

    expect(card.getByText(t.schedules.description)).toBeInTheDocument();
    FERRY_CONFIG.schedules.routes.forEach(({ from, to, time }) => {
      expect(card.getByText(`${from} → ${to}`)).toBeInTheDocument();
      expect(card.getByText(time)).toBeInTheDocument();
    });
    expect(
      card.getAllByText(`${t.schedules.departure} · Nós Ferry`),
    ).toHaveLength(FERRY_CONFIG.schedules.routes.length);
    expect(
      card.getByRole("link", { name: t.schedules.cta }),
    ).toHaveAttribute("href", FERRY_CONFIG.schedules.href);
  });

  it("should render the after ferry card", () => {
    renderWithIntl(<FerrySection />);

    const card = getCard(t.after.title);

    expect(card.getByText(t.after.description)).toBeInTheDocument();
    FERRY_CONFIG.after.items.forEach((id) => {
      expect(
        card.getByText(t.after.items[id as keyof typeof t.after.items]),
      ).toBeInTheDocument();
    });
    expect(card.getByRole("link", { name: t.after.cta })).toHaveAttribute(
      "href",
      FERRY_CONFIG.after.href,
    );
  });
});