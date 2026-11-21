export type VibeCategoryId = "live-music" | "events" | "nightlife";

export type VibeEvent = {
  id: string;
  category: VibeCategoryId;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  image: string;
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
  },
  {
    id: "beach-festival",
    category: "events",
    title: "Beach Festival",
    description:
      "A full afternoon of music, food stalls and games on the sand, with the sunset as the finale.",
    date: "2026-11-28",
    location: "Baía das Gatas",
    time: "16:00",
    image: "/image/vibe/events.png",
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
  },
];