export type TaxiArea =
  | "mindelo"
  | "laginha"
  | "calhau"
  | "baia-das-gatas"
  | "salamansa";

export type TaxiDriver = {
  id: string;
  name: string;
  vehicle: string;
  area: TaxiArea;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  etaMinutes: number;
  isAvailable: boolean;
  carImage: string;
  photo?: string;
};

const DEFAULT_CAR_IMAGE = "/image/transport/mindelo-taxi.png";

export const TAXI_DRIVERS: TaxiDriver[] = [
  {
    id: "driver-1",
    name: "Carlos",
    vehicle: "Toyota Corolla",
    area: "mindelo",
    whatsapp: "+238 999 20 01",
    rating: 4.8,
    reviewCount: 24,
    etaMinutes: 4,
    isAvailable: true,
    carImage: DEFAULT_CAR_IMAGE,
  },
  {
    id: "driver-2",
    name: "Nelson",
    vehicle: "Hyundai i10",
    area: "laginha",
    whatsapp: "+238 999 20 02",
    rating: 4.6,
    reviewCount: 11,
    etaMinutes: 7,
    isAvailable: true,
    carImage: DEFAULT_CAR_IMAGE,
  },
  {
    id: "driver-3",
    name: "Marisa",
    vehicle: "Kia Picanto",
    area: "calhau",
    whatsapp: "+238 999 20 03",
    rating: 4.9,
    reviewCount: 37,
    etaMinutes: 12,
    isAvailable: false,
    carImage: DEFAULT_CAR_IMAGE,
  },
  {
    id: "driver-4",
    name: "Edson",
    vehicle: "Dacia Logan",
    area: "baia-das-gatas",
    whatsapp: "+238 999 20 04",
    rating: 4.4,
    reviewCount: 1,
    etaMinutes: 9,
    isAvailable: true,
    carImage: DEFAULT_CAR_IMAGE,
  },
];