export type SunsetSpot = {
  id: string;
  name: string;
  location: string;
  bestTime: string;
  image: string;
  mapUrl: string;
};

export const SUNSET_SPOTS: SunsetSpot[] = [
  {
    id: "laginha-beach",
    name: "Laginha Beach",
    location: "Laginha",
    bestTime: "18:15",
    image: "/image/island/sunset-spots.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+da+Laginha+Mindelo",
  },
  {
    id: "baia-das-gatas",
    name: "Baía das Gatas",
    location: "Baía das Gatas",
    bestTime: "18:20",
    image: "/image/categories/sunset.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ba%C3%ADa+das+Gatas+S%C3%A3o+Vicente",
  },
  {
    id: "fortim-del-rei",
    name: "Fortim d'El Rei",
    location: "Mindelo",
    bestTime: "18:10",
    image: "/image/island/sunset-spots.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Fortim+d%27El+Rei+Mindelo",
  },
  {
    id: "monte-verde",
    name: "Monte Verde",
    location: "Monte Verde",
    bestTime: "18:25",
    image: "/image/categories/sunset.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Monte+Verde+S%C3%A3o+Vicente",
  },
];