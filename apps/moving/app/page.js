"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ListingCard,
  Section,
  SectionHeading,
  SearchBar,
  SiteFooter,
  SiteHeader,
  StatBand,
  TestimonialCarousel,
  TrustGrid,
} from "@float/ui";
import { MOVE_PACKAGES } from "../lib/packages";
import styles from "./page.module.css";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://float.us";

const SEARCH_FIELDS = [
  {
    name: "type",
    label: "Service Type",
    type: "select",
    placeholder: "Any type",
    options: [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "hauling", label: "Hauling" },
    ],
  },
  {
    name: "size",
    label: "Home / Job Size",
    type: "select",
    placeholder: "Any size",
    options: [
      { value: "studio", label: "Studio" },
      { value: "1br", label: "1 Bedroom" },
      { value: "2br", label: "2 Bedroom" },
      { value: "3br", label: "3 Bedroom" },
      { value: "4br+", label: "4+ Bedroom" },
      { value: "office-small", label: "Small Office" },
      { value: "office-large", label: "Large Office" },
      { value: "warehouse", label: "Warehouse" },
      { value: "any", label: "Not sure yet" },
    ],
  },
  { name: "date", label: "Move Date", type: "date" },
  { name: "zip", label: "ZIP Code", type: "text", placeholder: "32202" },
];

const STATS = [
  { value: "1,200+", label: "Moves Completed" },
  { value: "98%", label: "On-Time Rate" },
  { value: "4.8★", label: "Average Rating" },
  { value: "24 hr", label: "Booking Guarantee" },
];

const TRUST_ITEMS = [
  { icon: "🛡️", title: "Verified Crews", description: "Every mover is background-checked and insured before their first job." },
  { icon: "💵", title: "Transparent Pricing", description: "See a price range before you book — no surprise fees on move day." },
  { icon: "📍", title: "Live Crew Tracking", description: "Know when your crew is on the way, in real time." },
  { icon: "💳", title: "Guest or Account", description: "Book as a guest, or save your details for next time." },
];

const TESTIMONIALS = [
  { name: "Marcus D.", location: "Jacksonville, FL", rating: 5, quote: "Quoted, booked, and moved in the same week. The crew called ahead and showed up early." },
  { name: "Lena K.", location: "Orange Park, FL", rating: 5, quote: "Office move over a weekend with zero downtime Monday morning. Would book again." },
  { name: "Sam T.", location: "Ponte Vedra, FL", rating: 4.5, quote: "Junk removal crew cleared out a whole garage in under two hours." },
];

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Float.us Hub", href: HUB_URL },
      { label: "About", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

function SocialIcon({ src }) {
  // eslint-disable-next-line @next/next/no-img-element -- tiny inline social glyphs
  return <img src={src} alt="" width={17} height={17} />;
}

const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: <SocialIcon src="/icons/social-facebook.svg" /> },
  { name: "Instagram", href: "#", icon: <SocialIcon src="/icons/social-instagram.svg" /> },
  { name: "Email", href: "#", icon: <SocialIcon src="/icons/social-email.svg" /> },
];

export default function Home() {
  const [filters, setFilters] = useState({ type: "", size: "" });

  const filtered = useMemo(() => {
    return MOVE_PACKAGES.filter((pkg) => {
      const matchesType = !filters.type || pkg.type === filters.type;
      const matchesSize = !filters.size || pkg.sizes.includes(filters.size) || pkg.sizes.includes("any");
      return matchesType && matchesSize;
    });
  }, [filters]);

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <Image src="/images/hero-bg.webp" alt="" fill priority sizes="100vw" className={styles.backgroundImage} />
        <div className={styles.backgroundGradient} />
      </div>

      <SiteHeader
        as={Link}
        logo={<Image src="/images/logo.webp" alt="Float Moving" width={1298} height={477} priority className={styles.headerLogo} />}
        brand="Moving"
        navLinks={[
          { label: "Packages", href: "#packages" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Reviews", href: "#reviews" },
        ]}
        cta={{ label: "Get a Quote", href: "#packages" }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Float Moving</p>
          <h1 className={styles.heroHeading}>Book Your Move In Minutes</h1>
          <p className={styles.heroSub}>
            Tell us the job, pick a crew, and see your price range before you confirm — residential,
            commercial, or hauling.
          </p>
        </div>

        <div className={styles.searchWrap}>
          <SearchBar fields={SEARCH_FIELDS} onSearch={setFilters} submitLabel="Find a Crew" />
        </div>
      </section>

      <Section id="packages">
        <div className={styles.resultsHeader}>
          <SectionHeading
            align="left"
            eyebrow="Available Packages"
            title="Pick a crew for your job"
          />
          <p className={styles.resultsCount}>{filtered.length} of {MOVE_PACKAGES.length} packages</p>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.listingsGrid}>
            {filtered.map((pkg) => (
              <ListingCard
                key={pkg.id}
                as={Link}
                href={`/listings/${pkg.id}`}
                icon={pkg.icon}
                tag={pkg.tag}
                title={pkg.name}
                subtitle={pkg.specs[0]}
                specs={pkg.specs}
                price={pkg.basePrice}
                priceUnit={pkg.priceUnit}
                rating={pkg.rating}
                reviewCount={pkg.reviewCount}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No packages match those filters</p>
            <p className={styles.emptyDescription}>
              Try a different service type or size — or clear the filters to see everything we offer.
            </p>
          </div>
        )}
      </Section>

      <Section id="how-it-works">
        <div className={styles.sectionStack}>
          <SectionHeading
            eyebrow="Why Float Moving"
            title="Built so booking a move feels easy"
            description="The same crew standards and transparent pricing on every job."
          />
          <TrustGrid items={TRUST_ITEMS} />
        </div>
      </Section>

      <Section>
        <StatBand stats={STATS} />
      </Section>

      <Section id="reviews">
        <div className={styles.sectionStack}>
          <SectionHeading eyebrow="Testimonials" title="What customers are saying" />
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </Section>

      <div id="contact">
        <SiteFooter
          as={Link}
          logo={<Image src="/images/logo.webp" alt="Float Moving" width={1298} height={477} className={styles.headerLogo} />}
          tagline="Residential, commercial, and hauling — booked in minutes."
          columns={FOOTER_COLUMNS}
          socialLinks={SOCIAL_LINKS}
          copyrightName="Float Moving"
        />
      </div>
    </main>
  );
}
