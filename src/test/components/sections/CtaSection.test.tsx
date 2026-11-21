import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import CtaSection from "@/components/sections/CtaSection";
import { CTA_CONFIG } from "@/mocks/cta";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Cta;

describe("CtaSection", () => {
  it("should render the heading and description", () => {
    renderWithIntl(<CtaSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(t.description)).toBeInTheDocument();
  });

  it("should render both call to action links", () => {
    renderWithIntl(<CtaSection />);

    expect(
      screen.getByRole("link", { name: t.primaryCta }),
    ).toHaveAttribute("href", CTA_CONFIG.primaryHref);
    expect(
      screen.getByRole("link", { name: t.secondaryCta }),
    ).toHaveAttribute("href", CTA_CONFIG.secondaryHref);
  });
});