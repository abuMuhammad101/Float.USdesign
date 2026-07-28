import styles from "./PriceBreakdown.module.css";

export default function PriceBreakdown({ rows = [], total, note, rangeNote }) {
  return (
    <div className={styles.wrap}>
      <ul className={styles.rows}>
        {rows.map((row) => (
          <li key={row.label} className={styles.row}>
            <span className={styles.rowLabel}>{row.label}</span>
            <span className={styles.rowValue}>{row.value}</span>
          </li>
        ))}
      </ul>

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Estimated total</span>
        <span className={styles.totalValue}>{total}</span>
      </div>

      {rangeNote && <p className={styles.rangeNote}>{rangeNote}</p>}
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
