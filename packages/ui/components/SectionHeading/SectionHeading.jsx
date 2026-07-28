import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  return (
    <div className={[styles.wrap, styles[align], className].filter(Boolean).join(" ")}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
