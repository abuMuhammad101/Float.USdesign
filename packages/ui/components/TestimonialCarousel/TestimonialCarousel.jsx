"use client";

import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating.jsx";
import styles from "./TestimonialCarousel.module.css";

export default function TestimonialCarousel({ testimonials = [], autoRotateMs = 6000 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoRotateMs || testimonials.length < 2) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, autoRotateMs);
    return () => clearInterval(id);
  }, [autoRotateMs, testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[active];

  return (
    <div className={styles.wrap}>
      <blockquote className={styles.card}>
        <StarRating rating={current.rating} size="md" />
        <p className={styles.quote}>&ldquo;{current.quote}&rdquo;</p>
        <footer className={styles.meta}>
          <span className={styles.avatar} aria-hidden="true">
            {current.name.charAt(0)}
          </span>
          <span>
            <span className={styles.name}>{current.name}</span>
            <span className={styles.location}>{current.location}</span>
          </span>
        </footer>
      </blockquote>

      {testimonials.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show testimonial from ${t.name}`}
              className={[styles.dot, i === active ? styles.dotActive : ""].join(" ")}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
