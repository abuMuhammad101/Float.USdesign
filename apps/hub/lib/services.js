// Each Float service is its own external site/domain (per the client's
// direction). NEXT_PUBLIC_*_URL env vars let each point at a local dev
// server during development and the real domain in production — see
// .env.example.
export const services = [
  {
    key: "moving",
    name: "Float Moving",
    tagline: "Residential & Commercial",
    description: "Full-crew moves, sized and priced before you book.",
    icon: "/icons/icon-residential.svg",
    href: process.env.NEXT_PUBLIC_MOVING_URL || "https://floatmoving.com",
    status: "live",
  },
  {
    key: "towing",
    name: "Float Towing",
    tagline: "Marine Towing",
    description: "On-water breakdown, salvage, and tow assistance.",
    icon: "/icons/icon-marine.svg",
    href: process.env.NEXT_PUBLIC_TOWING_URL || "https://floattowing.com",
    status: "coming-soon",
  },
  {
    key: "fishing",
    name: "Float Fishing",
    tagline: "Fishing Charters",
    description: "Book a captain and boat for your next trip out.",
    icon: "/icons/icon-fishing.svg",
    href: process.env.NEXT_PUBLIC_FISHING_URL || "https://floatjax.com",
    status: "coming-soon",
  },
  {
    key: "detailing",
    name: "Float Detailing",
    tagline: "Marine & Auto Detailing",
    description: "Interior, exterior, and gel-coat detailing on your schedule.",
    icon: "/icons/icon-detailing.svg",
    href: process.env.NEXT_PUBLIC_DETAILING_URL || "https://floatdetail.com",
    status: "coming-soon",
  },
];
