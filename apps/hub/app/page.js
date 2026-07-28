"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "../lib/services";
import styles from "./page.module.css";

// Mock figures — wire these to the real booking ledger once each sub-site
// reports back to a shared store. See ../../../README.md "What's stubbed".
const CUSTOMER_COUNT = "2,400+";

const CITIES = [
  "Jacksonville",
  "Ponte Vedra Beach",
  "Atlantic Beach",
  "Neptune Beach",
  "St Augustine",
  "Fernandina Beach",
  "Orange Park",
  "Mandarin",
];

const movingHref = services.find((s) => s.key === "moving")?.href ?? "#";
const towingHref = services.find((s) => s.key === "towing")?.href ?? "#";
const fishingHref = services.find((s) => s.key === "fishing")?.href ?? "#";
const detailingHref = services.find((s) => s.key === "detailing")?.href ?? "#";

const OFFER_CARDS = [
  {
    cat: "Float moving",
    title: "Moving & hauling",
    body: "Local and long-distance moves, residential or commercial, with a real quote before you book.",
    image: "/images/service-moving.jpg",
    alt: "Movers loading boxes into a moving van",
    href: movingHref,
  },
  {
    cat: "Float towing",
    title: "Marine towing",
    body: "24/7 on-water towing, launch to dock, from licensed marine operators.",
    image: "/images/service-towing.jpg",
    alt: "A boat towing another vessel on open water",
    href: towingHref,
  },
  {
    cat: "Float fishing + detailing",
    title: "Charters & detailing",
    body: "Book an offshore charter or get your boat and car detailed dockside.",
    image: "/images/service-fishing.jpg",
    alt: "Anglers fishing from a boat on the water",
    href: fishingHref,
  },
];

const PERSONAS = [
  {
    image: "/images/service-moving.jpg",
    alt: "Movers loading boxes into a moving van",
    title: "Homeowners & renters",
    body: "Moving out of a house or into a new office, Float gives you a crew, a truck, and a real price before moving day.",
    checks: [
      "Local and long-distance moves",
      "Packing and loading crews",
      "Real-time move-day tracking",
    ],
    cta: "Book a move",
    href: movingHref,
  },
  {
    image: "/images/service-towing.jpg",
    alt: "A boat towing another vessel on open water",
    title: "Boat owners",
    body: "Engine trouble doesn't wait for business hours — neither does Float Towing.",
    checks: [
      "24/7 dispatch, day or night",
      "Licensed marine operators",
      "Launch, dock, or open-water pickup",
    ],
    cta: "Request a tow",
    href: towingHref,
  },
  {
    image: "/images/service-fishing.jpg",
    alt: "Anglers fishing from a boat on the water",
    title: "Anglers & groups",
    body: "Private or group charters, inshore or offshore, with a captain who knows the water.",
    checks: [
      "Inshore and offshore charters",
      "Private and group bookings",
      "Every dollar spent earns a trip entry",
    ],
    cta: "Book a charter",
    href: fishingHref,
  },
];

const AMENITIES = [
  { label: "Licensed & insured crew", icon: ShieldIcon },
  { label: "Instant online quotes", icon: ListIcon },
  { label: "Live job tracking", icon: ClockIcon },
  { label: "Secure online payment", icon: CardIcon },
  { label: "Photo confirmation", icon: CameraIcon },
  { label: "Rewards on every dollar", icon: StarburstIcon },
  { label: "Flexible rescheduling", icon: CalendarIcon },
  { label: "24/7 support line", icon: PhoneIcon },
  { label: "Verified reviews", icon: DocIcon },
];

// Only the "Moving" tab has real, client-approved card content — Towing,
// Fishing, and Detailing tiers below are illustrative placeholders built to
// match the same pattern and need real pricing/duration from the client.
const MOVING_IMG = { image: "/images/service-moving.jpg", alt: "Movers loading boxes into a moving van" };
const TOWING_IMG = { image: "/images/service-towing.jpg", alt: "A boat towing another vessel on open water" };
const FISHING_IMG = { image: "/images/service-fishing.jpg", alt: "Anglers fishing from a boat on the water" };
const DETAILING_IMG = { image: "/images/service-detailing.jpg", alt: "Crew washing and detailing a boat deck" };

