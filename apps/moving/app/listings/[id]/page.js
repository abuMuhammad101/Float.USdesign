import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, SiteFooter, SiteHeader, StarRating } from "@float/ui";
import { getPackage, MOVE_PACKAGES } from "../../../lib/packages";
import styles from "./page.module.css";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://float.us";

const MOCK_REVIEWS = {
  "cargo-van-2": [
    { name: "Alicia R.", rating: 5, quote: "In and out of my 1BR in under two hours. Careful with everything." },
    { name: "Jon P.", rating: 5, quote: "Booked the night before, crew showed up right on time." },
  ],
  "box-truck-4": [
    { name: "Marcus D.", rating: 5, quote: "Four movers made a 4-bedroom move feel easy. Highly recommend." },
    { name: "Grace T.", rating: 4.5, quote: "Great crew, truck was a little later than the window but they called ahead." },
  ],
  "commercial-crew": [
    { name: "Lena K.", rating: 5, quote: "Weekend office move, zero downtime Monday. Exactly what we needed." },
    { name: "Devon W.", rating: 4.5, quote: "Handled our server room equipment with real care." },
  ],
  "hauling-crew": [
    { name: "Sam T.", rating: 4.5, quote: "Cleared a garage full of junk in under two hours, same day." },
    { name: "Priya S.", rating: 5, quote: "Easiest booking of the four quotes I got." },
  ],
};

export function generateStaticParams() {
  return MOVE_PACKAGES.map((pkg) => ({ id: pkg.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) return { title: "Package not found — Float Moving" };
  return {
    title: `${pkg.name} — Float Moving`,
    description: pkg.description,
  };
}

export default async function ListingDetailPage({ params }) {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) notFound();

  const reviews = MOCK_REVIEWS[pkg.id] ?? [];

  return (
    <main className={styles.page}>
      <SiteHeader
        as="a"
        logo={<Image src="/images/logo.webp" alt="Float Moving" width={1298} height={477} priority className={styles.headerLogo} />}
        brand="Moving"
        navLinks={[
          { label: "Packages", href: "/#packages" },
          { label: "How it works", href: "/#how-it-works" },
          { label: "Reviews", href: "/#reviews" },
        ]}
        cta={{ label: "Get a Quote", href: "/#packages" }}
      />

      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← All packages
        </Link>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.gallery}>
              <div className={styles.galleryMain}>
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder art; swap for real crew/truck photography */}
                <img src={pkg.icon} alt="" className={styles.galleryIcon} />
              </div>
              <div className={styles.galleryStrip} aria-hidden="true">
                <div className={[styles.galleryThumb, styles.thumbA].join(" ")} />
                <div className={[styles.galleryThumb, styles.thumbB].join(" ")} />
                <div className={[styles.galleryThumb, styles.thumbC].join(" ")} />
              </div>
            </div>

            <div className={styles.titleBlock}>
              {pkg.tag && <Badge variant="accent">{pkg.tag}</Badge>}
              <h1 className={styles.title}>{pkg.name}</h1>
              <div className={styles.ratingRow}>
                <StarRating rating={pkg.rating} reviewCount={pkg.reviewCount} size="md" />
                <span className={styles.verified}>
                  <Badge variant="success">Verified &amp; Insured</Badge>
                </span>
              </div>
            </div>

            <p className={styles.description}>{pkg.description}</p>

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>What&rsquo;s included</h2>
              <ul className={styles.includedList}>
                {pkg.included.map((item) => (
                  <li key={item} className={styles.includedItem}>
                    <span className={styles.includedCheck} aria-hidden="true">✓</span> {item}
                  </li>
                ))}
              </ul>
            </section>

            {reviews.length > 0 && (
              <section className={styles.block} id="reviews">
                <h2 className={styles.blockTitle}>Recent reviews</h2>
                <div className={styles.reviewsGrid}>
                  {reviews.map((review) => (
                    <div key={review.name} className={styles.reviewCard}>
                      <StarRating rating={review.rating} size="sm" />
                      <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                      <p className={styles.reviewName}>{review.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.bookingPanel}>
            <div className={styles.bookingCard}>
              <p className={styles.bookingPrice}>
                ${pkg.basePrice}
                <span className={styles.bookingPriceUnit}>/{pkg.priceUnit}</span>
              </p>
              <p className={styles.bookingMinimum}>{pkg.minHours}-hour minimum</p>

              <div className={styles.slotsList}>
                <p className={styles.slotsLabel}>Next available</p>
                {pkg.slots.slice(0, 3).map((slot) => (
                  <span key={slot} className={styles.slot}>
                    {slot}
                  </span>
                ))}
              </div>

              <Button as="a" href={`/book/${pkg.id}`} size="lg" fullWidth>
                Book This Crew
              </Button>
              <p className={styles.bookingNote}>Free to book — you&rsquo;ll confirm a price range before paying anything.</p>
            </div>
          </aside>
        </div>
      </div>

      <div className={styles.mobileBar}>
        <div className={styles.mobileBarPrice}>
          <p className={styles.bookingPrice}>
            ${pkg.basePrice}
            <span className={styles.bookingPriceUnit}>/{pkg.priceUnit}</span>
          </p>
          <p className={styles.bookingMinimum}>{pkg.minHours}-hr minimum</p>
        </div>
        <Button as="a" href={`/book/${pkg.id}`} size="md">
          Book Now
        </Button>
      </div>

      <SiteFooter
        as="a"
        logo={<Image src="/images/logo.webp" alt="Float Moving" width={1298} height={477} className={styles.headerLogo} />}
        tagline="Residential, commercial, and hauling — booked in minutes."
        columns={[{ title: "Company", links: [{ label: "Float.us Hub", href: HUB_URL }, { label: "Back to packages", href: "/" }] }]}
        socialLinks={[]}
        copyrightName="Float Moving"
      />
    </main>
  );
}
