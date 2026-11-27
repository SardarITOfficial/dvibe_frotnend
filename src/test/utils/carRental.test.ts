import { describe, it, expect } from "vitest";

import { CAR_RENTALS } from "@/mocks/carRentals";
import {
  ALL_PROVIDERS,
  filterCarsByProvider,
  getCarProviders,
} from "@/utils/carRental";

describe("getCarProviders", () => {
  it("should return each provider once", () => {
    const ids = getCarProviders(CAR_RENTALS).map(({ id }) => id);

    expect(ids).toEqual(["mindelo-drive", "island-wheels", "sao-vicente-cars"]);
  });

  it("should return an empty list when there are no cars", () => {
    expect(getCarProviders([])).toEqual([]);
  });
});

describe("filterCarsByProvider", () => {
  it("should return all cars for the all option", () => {
    expect(filterCarsByProvider(CAR_RENTALS, ALL_PROVIDERS)).toHaveLength(
      CAR_RENTALS.length,
    );
  });

  it("should return only the cars of the selected provider", () => {
    const cars = filterCarsByProvider(CAR_RENTALS, "mindelo-drive");

    expect(cars.map(({ id }) => id)).toEqual(["car-1", "car-4"]);
  });

  it("should return no cars for an unknown provider", () => {
    expect(filterCarsByProvider(CAR_RENTALS, "unknown")).toEqual([]);
  });
});