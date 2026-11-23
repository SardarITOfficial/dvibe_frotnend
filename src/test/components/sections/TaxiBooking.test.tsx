import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TaxiBooking from "@/components/sections/TaxiBooking";
import type { TaxiDriver } from "@/mocks/taxiDrivers";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const driver: TaxiDriver = {
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
};

const t = messages.Taxi.booking;

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  date = "2099-12-31",
) {
  await user.type(screen.getByLabelText(t.fields.pickup), "Mindelo Airport");
  await user.type(screen.getByLabelText(t.fields.dropoff), "Baía das Gatas");
  await user.type(screen.getByLabelText(t.fields.date), date);
  await user.type(screen.getByLabelText(t.fields.time), "10:30");
  await user.type(screen.getByLabelText(t.fields.passengers), "2");
  await user.type(screen.getByLabelText(t.fields.name), "Ana Silva");
  await user.type(screen.getByLabelText(t.fields.phone), "+238 999 10 01");
}

describe("TaxiBooking", () => {
  let open: MockInstance;

  beforeEach(() => {
    open = vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    open.mockRestore();
  });

  it("should show an error for each invalid field on submit", async () => {
    const user = userEvent.setup();

    renderWithIntl(<TaxiBooking driver={driver} />);
    await user.click(screen.getByRole("button", { name: t.submit }));

    expect(screen.getByText(t.errors.pickup)).toBeInTheDocument();
    expect(screen.getByText(t.errors.dropoff)).toBeInTheDocument();
    expect(screen.getByText(t.errors.date)).toBeInTheDocument();
    expect(screen.getByText(t.errors.time)).toBeInTheDocument();
    expect(screen.getByText(t.errors.passengers)).toBeInTheDocument();
    expect(screen.getByText(t.errors.name)).toBeInTheDocument();
    expect(screen.getByText(t.errors.phone)).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("should reject a date in the past", async () => {
    const user = userEvent.setup();

    renderWithIntl(<TaxiBooking driver={driver} />);
    await fillForm(user, "2000-01-01");
    await user.click(screen.getByRole("button", { name: t.submit }));

    expect(screen.getByText(t.errors.date)).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("should open WhatsApp for the driver with valid data", async () => {
    const user = userEvent.setup();

    renderWithIntl(<TaxiBooking driver={driver} />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: t.submit }));

    expect(open).toHaveBeenCalledTimes(1);

    const [href, target, features] = open.mock.calls[0] as string[];
    const url = new URL(href);
    const text = url.searchParams.get("text");

    expect(url.origin + url.pathname).toBe("https://wa.me/2389992001");
    expect(text).toContain("Ana");
    expect(text).toContain("Mindelo Airport");
    expect(text).toContain("Baía das Gatas");
    expect(text).toContain("10:30");
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
  });
});