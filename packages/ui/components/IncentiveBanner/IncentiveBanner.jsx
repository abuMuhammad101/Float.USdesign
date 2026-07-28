"use client";

import { useEffect, useState } from "react";
import styles from "./IncentiveBanner.module.css";

const COUNT_UP_STEPS = 36;
const COUNT_UP_DURATION_MS = 1200;

/**
 * Gamified sweepstakes banner: "every $1 spent = 1 entry". `entries` and
 * `goal` are mock numbers for now (see README) — swap for a real ledger
 * total once the booking engines report back to a shared entries store.
 *
 * The count-up uses setInterval rather than requestAnimationFrame: rAF is
 * throttled or fully paused on backgrounded/hidden tabs in most browsers,
 * so a tab opened without focus would otherwise show "0" indefinitely.
 */
export default function IncentiveBanner({
  headline = "Every $1 spent across any Float service = 1 entry",
  subline = "to win an offshore fishing trip with us.",
  entries = 0,
  goal,
  drawingLabel,
  cta,
}) {
  const [displayEntries, setDisplayEntries] = useState(0);

  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      const progress = Math.min(1, step / COUNT_UP_STEPS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayEntries(Math.round(eased * entries));
      if (progress >= 1) clearInterval(id);
    }, COUNT_UP_DURATION_MS / COUNT_UP_STEPS);

    return () => clearInterval(id);
  }, [entries]);

  const percent = goal ? Math.min(100, Math.round((entries / goal) * 100)) : null;

  return (
    <div className={styles.banner}>
      <div className={styles.icon} aria-hidden="true">
        🎣
      </div>

      <div className={styles.copy}>
        <p className={styles.headline}>{headline}</p>
        <p className={styles.subline}>{subline}</p>
      </div>

      <div className={styles.stat}>
        <p className={styles.count}>{displayEntries.toLocaleString()}</p>
        <p className={styles.countLabel}>entries this month</p>
        {percent != null && (
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
          </div>
        )}
        {drawingLabel && <p className={styles.drawing}>{drawingLabel}</p>}
      </div>

      {cta}
    </div>
  );
}
