export type TourMeetingPoint = {
  name: string;
  address: string;
  mapUrl: string;
};

export type TourGalleryImage = {
  src: string;
};

export type TourItineraryStop = {
  id: string;
};

export type TourRatingBreakdown = {
  guide: number;
  transportation: number;
  valueForMoney: number;
};

export type Tour = {
  id: string;
  location: string;
  durationHours: number;
  price: number;
  image: string;
  whatsapp: string;
  highlights: string[];
  included: string[];
  meetingPoint: TourMeetingPoint;
  gallery?: TourGalleryImage[];
  rating?: number;
  reviewCount?: number;
  ratingBreakdown?: TourRatingBreakdown;
  languages?: string[];
  pickupIncluded?: boolean;
  wheelchairAccessible?: boolean;
  freeCancellationHours?: number;
  notIncluded?: string[];
  bring?: string[];
  knowBeforeYouGo?: string[];
  itinerary?: TourItineraryStop[];
  faq?: string[];
};

export const TOURS: Tour[] = [
  {
    id: "monte-verde-hike",
    location: "Monte Verde",
    durationHours: 4,
    price: 1500,
    image: "/image/island/tours.jpg",
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
  {
    id: "sea-turtles-sao-pedro",
    location: "São Pedro",
    durationHours: 2,
    price: 6000,
    image: "/image/tours/sea-turtles/cover.jpg",
    whatsapp: "+238 999 10 04",
    highlights: ["snorkel", "marineLife"],
    included: ["briefing", "safety", "guide", "gear", "photos"],
    meetingPoint: {
      name: "Mindelo pickup point",
      address: "Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Mindelo+S%C3%A3o+Vicente",
    },
    gallery: [
      { src: "/image/tours/sea-turtles/1.jpg" },
      { src: "/image/tours/sea-turtles/2.jpg" },
      { src: "/image/tours/sea-turtles/3.jpg" },
      { src: "/image/tours/sea-turtles/4.jpg" },
    ],
    rating: 4.7,
    reviewCount: 42,
    ratingBreakdown: { guide: 4.5, transportation: 4.9, valueForMoney: 4.4 },
    languages: ["en", "fr", "pt", "es"],
    pickupIncluded: true,
    wheelchairAccessible: true,
    freeCancellationHours: 24,
    notIncluded: ["food", "tips"],
    bring: ["swimwear", "towel", "sunscreen", "phoneCase"],
    knowBeforeYouGo: ["comfortableInWater", "respectMarineLife", "noTouching"],
    itinerary: [{ id: "pickup" }, { id: "snorkel" }, { id: "return" }],
    faq: ["swimmer", "children", "weather", "videos"],
  },
];