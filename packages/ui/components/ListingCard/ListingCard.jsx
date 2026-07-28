import Badge from "../Badge/Badge.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import styles from "./ListingCard.module.css";

export default function ListingCard({
  as: Component = "a",
  href,
  image,
  icon,
  tag,
  title,
  subtitle,
  specs = [],
  price,
  priceUnit,
  rating,
  reviewCount,
  className = "",
  ...props
}) {
  return (
    <Component href={href} className={[styles.card, className].filter(Boolean).join(" ")} {...props}>
      <div className={styles.media}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- listing photos come from
          // a mock catalog today; swap for next/image once real assets are hosted.
          <img src={image} alt="" className={styles.image} />
        ) : (
          icon && (
            <div className={styles.iconPlaceholder}>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative service glyph */}
              <img src={icon} alt="" className={styles.iconPlaceholderImg} />
            </div>
          )
        )}
        {tag && (
          <span className={styles.tag}>
            <Badge variant="accent">{tag}</Badge>
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          {price != null && (
            <p className={styles.price}>
              ${price}
              {priceUnit && <span className={styles.priceUnit}>/{priceUnit}</span>}
            </p>
          )}
        </div>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {specs.length > 0 && (
          <ul className={styles.specs}>
            {specs.map((spec) => (
              <li key={spec} className={styles.spec}>
                {spec}
              </li>
            ))}
          </ul>
        )}

        {rating != null && (
          <div className={styles.ratingRow}>
            <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
          </div>
        )}
      </div>
    </Component>
  );
}
