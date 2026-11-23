import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import TourGallery from "@/components/sections/TourGallery";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Tours;
const TOUR_ID = "sea-turtles-sao-pedro";
const NAME = t.items[TOUR_ID].name;
const IMAGES = [
  { src: "/image/tours/sea-turtles/1.jpg" },
  { src: "/image/tours/sea-turtles/2.jpg" },
];

describe("TourGallery", () => {
  it("should render nothing without images", () => {
    const { container } = renderWithIntl(
      <TourGallery tourId={TOUR_ID} images={[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should open the lightbox when a photo is clicked", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    fireEvent.click(screen.getByRole("button", { name: `${NAME} 1` }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("should show the next photo", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: t.gallery.viewAll.replace("{count}", "2"),
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: t.gallery.next }));

    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("should close the lightbox with Escape", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    fireEvent.click(screen.getByRole("button", { name: `${NAME} 1` }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});