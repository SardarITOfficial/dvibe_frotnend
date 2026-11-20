export type VibeItem = {
  id: string;
  href: string;
  image: string;
};

export const VIBES_CONFIG = {
  href: "/vibe",
  vibes: [
    {
      id: "live-music",
      href: "/vibe/live-music",
      image: "/image/vibe/live-music.jpg",
    },
    {
      id: "events",
      href: "/vibe/events",
      image: "/image/vibe/events.png",
    },
    {
      id: "nightlife",
      href: "/vibe/nightlife",
      image: "/image/vibe/nightlife.jpg",
    },
  ] satisfies VibeItem[],
};