// Mock crew-package catalog + pricing model for the Float Moving discovery,
// detail, and booking flow. There is no real backend yet — see the root
// README "What's stubbed" section. Slot lists are hardcoded strings (not
// generated from `new Date()`) so server and client render identically and
// there's nothing dynamic to keep in sync with a real calendar yet.
export const MOVE_PACKAGES = [
  {
    id: "cargo-van-2",
    name: "2 Movers + Cargo Van",
    type: "residential",
    sizes: ["studio", "1br"],
    icon: "/icons/icon-residential.svg",
    basePrice: 109,
    priceUnit: "hr",
    minHours: 2,
    maxHours: 5,
    specs: ["2 Movers", "Cargo Van", "2-hr minimum"],
    rating: 4.8,
    reviewCount: 212,
    tag: "Most booked",
    description:
      "Our leanest crew — built for a studio or one-bedroom with light furniture and a handful of boxes. Two movers, a cargo van, and everything you need to get across town without a full day of lifting.",
    included: ["2 professional movers", "Cargo van + fuel", "Furniture blankets & basic tools", "Loading and unloading"],
    slots: ["Tomorrow · 9:00 AM", "Tomorrow · 1:00 PM", "Fri, Aug 1 · 8:00 AM", "Sat, Aug 2 · 10:00 AM", "Sat, Aug 2 · 2:00 PM"],
  },
  {
    id: "box-truck-4",
    name: "4 Movers + 26ft Box Truck",
    type: "residential",
    sizes: ["2br", "3br", "4br+"],
    icon: "/icons/icon-residential.svg",
    basePrice: 189,
    priceUnit: "hr",
    minHours: 3,
    maxHours: 8,
    specs: ["4 Movers", "26ft Box Truck", "3-hr minimum"],
    rating: 4.9,
    reviewCount: 341,
    tag: "Best for full homes",
    description:
      "A full crew and a 26-foot box truck for two-to-four-bedroom homes. We wrap, load, drive, and unload — you just point us at the rooms.",
    included: ["4 professional movers", "26ft box truck + fuel", "Furniture wrapping & disassembly", "Basic appliance handling"],
    slots: ["Tomorrow · 8:00 AM", "Fri, Aug 1 · 9:00 AM", "Sat, Aug 2 · 8:00 AM", "Sun, Aug 3 · 9:00 AM"],
  },
  {
    id: "commercial-crew",
    name: "Commercial Moving Crew",
    type: "commercial",
    sizes: ["office-small", "office-large", "warehouse"],
    icon: "/icons/icon-commercial.svg",
    basePrice: 229,
    priceUnit: "hr",
    minHours: 4,
    maxHours: 10,
    specs: ["6 Movers", "Box Truck + Dolly Rig", "After-hours available"],
    rating: 4.7,
    reviewCount: 98,
    tag: "After-hours friendly",
    description:
      "Office and warehouse relocations, scheduled around your business hours. Six movers, a dolly rig for equipment, and a plan for minimal downtime.",
    included: ["6 professional movers", "Box truck + dolly/hand-truck rig", "Desk, cubicle & electronics handling", "Evening & weekend scheduling"],
    slots: ["Fri, Aug 1 · 6:00 PM", "Sat, Aug 2 · 7:00 AM", "Sun, Aug 3 · 7:00 AM", "Mon, Aug 4 · 6:00 PM"],
  },
  {
    id: "hauling-crew",
    name: "Junk & Hauling Removal",
    type: "hauling",
    sizes: ["any"],
    icon: "/icons/icon-hauling.svg",
    basePrice: 99,
    priceUnit: "hr",
    minHours: 1,
    maxHours: 4,
    specs: ["2 Movers", "Dump Trailer", "Same-day available"],
    rating: 4.6,
    reviewCount: 154,
    tag: "Same-day",
    description:
      "Furniture, appliances, construction debris — loaded and hauled away same-day in most areas. Priced by the hour with no long-term commitment.",
    included: ["2 haul crew", "Dump trailer", "Responsible disposal / donation drop-off", "Same-day availability in most zips"],
    slots: ["Today · 3:00 PM", "Tomorrow · 9:00 AM", "Tomorrow · 12:00 PM", "Fri, Aug 1 · 10:00 AM"],
  },
];

export function getPackage(id) {
  return MOVE_PACKAGES.find((pkg) => pkg.id === id);
}

const DISTANCE_OPTIONS = [
  { value: "local", label: "Under 10 miles", miles: 5 },
  { value: "nearby", label: "10–25 miles", miles: 18 },
  { value: "regional", label: "25–50 miles", miles: 38 },
  { value: "long", label: "50+ miles", miles: 65 },
];

export function getDistanceOptions() {
  return DISTANCE_OPTIONS;
}

const MATERIALS_FEE = 25;

/**
 * Quote-before-book estimate: an hourly labor range (min–max crew hours)
 * plus a flat travel fee (scaled past a 10-mile radius) and a small
 * materials fee. Returns a low/high range rather than one number since
 * job size varies — shown to the customer before they confirm.
 */
export function estimateQuote(pkg, { hours, distanceValue = "local" } = {}) {
  const distance = DISTANCE_OPTIONS.find((d) => d.value === distanceValue) ?? DISTANCE_OPTIONS[0];
  const estimatedHours = hours ?? pkg.minHours;
  const laborLow = pkg.basePrice * pkg.minHours;
  const laborHigh = pkg.basePrice * Math.max(pkg.minHours + 2, estimatedHours);
  const travelFee = 35 + Math.max(0, distance.miles - 10) * 2;

  return {
    hourlyRate: pkg.basePrice,
    laborLow,
    laborHigh,
    travelFee,
    materialsFee: MATERIALS_FEE,
    totalLow: laborLow + travelFee + MATERIALS_FEE,
    totalHigh: laborHigh + travelFee + MATERIALS_FEE,
    distanceLabel: distance.label,
  };
}
