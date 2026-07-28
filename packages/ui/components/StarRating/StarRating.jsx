import styles from "./StarRating.module.css";

export default function StarRating({ rating = 5, reviewCount, size = "md" }) {
  const rounded = Math.round(rating * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rounded - i));
    return fill;
  });

  return (
    <span className={[styles.wrap, styles[size]].join(" ")} aria-label={`${rating} out of 5 stars`}>
      <span className={styles.stars} aria-hidden="true">
        {stars.map((fill, i) => (
          <span key={i} className={styles.starSlot}>
            <span className={styles.starBase}>★</span>
            <span className={styles.starFill} style={{ width: `${fill * 100}%` }}>
              ★
            </span>
          </span>
        ))}
      </span>
      {reviewCount != null && <span className={styles.count}>({reviewCount})</span>}
    </span>
  );
}
