import styles from "./Stepper.module.css";

export default function Stepper({ steps = [], currentStep = 0 }) {
  return (
    <ol className={styles.stepper} aria-label="Booking progress">
      {steps.map((step, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "active" : "upcoming";
        return (
          <li key={step} className={styles.step} data-state={state}>
            <span className={styles.marker} aria-hidden="true">
              {state === "done" ? "✓" : i + 1}
            </span>
            <span className={styles.label}>{step}</span>
            {i !== steps.length - 1 && <span className={styles.connector} data-state={state} />}
          </li>
        );
      })}
    </ol>
  );
}
