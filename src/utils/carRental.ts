import type { CarProvider, CarRental } from "@/types";

export const ALL_PROVIDERS = "all";

export function getCarProviders(cars: CarRental[]): CarProvider[] {
  const providers = new Map(cars.map(({ provider }) => [provider.id, provider]));

  return [...providers.values()];
}

export function filterCarsByProvider(
  cars: CarRental[],
  providerId: string,
): CarRental[] {
  if (providerId === ALL_PROVIDERS) return cars;

  return cars.filter(({ provider }) => provider.id === providerId);
}