const TAB_PANELS = {
  moving: [
    { badge: "Studio", title: "Studio move", sub: "1–2 movers, 2–3 hrs", ...MOVING_IMG },
    { badge: "1–2 bed", title: "Home move", sub: "2–3 movers, half day", ...MOVING_IMG },
    { badge: "3+ bed", title: "Full house", sub: "3–4 movers, full day", ...MOVING_IMG },
    { badge: "Office", title: "Commercial", sub: "Custom crew & quote", ...MOVING_IMG },
  ],
  towing: [
    { badge: "Launch", title: "Launch assist", sub: "Get on the water fast", ...TOWING_IMG },
    { badge: "Open water", title: "Open-water tow", sub: "Breakdown & salvage", ...TOWING_IMG },
    { badge: "Dock", title: "Dock-to-dock", sub: "Slip to slip transport", ...TOWING_IMG },
    { badge: "Fleet", title: "Commercial fleet", sub: "Standing service contracts", ...TOWING_IMG },
  ],
  fishing: [
    { badge: "Half-day", title: "Inshore trip", sub: "1–4 anglers, 4 hrs", ...FISHING_IMG },
    { badge: "Full-day", title: "Offshore charter", sub: "1–6 anglers, 8 hrs", ...FISHING_IMG },
    { badge: "Private", title: "Private charter", sub: "Your group, your boat", ...FISHING_IMG },
    { badge: "Group", title: "Group booking", sub: "Split-cost group trips", ...FISHING_IMG },
  ],
  detailing: [
    { badge: "Interior", title: "Interior detail", sub: "Cabin or cab, 2–3 hrs", ...DETAILING_IMG },
    { badge: "Full", title: "Full detail", sub: "Interior + exterior", ...DETAILING_IMG },
    { badge: "Marine", title: "Boat detailing", sub: "Gel-coat & compound", ...DETAILING_IMG },
    { badge: "Fleet", title: "Fleet detailing", sub: "Recurring service plans", ...DETAILING_IMG },
  ],
};

const TABS = [
  { key: "moving", label: "Moving" },
  { key: "towing", label: "Towing" },
  { key: "fishing", label: "Fishing" },
  { key: "detailing", label: "Detailing" },
];

const TESTIMONIALS = [
  {
    quote:
      "Needed a tow at 9pm on a Saturday. Had someone on the water in under 40 minutes. Can't recommend Float Towing enough.",
    name: "Maria C.",
    location: "Ponte Vedra, FL",
  },
];

const TESTIMONIAL_CARDS = [
  {
    quote: "Chartered a half-day offshore trip. Boat was immaculate, captain knew exactly where the fish were.",
    name: "Derek K.",
    location: "Atlantic Beach, FL",
    initials: "DK",
  },
  {
    quote: "Booked a move and a detailing job in the same week. Same easy process both times, no surprises on price.",
    name: "Jordan R.",
    location: "Jacksonville, FL",
    initials: "JR",
  },
  {
    quote: "The fishing-trip entries are a fun touch — we've booked three services this year just to keep stacking them.",
    name: "Sarah L.",
    location: "St Augustine, FL",
    initials: "SL",
  },
  {
    quote: "Crew showed up on time, called ahead, and left the driveway cleaner than they found it. Will book again.",
    name: "Tom W.",
    location: "Mandarin, FL",
    initials: "TW",
  },
];

