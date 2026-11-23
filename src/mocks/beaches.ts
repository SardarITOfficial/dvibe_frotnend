export type Beach = {
  id: string;
  name: string;
  location: string;
  highlight: "calm-water" | "family" | "lively" | "windsurf";
  image: string;
  mapUrl: string;
};

export const BEACHES: Beach[] = [
  {
    id: "laginha-beach",
    name: "Laginha Beach",
    location: "Laginha",
    highlight: "family",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+da+Laginha+Mindelo",
  },
  {
    id: "praia-grande",
    name: "Praia Grande",
    location: "Mindelo",
    highlight: "calm-water",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+Grande+Mindelo",
  },
  {
    id: "baia-das-gatas",
    name: "Baía das Gatas",
    location: "Baía das Gatas",
    highlight: "lively",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ba%C3%ADa+das+Gatas+S%C3%A3o+Vicente",
  },
  {
    id: "salamansa",
    name: "Salamansa",
    location: "Salamansa",
    highlight: "windsurf",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Salamansa+S%C3%A3o+Vicente",
  },
  {
    id: "calhau",
    name: "Calhau",
    location: "Calhau",
    highlight: "calm-water",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Calhau+S%C3%A3o+Vicente",
  },
  {
    id: "sao-pedro",
    name: "São Pedro",
    location: "São Pedro",
    highlight: "family",
    image: "/image/island/beaches.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+de+S%C3%A3o+Pedro+S%C3%A3o+Vicente",
  },
];