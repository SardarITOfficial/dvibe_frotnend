import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import TourGallery from "@/components/sections/TourGallery";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Tours;
const g = t.details.gallery;
const TOUR_ID = "sea-turtles-sao-pedro";
const NAME = t.items[TOUR_ID].name;
const IMAGES = [
  "/image/tours/sea-turtles/1.jpg",
  "/image/tours/sea-turtles/2.jpg",
];

const showLabel = (index: number) =>
  g.showLabel
    .replace("{index}", String(index))
    .replace("{total}", String(IMAGES.length));

describe("TourGallery", () => {
  it("should render nothing without images", () => {
    const { container } = renderWithIntl(
      <TourGallery tourId={TOUR_ID} images={[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render the first photo and the counter", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    expect(screen.getByAltText(`${NAME}, photo 1`)).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("should show the next photo", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    fireEvent.click(screen.getByRole("button", { name: g.nextLabel }));

    expect(screen.getByAltText(`${NAME}, photo 2`)).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("should wrap to the last photo from the first", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    fireEvent.click(screen.getByRole("button", { name: g.previousLabel }));

    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("should switch the photo when a thumbnail is selected", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={IMAGES} />);

    const thumbnail = screen.getByRole("button", { name: showLabel(2) });

    fireEvent.click(thumbnail);

    expect(thumbnail).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("should hide the controls for a single photo", () => {
    renderWithIntl(<TourGallery tourId={TOUR_ID} images={[IMAGES[0]]} />);

    expect(
      screen.queryByRole("button", { name: g.nextLabel }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
  });
});