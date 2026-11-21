export type VibeCategoryId = "live-music" | "events" | "nightlife";

export type VibeVenue = {
  name: string;
  address: string;
  mapUrl: string;
};

export type VibeTicketType = {
  name: string;
  price: string;
  description?: string;
};

export type VibeHighlight = {
  title: string;
  description: string;
};

export type VibePolicyTerm = {
  title: string;
  text: string;
};

export type VibeBooking = {
  whatsapp: string;
};

export type VibeEvent = {
  id: string;
  category: VibeCategoryId;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  time: string;
  image: string;
  venue?: VibeVenue;
  tickets?: VibeTicketType[];
  highlights?: VibeHighlight[];
  policy?: VibePolicyTerm[];
  booking?: VibeBooking;
};

export const VIBE_EVENTS: VibeEvent[] = [
  {
    id: "morna-night",
    category: "live-music",
    title: "Morna Night by the Bay",
    description:
      "An evening of traditional morna with local musicians, right by the water. Arrive early for a table with a view of the bay.",
    date: "2026-11-21",
    location: "Mindelo",
    time: "21:00",
    image: "/image/vibe/live-music.jpg",
    venue: {
      name: "Bay Terrace",
      address: "Av. Marginal, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Mindelo+Bay+Terrace",
    },
    tickets: [
      {
        name: "Standard Entry",
        price: "500 CVE",
        description: "One entry for the night",
      },
      {
        name: "Table for Four",
        price: "3,000 CVE",
        description: "Reserved table with a bay view",
      },
    ],
    highlights: [
      {
        title: "Live Morna",
        description: "Traditional morna performed by local musicians.",
      },
      {
        title: "Sunset Opening",
        description: "Doors open at sunset with a welcome drink.",
      },
      {
        title: "Local Food",
        description: "Cachupa and grilled fish served all evening.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Show your booking confirmation at the door. Each ticket is valid for one person.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 01" },
  },
  {
    id: "acoustic-sessions",
    category: "live-music",
    title: "Acoustic Sessions",
    description:
      "Relaxed acoustic sets from island artists in an intimate setting, perfect for a quiet night out.",
    date: "2026-11-22",
    location: "Laginha",
    time: "20:00",
    image: "/image/vibe/live-music.jpg",
    venue: {
      name: "Laginha Courtyard",
      address: "Praia da Laginha, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Laginha+Mindelo",
    },
    tickets: [
      {
        name: "Standard Entry",
        price: "400 CVE",
        description: "One entry for the night",
      },
      {
        name: "Front Row Seat",
        price: "800 CVE",
        description: "Reserved seat close to the stage",
      },
    ],
    highlights: [
      {
        title: "Island Artists",
        description: "Unplugged sets from singers and guitarists of São Vicente.",
      },
      {
        title: "Intimate Setting",
        description: "A small, quiet space where every note can be heard.",
      },
      {
        title: "Drinks & Snacks",
        description: "Light snacks and drinks available throughout the night.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Show your booking confirmation at the door. Each ticket is valid for one person.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 04" },
  },
  {
    id: "street-market",
    category: "events",
    title: "Waterfront Street Market",
    description:
      "Local crafts, fresh snacks and live street performers along the Mindelo waterfront.",
    date: "2026-11-25",
    location: "Mindelo",
    time: "10:00",
    image: "/image/vibe/events.png",
    venue: {
      name: "Mindelo Waterfront",
      address: "Av. Marginal, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Mindelo+Waterfront",
    },
    tickets: [
      {
        name: "Free Entry",
        price: "0 CVE",
        description: "Open to everyone, no booking needed",
      },
    ],
    highlights: [
      {
        title: "Local Crafts",
        description: "Handmade jewellery, textiles and art from island makers.",
      },
      {
        title: "Fresh Snacks",
        description: "Pastries, fruit and street food from local vendors.",
      },
      {
        title: "Street Performers",
        description: "Musicians and performers along the waterfront all day.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Entry is free. Stalls and food are paid for directly with the vendors.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 05" },
  },
  {
    id: "rooftop-party",
    category: "nightlife",
    title: "Rooftop Party",
    description:
      "Cocktails, DJs and open-air dancing above the city lights of Mindelo.",
    date: "2026-11-27",
    location: "Mindelo",
    time: "23:00",
    image: "/image/vibe/nightlife.jpg",
    venue: {
      name: "Sky Terrace Mindelo",
      address: "Rua de Lisboa, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Mindelo+Rooftop+Bar",
    },
    tickets: [
      {
        name: "General Entry",
        price: "800 CVE",
        description: "One entry for the night",
      },
    ],
    highlights: [
      {
        title: "Open-Air Views",
        description: "Dance under the sky with the city lights below.",
      },
      {
        title: "Resident DJs",
        description: "House and afrobeat sets all night.",
      },
      {
        title: "Signature Cocktails",
        description: "A cocktail menu made for the night.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Show your booking confirmation at the door. Guests must be 18 or older and carry valid ID.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 02" },
  },
  {
    id: "beach-festival",
    category: "events",
    title: "Beach Festival",
    description:
      "A full afternoon of music, food stalls and games on the sand, with the sunset as the finale.",
    date: "2026-11-28",
    endDate: "2026-11-29",
    location: "Baía das Gatas",
    time: "16:00",
    image: "/image/vibe/events.png",
    venue: {
      name: "Baía das Gatas Beach",
      address: "Baía das Gatas, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Ba%C3%ADa+das+Gatas",
    },
    tickets: [
      { name: "Day Pass", price: "300 CVE" },
      { name: "Weekend Pass", price: "500 CVE", description: "Both days" },
    ],
    highlights: [
      {
        title: "Live Music",
        description: "Local bands and guest artists on the beach stage.",
      },
      {
        title: "Beach Sports",
        description: "Volleyball and football games open to everyone.",
      },
      {
        title: "Food Stalls",
        description: "Fresh seafood and regional street food.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Show your booking confirmation at the gate. Day Passes are valid for one day only; Weekend Passes cover both days.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 03" },
  },
  {
    id: "dj-night",
    category: "nightlife",
    title: "DJ Night",
    description:
      "Resident DJs keep the dance floor going until the early hours.",
    date: "2026-12-05",
    location: "Laginha",
    time: "00:00",
    image: "/image/vibe/nightlife.jpg",
    venue: {
      name: "Laginha Club",
      address: "Praia da Laginha, Mindelo, São Vicente",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Laginha+Club+Mindelo",
    },
    tickets: [
      {
        name: "General Entry",
        price: "600 CVE",
        description: "One entry for the night",
      },
      {
        name: "VIP Entry",
        price: "1,500 CVE",
        description: "Priority entry and a reserved area",
      },
    ],
    highlights: [
      {
        title: "Resident DJs",
        description: "Non-stop sets from the club's resident DJs.",
      },
      {
        title: "Late-Night Dancing",
        description: "The dance floor stays open until the early hours.",
      },
      {
        title: "Full Bar",
        description: "Cocktails, beer and soft drinks all night.",
      },
    ],
    policy: [
      {
        title: "Entry",
        text: "Show your booking confirmation at the door. Guests must be 18 or older and carry valid ID.",
      },
      {
        title: "Changes",
        text: "The organiser may change the schedule because of weather or safety reasons. Official announcements are final.",
      },
    ],
    booking: { whatsapp: "+238 999 00 06" },
  },
];