export type CarCategory = "economy" | "suv" | "van";

export type CarTransmission = "manual" | "automatic";

export type CarProvider = {
  id: string;
  name: string;
  whatsapp: string;
};

export type CarRental = {
  id: string;
  name: string;
  category: CarCategory;
  seats: number;
  transmission: CarTransmission;
  pricePerDay: number;
  image: string;
  isAvailable: boolean;
  provider: CarProvider;
};