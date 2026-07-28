import styles from "./TrustGrid.module.css";

export default function TrustGrid({ items = [], className = "" }) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div key={item.title} className={styles.item}>
          <div className={styles.iconWrap} aria-hidden="true">
            {item.icon}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
