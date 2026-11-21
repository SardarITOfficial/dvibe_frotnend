export type VibeCategoryId = "live-music" | "events" | "nightlife";

export type VibeEvent = {
  id: string;
  category: VibeCategoryId;
  title: string;
  location: string;
  time: string;
  image: string;
};

export const VIBE_EVENTS: VibeEvent[] = [
  {
    id: "morna-night",
    category: "live-music",
    title: "Morna Night by the Bay",
    location: "Mindelo",
    time: "21:00",
    image: "/image/vibe/live-music.jpg",
  },
  {
    id: "acoustic-sessions",
    category: "live-music",
    title: "Acoustic Sessions",
    location: "Laginha",
    time: "20:00",
    image: "/image/vibe/live-music.jpg",
  },
  {
    id: "beach-festival",
    category: "events",
    title: "Beach Festival",
    location: "Baía das Gatas",
    time: "16:00",
    image: "/image/vibe/events.png",
  },
  {
    id: "street-market",
    category: "events",
    title: "Waterfront Street Market",
    location: "Mindelo",
    time: "10:00",
    image: "/image/vibe/events.png",
  },
  {
    id: "rooftop-party",
    category: "nightlife",
    title: "Rooftop Party",
    location: "Mindelo",
    time: "23:00",
    image: "/image/vibe/nightlife.jpg",
  },
  {
    id: "dj-night",
    category: "nightlife",
    title: "DJ Night",
    location: "Laginha",
    time: "00:00",
    image: "/image/vibe/nightlife.jpg",
  },
];