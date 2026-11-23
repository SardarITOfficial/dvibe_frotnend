import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TaxiDriverList from "@/components/sections/TaxiDriverList";
import type { TaxiDriver } from "@/mocks/taxiDrivers";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const drivers: TaxiDriver[] = [
  {
    id: "pedro",
    name: "Pedro",
    vehicle: "Hyundai i10",
    area: "laginha",
    whatsapp: "+238 999 20 02",
    rating: 4.5,
    reviewCount: 1,
    etaMinutes: 9,
    isAvailable: false,
    carImage: "/image/transport/mindelo-taxi.png",
  },
  {
    id: "ana",
    name: "Ana",
    vehicle: "Toyota Corolla",
    area: "mindelo",
    whatsapp: "+238 999 20 01",
    rating: 4.8,
    reviewCount: 12,
    etaMinutes: 5,
    isAvailable: true,
    carImage: "/image/transport/mindelo-taxi.png",
  },
];

const t = messages.Taxi;

const selectLabel = (driver: string) =>
  t.drivers.selectLabel.replace("{driver}", driver);

describe("TaxiDriverList", () => {
  it("should show each driver with vehicle and availability", () => {
    renderWithIntl(<TaxiDriverList drivers={drivers} />);

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
    expect(screen.getByText(t.drivers.status.available)).toBeInTheDocument();
    expect(screen.getByText(t.drivers.status.unavailable)).toBeInTheDocument();
  });

  it("should list available drivers first", () => {
    renderWithIntl(<TaxiDriverList drivers={drivers} />);

    const [first, second] = screen.getAllByRole("heading", { level: 3 });

    expect(first).toHaveTextContent("Ana");
    expect(second).toHaveTextContent("Pedro");
  });

  it("should disable the button of an unavailable driver", () => {
    renderWithIntl(<TaxiDriverList drivers={drivers} />);

    expect(
      screen.getByRole("button", { name: selectLabel("Pedro") }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: selectLabel("Ana") }),
    ).toBeEnabled();
  });
  it("should show the ETA only for available drivers", () => {
    renderWithIntl(<TaxiDriverList drivers={drivers} />);

    expect(
      screen.getByText(t.drivers.eta.replace("{minutes}", "5")),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(t.drivers.eta.replace("{minutes}", "9")),
    ).not.toBeInTheDocument();
  });
  it("should open the booking form for the clicked driver", async () => {
    const user = userEvent.setup();

    renderWithIntl(<TaxiDriverList drivers={drivers} />);
    await user.click(screen.getByRole("button", { name: selectLabel("Ana") }));

    expect(
      screen.getByRole("dialog", {
        name: t.booking.title.replace("{driver}", "Ana"),
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(t.booking.fields.pickup)).toBeInTheDocument();
  });

  it("should close the booking form", async () => {
    const user = userEvent.setup();

    renderWithIntl(<TaxiDriverList drivers={drivers} />);
    await user.click(screen.getByRole("button", { name: selectLabel("Ana") }));
    await user.click(
      screen.getByRole("button", { name: t.booking.closeLabel }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should show an empty state when there are no drivers", () => {
    renderWithIntl(<TaxiDriverList drivers={[]} />);

    expect(screen.getByText(t.drivers.empty)).toBeInTheDocument();
  });

  it("should show the rating and area of each driver", () => {
    renderWithIntl(<TaxiDriverList drivers={drivers} />);

    expect(screen.getByText(/4\.8 · 12/)).toBeInTheDocument();
    expect(
      screen.getByText(messages.Hero.locations.mindelo),
    ).toBeInTheDocument();
  });
});
