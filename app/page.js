import Image from "next/image";
import styles from "./page.module.css";

const services = [
  {
    icon: "/icons/icon-residential.svg",
    label: ["Residential", "Moving"],
  },
  {
    icon: "/icons/icon-commercial.svg",
    label: ["Commercial", "Moving"],
  },
  {
    icon: "/icons/icon-marine.svg",
    label: ["Marine", "Towing"],
  },
  {
    icon: "/icons/icon-fishing.svg",
    label: ["Fishing", "Charters"],
  },
  {
    icon: "/icons/icon-hauling.svg",
    label: ["Hauling", "Services"],
  },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: "/icons/social-facebook.svg" },
  { name: "Instagram", href: "#", icon: "/icons/social-instagram.svg" },
  { name: "Email", href: "#", icon: "/icons/social-email.svg" },
];

// Decorative light-streak lines that flare out from the wordmark, expressed as
// percentages of a shared 493x150 reference box so they scale with the logo.
const logoDecor = [
  { src: "/images/logo-decor-b.svg", left: 71.2, top: 25.33, width: 34.28 },
  { src: "/images/logo-decor-a.svg", left: 71.2, top: 36.67, width: 18.66 },
  { src: "/images/logo-decor-c.svg", left: 71.2, top: 29.33, width: 19.68 },
  { src: "/images/logo-decor-c.svg", left: 79.31, top: 42, width: 19.68 },
  { src: "/images/logo-decor-c.svg", left: 69.78, top: 50.67, width: 19.68 },
  { src: "/images/logo-decor-c.svg", left: 79.11, top: 61.33, width: 19.68 },
  { src: "/images/logo-decor-c.svg", left: 78.5, top: 68.67, width: 19.68 },
  { src: "/images/logo-decor-d.svg", left: 87.22, top: 48, width: 12.78 },
  { src: "/images/logo-decor-d.svg", left: 79.72, top: 54.67, width: 12.78 },
  { src: "/images/logo-decor-e.svg", left: 74.85, top: 72.67, width: 17.65 },
];

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

      <header className={styles.logoWrap}>
        <div className={styles.logoBox}>
          <Image
            src="/images/logo.webp"
            alt="Float.us — We move. We tow. You enjoy."
            width={1298}
            height={477}
            priority
            className={styles.logo}
          />
          <div className={styles.logoDecor} aria-hidden="true">
            {/* decorative flares stretch independently on both axes (non-uniform
                scale), which next/image's intrinsic width/height model can't express */}
            {logoDecor.map((line, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={line.src}
                alt=""
                className={styles.decorLine}
                style={{
                  left: `${line.left}%`,
                  top: `${line.top}%`,
                  width: `${line.width}%`,
                }}
              />
            ))}
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heading}>Coming Soon</h1>

        <p className={styles.tagline}>
          <span className={styles.taglineLine}>
            Something great is on the horizon.
          </span>
          <span className={styles.taglineLine}>
            We&rsquo;re preparing an experience that{" "}
            <strong className={styles.highlight}>moves</strong> you.
          </span>
        </p>

        <ul className={styles.services}>
          {services.map((service) => (
            <li className={styles.serviceItem} key={service.label.join(" ")}>
              <div className={styles.serviceIcon}>
                <Image src={service.icon} alt="" width={64} height={64} />
              </div>
              <p className={styles.serviceLabel}>
                {service.label.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerDivider}>
          <span className={styles.dividerLine} />
          <p className={styles.dividerLabel}>Stay Connected</p>
          <span className={styles.dividerLine} />
        </div>

        <div className={styles.socials}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className={styles.socialLink}
            >
              <Image src={social.icon} alt="" width={17} height={17} />
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} <span>Float.us</span>. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
