import { FEATURES } from "@/constants/features";

export type TransportItem = {
  id: string;
  href: string;
  image: string;
  enabled?: boolean;
};

const TRANSPORT_SERVICES = [
  {
    id: "taxi",
    href: "/taxi",
    image: "/image/transport/mindelo-taxi.png",
  },
  {
    id: "car-rental",
    href: "/car-rental",
    image: "/image/transport/car-rental.jpg",
    enabled: FEATURES.carRental,
  },
] satisfies TransportItem[];

export const TRANSPORT_CONFIG = {
  services: TRANSPORT_SERVICES.filter(({ enabled = true }) => enabled),
};