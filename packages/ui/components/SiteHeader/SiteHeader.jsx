"use client";

import { useState } from "react";
import Button from "../Button/Button.jsx";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({
  as: LinkComponent = "a",
  logo,
  brand,
  navLinks = [],
  cta,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <LinkComponent href="/" className={styles.brand}>
          {logo}
          {brand && <span className={styles.brandName}>{brand}</span>}
        </LinkComponent>

        <nav className={[styles.nav, open ? styles.navOpen : ""].join(" ")}>
          {navLinks.map((link) => (
            <LinkComponent key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </LinkComponent>
          ))}
          {cta && (
            <Button as={LinkComponent} href={cta.href} size="sm" className={styles.mobileCta}>
              {cta.label}
            </Button>
          )}
        </nav>

        <div className={styles.actions}>
          {cta && (
            <Button as={LinkComponent} href={cta.href} size="sm" className={styles.desktopCta}>
              {cta.label}
            </Button>
          )}
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuBar} data-open={open} />
            <span className={styles.menuBar} data-open={open} />
            <span className={styles.menuBar} data-open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}
