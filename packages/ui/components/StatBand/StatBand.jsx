import styles from "./StatBand.module.css";

export default function StatBand({ stats = [], className = "" }) {
  return (
    <div className={[styles.band, className].filter(Boolean).join(" ")}>
      {stats.map((stat, i) => (
        <div key={stat.label} className={styles.stat}>
          <p className={styles.value}>{stat.value}</p>
          <p className={styles.label}>{stat.label}</p>
          {i !== stats.length - 1 && <span className={styles.divider} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
