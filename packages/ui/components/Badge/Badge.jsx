import styles from "./Badge.module.css";

export default function Badge({ variant = "accent", className = "", children }) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
