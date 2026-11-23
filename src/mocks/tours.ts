export type TourMeetingPoint = {
  name: string;
  address: string;
  mapUrl: string;
};

export type Tour = {
  id: string;
  location: string;
  durationHours: number;
  price: number;
  image: string;
  gallery: string[];
  whatsapp: string;
  highlights: string[];
  included: string[];
  meetingPoint: TourMeetingPoint;
};

export const TOURS: Tour[] = [
  {
    id: "monte-verde-hike",
    location: "Monte Verde",
    durationHours: 4,
    price: 1500,
    image: "/image/island/tours.jpg",
    gallery: [
      "/image/island/tours.jpg",
      "/image/island/sunset-spots.jpg",
      "/image/categories/sunset.jpg",
      "/image/cta/mindelo-bay.jpg",
    ],
    whatsapp: "+238 999 10 01",
    highlights: ["views", "guide"],
    included: ["guide", "water"],
    meetingPoint: {
      name: "Monte Verde Trailhead",
      address: "Monte Verde, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Monte+Verde+S%C3%A3o+Vicente",
    },
  },
  {
    id: "santo-antao-day-trip",
    location: "Santo Antão",
    durationHours: 10,
    price: 6500,
    image: "/image/island/beaches.jpg",
    gallery: [
      "/image/island/beaches.jpg",
      "/image/island/tours.jpg",
      "/image/cta/mindelo-bay.jpg",
      "/image/categories/tour.jpg",
    ],
    whatsapp: "+238 999 10 02",
    highlights: ["ferry", "valleys"],
    included: ["ferry", "transport", "lunch", "guide"],
    meetingPoint: {
      name: "Mindelo Ferry Terminal",
      address: "Porto Grande, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Mindelo+Ferry+Terminal",
    },
  },
  {
    id: "mindelo-city-walk",
    location: "Mindelo",
    durationHours: 3,
    price: 1000,
    image: "/image/categories/tour.jpg",
    gallery: [
      "/image/categories/tour.jpg",
      "/image/cta/mindelo-bay.jpg",
      "/image/vibe/live-music.jpg",
      "/heroImage.jpg",
    ],
    whatsapp: "+238 999 10 03",
    highlights: ["history", "music"],
    included: ["guide", "water"],
    meetingPoint: {
      name: "Praça Nova",
      address: "Praça Nova, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+Nova+Mindelo",
    },
  },
];