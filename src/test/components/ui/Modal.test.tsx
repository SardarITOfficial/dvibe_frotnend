import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from "@/components/ui/Modal";

function renderModal(isOpen: boolean, onClose = vi.fn()) {
  render(
    <Modal isOpen={isOpen} title="Book a taxi" closeLabel="Close" onClose={onClose}>
      <p>Modal content</p>
    </Modal>,
  );

  return onClose;
}

describe("Modal", () => {
  it("should render nothing when closed", () => {
    renderModal(false);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render the dialog with its title and content when open", () => {
    renderModal(true);

    expect(
      screen.getByRole("dialog", { name: "Book a taxi" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("should call onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = renderModal(true);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = renderModal(true);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = renderModal(true);

    await user.click(screen.getByRole("dialog").parentElement as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when the content is clicked", async () => {
    const user = userEvent.setup();
    const onClose = renderModal(true);

    await user.click(screen.getByText("Modal content"));

    expect(onClose).not.toHaveBeenCalled();
  });
});