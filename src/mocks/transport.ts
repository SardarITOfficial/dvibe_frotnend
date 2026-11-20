export type TransportItem = {
  id: string;
  href: string;
  image: string;
};

export const TRANSPORT_CONFIG = {
  services: [
    {
      id: "taxi",
      href: "/taxi",
      image: "/image/transport/taxi.jpg",
    },
    {
      id: "car-rental",
      href: "/car-rental",
      image: "/image/transport/car-rental.jpg",
    },
  ] satisfies TransportItem[],
};