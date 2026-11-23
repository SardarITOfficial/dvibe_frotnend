import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import TourDetails from "@/components/sections/TourDetails";
import { TOURS } from "@/mocks/tours";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Tours;
const [tour] = TOURS;
const copy = t.items[tour.id as keyof typeof t.items];
const turtleTour = TOURS.find(({ id }) => id === "sea-turtles-sao-pedro");
describe("TourDetails", () => {
  it("should render the tour name as the main heading", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(
      screen.getByRole("heading", { level: 1, name: copy.name }),
    ).toBeInTheDocument();
  });

  it("should render the description and the location", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(screen.getByText(copy.description)).toBeInTheDocument();
    expect(screen.getByText(tour.location)).toBeInTheDocument();
  });

  it("should link back to the tours page", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(screen.getByRole("link", { name: t.details.back })).toHaveAttribute(
      "href",
      "/tours",
    );
  });

  it("should render every highlight and included item", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    const highlights = copy.highlights as Record<string, { title: string }>;

    tour.highlights.forEach((key) => {
      expect(
        screen.getByRole("heading", { level: 3, name: highlights[key].title }),
      ).toBeInTheDocument();
    });
    tour.included.forEach((key) => {
      expect(
        screen.getByText(t.included[key as keyof typeof t.included]),
      ).toBeInTheDocument();
    });
  });

  it("should open the meeting point in Google Maps", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(
      screen.getByRole("link", { name: t.details.openMap }),
    ).toHaveAttribute("href", tour.meetingPoint.mapUrl);
  });

  it("should book on the operator's own WhatsApp number", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(
      screen
        .getByRole("link", { name: t.details.booking.cta })
        .getAttribute("href"),
    ).toContain("https://wa.me/2389991001");
  });

  it("should render the extra sections of a detailed tour", () => {
    if (!turtleTour) throw new Error("Missing sea turtles tour mock");

    renderWithIntl(<TourDetails tour={turtleTour} />);

    expect(
      screen.getByRole("heading", { level: 2, name: t.sections.itinerary }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: t.sections.faq }),
    ).toBeInTheDocument();
    expect(screen.getByText(t.bring.towel)).toBeInTheDocument();
  });

  it("should hide the extra sections of a basic tour", () => {
    renderWithIntl(<TourDetails tour={tour} />);

    expect(
      screen.queryByRole("heading", { level: 2, name: t.sections.itinerary }),
    ).not.toBeInTheDocument();
  });
});
