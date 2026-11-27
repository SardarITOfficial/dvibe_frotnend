import type { CarProvider, CarRental } from "@/types";

const DEFAULT_CAR_IMAGE = "/image/transport/car-rental.jpg";

const MINDELO_DRIVE: CarProvider = {
  id: "mindelo-drive",
  name: "Mindelo Drive",
  whatsapp: "+238 999 30 01",
};

const ISLAND_WHEELS: CarProvider = {
  id: "island-wheels",
  name: "Island Wheels",
  whatsapp: "+238 999 30 02",
};

const SAO_VICENTE_CARS: CarProvider = {
  id: "sao-vicente-cars",
  name: "São Vicente Cars",
  whatsapp: "+238 999 30 03",
};

export const CAR_RENTALS: CarRental[] = [
  {
    id: "car-1",
    name: "Toyota Yaris",
    category: "economy",
    seats: 5,
    transmission: "manual",
    pricePerDay: 3500,
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
    provider: MINDELO_DRIVE,
  },
  {
    id: "car-2",
    name: "Suzuki Jimny",
    category: "suv",
    seats: 4,
    transmission: "manual",
    pricePerDay: 5500,
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
    provider: ISLAND_WHEELS,
  },
  {
    id: "car-3",
    name: "Hyundai Tucson",
    category: "suv",
    seats: 5,
    transmission: "automatic",
    pricePerDay: 7000,
    image: DEFAULT_CAR_IMAGE,
    isAvailable: false,
    provider: SAO_VICENTE_CARS,
  },
  {
    id: "car-4",
    name: "Toyota Hiace",
    category: "van",
    seats: 9,
    transmission: "manual",
    pricePerDay: 9000,
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
    provider: MINDELO_DRIVE,
  },
];