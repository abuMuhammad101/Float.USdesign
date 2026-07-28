"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  IncentiveBanner,
  Section,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StatBand,
  TestimonialCarousel,
  TrustGrid,
} from "@float/ui";
import { services } from "../lib/services";
import styles from "./page.module.css";

// Mock figures for the incentive banner and stat band — wire these to the
// real booking ledger once each sub-site reports back to a shared store.
// See ../../../README.md "What's stubbed" section.
const REWARD_ENTRIES = 8240;
const REWARD_GOAL = 15000;

const STATS = [
  { value: "500+", label: "Jobs Completed" },
  { value: "350+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "6 Yrs", label: "In Business" },
];

const TRUST_ITEMS = [
  {
    icon: "🛡️",
    title: "Verified Crews",
    description: "Every crew and captain is background-checked and insured before they're on the schedule.",
  },
  {
    icon: "⚡",
    title: "Fast Quotes",
    description: "See a real price range in minutes — no waiting on a callback to know what it costs.",
  },
  {
    icon: "📍",
    title: "Live Tracking",
    description: "Know exactly when your crew, tow, or captain is on the way.",
  },
  {
    icon: "💳",
    title: "Easy Payments",
    description: "Book as a guest or save your details for next time — your call.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus D.",
    location: "Jacksonville, FL — Float Moving",
    rating: 5,
    quote: "Quoted, booked, and moved in the same week. The crew called ahead and showed up early.",
  },
  {
    name: "Priya S.",
    location: "St. Augustine, FL — Float Fishing",
    rating: 5,
    quote: "Booked a charter in five minutes from my phone. Captain was fantastic with the kids.",
  },
  {
    name: "Ray O.",
    location: "Mayport, FL — Float Towing",
    rating: 4.5,
    quote: "Engine died a mile offshore and they had a boat to us faster than I expected.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: services.map((service) => ({ label: service.name, href: service.href })),
  },
  {
    title: "Company",
    links: [
      { label: "About Float.us", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: <SocialIcon src="/icons/social-facebook.svg" /> },
  { name: "Instagram", href: "#", icon: <SocialIcon src="/icons/social-instagram.svg" /> },
  { name: "Email", href: "#", icon: <SocialIcon src="/icons/social-email.svg" /> },
];

function SocialIcon({ src }) {
  // eslint-disable-next-line @next/next/no-img-element -- tiny inline social glyphs
  return <img src={src} alt="" width={17} height={17} />;
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundGradient} />
      </div>

      <SiteHeader
        as={Link}
        logo={
          <Image
            src="/images/logo.webp"
            alt="Float.us"
            width={1298}
            height={477}
            priority
            className={styles.headerLogo}
          />
        }
        navLinks={[
          { label: "Services", href: "#services" },
          { label: "Rewards", href: "#rewards" },
          { label: "Contact", href: "#contact" },
        ]}
        cta={{ label: "Get a Quote", href: "#services" }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Float.us</p>
          <h1 className={styles.heroHeading}>Pick Your Float Service</h1>
          <p className={styles.heroSub}>
            Moving, towing, fishing charters, and detailing — book any of it in minutes, and every
            dollar you spend gets you closer to winning an offshore fishing trip.
          </p>
          <div className={styles.heroActions}>
            <Button as={Link} href="#services" size="lg">
              Get a Quote
            </Button>
            <Button as={Link} href="#rewards" variant="secondary" size="lg">
              See Rewards
            </Button>
          </div>
        </div>
      </section>

      <Section id="services">
        <SectionHeading
          eyebrow="Our Services"
          title="Four ways we've got you covered"
          description="Each service has its own booking engine, sized and staffed for the job — pick one to get started."
        />

        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const isLive = service.status === "live";
            const CardTag = isLive ? Link : "div";
            const cardProps = isLive ? { href: service.href } : { "aria-disabled": true };
            return (
              <CardTag
                key={service.key}
                {...cardProps}
                className={[styles.serviceCard, !isLive ? styles.serviceCardDisabled : ""].join(" ")}
              >
                <span className={styles.serviceStatus}>
                  <Badge variant={isLive ? "success" : "neutral"}>
                    {isLive ? "Live" : "Coming Soon"}
                  </Badge>
                </span>
                <span className={styles.serviceIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small service glyphs */}
                  <img src={service.icon} alt="" />
                </span>
                <p className={styles.serviceTagline}>{service.tagline}</p>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <span className={styles.serviceCtaRow}>
                  {isLive ? "Book now" : "Notify me"} <span aria-hidden="true">→</span>
                </span>
              </CardTag>
            );
          })}
        </div>
      </Section>

      <Section id="rewards">
        <div className={styles.sectionStack}>
          <SectionHeading
            eyebrow="Float Rewards"
            title="Spend $1, earn 1 entry"
            description="Every purchase across any Float service earns entries toward a seasonal drawing — no separate sign-up required."
          />

          <IncentiveBanner
            entries={REWARD_ENTRIES}
            goal={REWARD_GOAL}
            drawingLabel="Drawing closes September 30 — entries reset each quarter"
          />

          <div className={styles.rewardsGrid}>
            <div className={styles.rewardStep}>
              <p className={styles.rewardStepNumber}>01</p>
              <p className={styles.rewardStepTitle}>Book a Float service</p>
              <p className={styles.rewardStepDescription}>
                Moving, towing, fishing, or detailing — any completed booking counts.
              </p>
            </div>
            <div className={styles.rewardStep}>
              <p className={styles.rewardStepNumber}>02</p>
              <p className={styles.rewardStepTitle}>Earn entries automatically</p>
              <p className={styles.rewardStepDescription}>
                $1 spent = 1 entry, credited to your account after the job is complete.
              </p>
            </div>
            <div className={styles.rewardStep}>
              <p className={styles.rewardStepNumber}>03</p>
              <p className={styles.rewardStepTitle}>Win the trip</p>
              <p className={styles.rewardStepDescription}>
                One winner is drawn each quarter and joins us for an offshore fishing trip.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <StatBand stats={STATS} />
      </Section>

      <Section>
        <div className={styles.sectionStack}>
          <SectionHeading
            eyebrow="Why Float"
            title="Built so booking a job feels easy"
            description="The same crew standards and transparent pricing across every service."
          />
          <TrustGrid items={TRUST_ITEMS} />
        </div>
      </Section>

      <Section>
        <div className={styles.sectionStack}>
          <SectionHeading eyebrow="Testimonials" title="What customers are saying" />
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </Section>

      <div id="contact">
        <SiteFooter
          as={Link}
          logo={
            <Image
              src="/images/logo.webp"
              alt="Float.us"
              width={1298}
              height={477}
              className={styles.headerLogo}
            />
          }
          tagline="We move. We tow. We clean. We fish. You enjoy."
          columns={FOOTER_COLUMNS}
          socialLinks={SOCIAL_LINKS}
          copyrightName="Float.us"
        />
      </div>
    </main>
  );
}