const FOOTER_SERVICE_LINKS = [
  { label: "Float Moving", href: movingHref },
  { label: "Float Towing", href: towingHref },
  { label: "Float Fishing", href: fishingHref },
  { label: "Float Detailing", href: detailingHref },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("moving");

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.wrap}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logo.webp"
                alt="Float.us"
                width={1298}
                height={477}
                priority
                className={styles.logoMark}
              />
            </Link>
            <div className={styles.navlinks}>
              <a href="#offer">Services</a>
              <a href="#serve">Who we serve</a>
              <a href="#zones">Service area</a>
              <a href="#pricing">Pricing</a>
              <a href="#reviews">Reviews</a>
            </div>
            <div className={styles.navbtns}>
              <a className={`${styles.pill} ${styles.pillOutline}`} href="#contact">
                Speak to the crew
              </a>
              <a className={`${styles.pill} ${styles.pillDark}`} href="#offer">
                Book a service
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1>
                  Moving, towing, and charters — <em>one crew</em>, booked in minutes.
                </h1>
                <p>
                  Float handles residential moves, marine towing, fishing charters, and detailing for Jacksonville
                  and the First Coast. Get an instant quote and book online.
                </p>
                <div className={styles.heroBtns}>
                  <a className={`${styles.pill} ${styles.pillDark}`} href="#offer">
                    Book a service
                  </a>
                  <a className={`${styles.pill} ${styles.pillOutline}`} href="#contact">
                    Speak to the crew
                  </a>
                </div>
              </div>
              <div className={styles.heroPhoto}>
                <Image
                  src="/images/hero-boat-sunset.jpg"
                  alt="Sailboat on the water at sunset near Florida's coast"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.photoOverlayStrong} />
                <div className={styles.quoteChip}>
                  &ldquo;From the first call to the last box, Float made it feel simple.&rdquo;
                </div>
              </div>
            </div>

            <div className={styles.trustLine}>Float is trusted by {CUSTOMER_COUNT} customers across the First Coast</div>
          </div>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...CITIES, ...CITIES].map((city, i) => (
                <span className={styles.zoneChip} key={`${city}-${i}`}>
                  <span className={styles.zoneDot}>
                    <PinIcon />
                  </span>
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>What we offer</div>
            <div className={styles.sectionHead}>
              <h2>
                How Float supports <em>your</em> day
              </h2>
              <p>Everything you need to move, tow, fish, or freshen up — in one place.</p>
            </div>
            <div className={styles.offerGrid}>
              {OFFER_CARDS.map((card) => (
                <div className={styles.offerCard} key={card.title}>
                  <div className={styles.offerPhoto}>
                    <Image src={card.image} alt={card.alt} fill sizes="(max-width: 900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                    <div className={styles.photoOverlay} />
                  </div>
                  <div className={styles.offerBody}>
                    <div className={styles.offerCat}>{card.cat}</div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <a className={`${styles.pill} ${styles.pillDark}`} href={card.href}>
                      Learn more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionTight}>
          <div className={styles.wrap}>
            <div className={styles.quoteBand}>
              <div className={styles.avatarStack}>
                <div className={styles.av} style={{ background: "#1fb894" }}>
                  JR
                </div>
                <div className={styles.av} style={{ background: "#3fc4ea" }}>
                  MC
                </div>
                <div className={styles.av} style={{ background: "#274158" }}>
                  DK
                </div>
                <div className={styles.av} style={{ background: "#0d8a6b" }}>
                  +
                </div>
              </div>
              <div className={styles.statCopy}>
                <strong>{CUSTOMER_COUNT} happy customers</strong>
                <span>across the First Coast</span>
              </div>
              <div className={styles.pull}>
                &ldquo;Booked a move and a detailing job the same week — same easy process both times.&rdquo;
                <cite>Jordan R., Jacksonville</cite>
              </div>
            </div>
          </div>
        </section>

        <section id="serve" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>Who is this for</div>
            <div className={styles.sectionHead}>
              <h2>
                Who Float <em>serves</em>
              </h2>
              <p>From a single move to a standing charter booking, Float has a service for your day on land or water.</p>
            </div>

            {PERSONAS.map((persona) => (
              <div className={styles.persona} key={persona.title}>
                <div className={styles.personaGrid}>
                  <div className={`${styles.personaPhoto} ${styles.offerPhoto}`}>
                    <Image src={persona.image} alt={persona.alt} fill sizes="(max-width: 900px) 100vw, 340px" style={{ objectFit: "cover" }} />
                    <div className={styles.photoOverlay} />
                  </div>
                  <div className={styles.personaBody}>
                    <h3>{persona.title}</h3>
                    <p>{persona.body}</p>
                    <ul className={styles.checklist}>
                      {persona.checks.map((check) => (
                        <li key={check}>
                          <CheckIcon />
                          {check}
                        </li>
                      ))}
                    </ul>
                    <a className={`${styles.pill} ${styles.pillDark}`} href={persona.href}>
                      {persona.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.trustedBar}>
              <PinIcon />
              Trusted by {CUSTOMER_COUNT} customers across the First Coast
            </div>
          </div>
        </section>

        <section id="zones" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>Where we serve</div>
            <div className={styles.sectionHead}>
              <h2>Our service area</h2>
              <p>Float crews run daily across three counties on Florida&apos;s First Coast.</p>
            </div>
            <div className={styles.locGrid}>
              <div className={styles.locPhoto}>
                <Image
                  src="/images/location-jacksonville.jpg"
                  alt="Downtown Jacksonville skyline along the St. Johns River"
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.photoOverlayStrong} />
                <div className={styles.pinBadge}>
                  <PinIcon />
                  Jacksonville, FL
                </div>
                <div className={styles.cap}>
                  Serving the <em style={{ color: "#9fe6ff" }}>First Coast</em>
                </div>
              </div>
              <div className={styles.locList}>
                <div className={styles.locRegion}>Duval County</div>
                <LocItem label="Downtown Jacksonville" active />
                <LocItem label="Mandarin" />
                <LocItem label="Arlington" />
                <div className={styles.locRegion}>St Johns County</div>
                <LocItem label="Ponte Vedra Beach" />
                <LocItem label="St Augustine" />
                <div className={styles.locRegion}>Nassau County</div>
                <LocItem label="Fernandina Beach" />
                <LocItem label="Yulee" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>What&apos;s included</div>
            <div className={styles.sectionHead}>
              <h2>Every booking includes</h2>
            </div>
            <div className={styles.amenGrid}>
              {AMENITIES.map((item) => (
                <div className={styles.amenRow} key={item.label}>
                  {item.label}
                  <span className={styles.amenIcon}>
                    <item.icon />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>Our services</div>
            <div className={styles.sectionHead}>
              <h2>A booking for every job</h2>
              <p>Become part of the {CUSTOMER_COUNT} customers who&apos;ve booked with Float on the First Coast.</p>
            </div>
            <div className={styles.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.svcRow}>
              {TAB_PANELS[activeTab].map((card) => (
                <div className={styles.svcCard} key={card.title}>
                  <div className={styles.svcPhoto}>
                    <Image src={card.image} alt={card.alt} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                    <div className={styles.photoOverlay} />
                    <span className={styles.svcBadge}>{card.badge}</span>
                    <span className={styles.svcArrow}>
                      <ChevronIcon />
                    </span>
                  </div>
                  <div className={styles.svcCap}>
                    <strong>{card.title}</strong>
                    <span>{card.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.priceBand}>
              <div className={styles.priceCopy}>
                <div className={styles.eyebrow}>Simple pricing</div>
                <h2>Book without the guesswork</h2>
                <p>See a real price range before you commit — every service, every time.</p>
                <ul className={styles.priceChecks}>
                  <li>
                    <CheckIcon />
                    <span>
                      <strong>Transparent pricing</strong>Know your estimate before you book.
                    </span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>
                      <strong>Book same week</strong>No long lead times for most services.
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.priceCard}>
                <div className={styles.eyebrow}>Starting at</div>
                <div className={styles.amt}>
                  $89 <span>/ booking</span>
                </div>
                <p>Pricing varies by service, distance, and job size. All bookings include crew insurance and live tracking.</p>
                <div className={styles.btnrow}>
                  <a className={`${styles.pill} ${styles.pillAccent}`} href="#offer">
                    Get a quote
                  </a>
                  <a className={`${styles.pill} ${styles.pillOutline}`} href="#offer">
                    See all pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>Testimonials</div>
            <div className={styles.sectionHead}>
              <h2>
                Your <em>future</em> Float story
              </h2>
              <p>From weekend charters to whole-house moves, here&apos;s why customers choose Float.</p>
            </div>
            <div className={styles.testGrid}>
              <div className={styles.testBig}>
                <p>&ldquo;{TESTIMONIALS[0].quote}&rdquo;</p>
                <cite>
                  {TESTIMONIALS[0].name} — {TESTIMONIALS[0].location}
                </cite>
              </div>
              {TESTIMONIAL_CARDS.map((t) => (
                <div className={styles.testCard} key={t.name}>
                  <div className={styles.stars}>★★★★★</div>
                  <p>{t.quote}</p>
                  <div className={styles.testWho}>
                    <div className={styles.av}>{t.initials}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.finalCta}>
              <h2>
                Find your next Float booking <em style={{ color: "#7de8c9" }}>today</em>
              </h2>
              <p>Join {CUSTOMER_COUNT} customers moving, towing, fishing, and detailing across the First Coast.</p>
              <div className={styles.row}>
                <a className={`${styles.pill} ${styles.pillAccent}`} href="#offer">
                  Book a service
                </a>
                <a className={`${styles.pill} ${styles.pillOutlineLight}`} href="#contact">
                  Speak to the crew
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className={styles.siteFooter}>
        <div className={styles.wrap}>
          <div className={styles.footGrid}>
            <div className={styles.footCol}>
              <h5>Float services</h5>
              {FOOTER_SERVICE_LINKS.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className={styles.footCol}>
              <h5>Built for</h5>
              <a href="#serve">Homeowners &amp; renters</a>
              <a href="#serve">Boat owners</a>
              <a href="#serve">Anglers &amp; groups</a>
            </div>
            <div className={styles.footCol}>
              <h5>Resources</h5>
              <a href="#pricing">Pricing</a>
              <a href="#reviews">Reviews</a>
              <a href="#offer">Rewards program</a>
            </div>
            <div className={styles.footCol}>
              <h5>Information</h5>
              <a href="#">Company</a>
              <a href="#">FAQs</a>
              <a href="#">Careers</a>
            </div>
            <div className={styles.footBrandBox}>
              <div className={styles.logo}>
                <Image
                  src="/images/logo.webp"
                  alt="Float.us"
                  width={1298}
                  height={477}
                  className={styles.logoMark}
                />
              </div>
              <p>904-625-0199</p>
              <p>info@float.us</p>
              <p>Jacksonville, FL</p>
              <div className={styles.footSocial}>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footBottom}>
            <span>&copy; {new Date().getFullYear()} Float.us. All rights reserved.</span>
            <span>Privacy policy &middot; Terms &amp; conditions</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function LocItem({ label, active }) {
  return (
    <div className={`${styles.locItem} ${active ? styles.active : ""}`}>
      {label}
      <ChevronIcon stroke={active ? "#04241b" : "#8698a8"} />
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChevronIcon({ stroke = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="12" cy="12.5" r="3.2" />
    </svg>
  );
}

function StarburstIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M12 17.3l-5.4 3 1.4-6.1L3 9.8l6.2-.5L12 3.5l2.8 5.8 6.2.5-4.9 4.4 1.4 6.1z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M4 5h4l2 5-2.5 1.5a11 11 0 005 5L14 14l5 2v4a2 2 0 01-2 2C9 22 2 15 2 7a2 2 0 012-2z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M8 10h8M8 14h5" />
      <rect x="3" y="4" width="18" height="14" rx="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}
