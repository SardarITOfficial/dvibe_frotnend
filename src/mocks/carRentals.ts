export type CarCategory = "economy" | "suv" | "van";

export type CarTransmission = "manual" | "automatic";

export type CarRental = {
  id: string;
  name: string;
  category: CarCategory;
  seats: number;
  transmission: CarTransmission;
  pricePerDay: number;
  whatsapp: string;
  image: string;
  isAvailable: boolean;
};

const DEFAULT_CAR_IMAGE = "/image/transport/car-rental.jpg";

export const CAR_RENTALS: CarRental[] = [
  {
    id: "car-1",
    name: "Toyota Yaris",
    category: "economy",
    seats: 5,
    transmission: "manual",
    pricePerDay: 3500,
    whatsapp: "+238 999 30 01",
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
  },
  {
    id: "car-2",
    name: "Suzuki Jimny",
    category: "suv",
    seats: 4,
    transmission: "manual",
    pricePerDay: 5500,
    whatsapp: "+238 999 30 02",
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
  },
  {
    id: "car-3",
    name: "Hyundai Tucson",
    category: "suv",
    seats: 5,
    transmission: "automatic",
    pricePerDay: 7000,
    whatsapp: "+238 999 30 03",
    image: DEFAULT_CAR_IMAGE,
    isAvailable: false,
  },
  {
    id: "car-4",
    name: "Toyota Hiace",
    category: "van",
    seats: 9,
    transmission: "manual",
    pricePerDay: 9000,
    whatsapp: "+238 999 30 04",
    image: DEFAULT_CAR_IMAGE,
    isAvailable: true,
  },
];