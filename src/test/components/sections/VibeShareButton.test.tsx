import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import VibeShareButton from "@/components/sections/VibeShareButton";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Vibe.details.share;

describe("VibeShareButton", () => {
  it("should copy the page link when native sharing is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    renderWithIntl(<VibeShareButton title="Event" />);
    fireEvent.click(screen.getByRole("button", { name: t.label }));

    expect(await screen.findByText(t.copied)).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith(window.location.href);
  });
});