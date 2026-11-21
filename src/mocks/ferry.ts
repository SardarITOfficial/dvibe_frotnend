export type FerryRoute = {
  id: string;
  from: string;
  to: string;
  time: string;
  operator: string;
};

export const FERRY_CONFIG = {
  before: {
    href: "/restaurants",
    items: ["restaurants", "coffee-snacks", "taxi-to-port"],
  },
  schedules: {
    href: "/ferry-schedules",
    routes: [
      {
        id: "mindelo-porto-novo",
        from: "Mindelo",
        to: "Porto Novo",
        time: "08:00",
        operator: "Nós Ferry",
      },
      {
        id: "porto-novo-mindelo",
        from: "Porto Novo",
        to: "Mindelo",
        time: "17:00",
        operator: "Nós Ferry",
      },
    ] satisfies FerryRoute[],
  },
  after: {
    href: "/explore",
    items: ["restaurants", "transport-car-rental", "local-experiences"],
  },
};