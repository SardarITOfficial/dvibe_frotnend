import type { Tour } from "@/mocks/tours";

export function getTourById(tours: Tour[], id: string): Tour | undefined {
  return tours.find((tour) => tour.id === id);
}