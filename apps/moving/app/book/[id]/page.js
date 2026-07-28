"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, PriceBreakdown, Stepper } from "@float/ui";
import { estimateQuote, getDistanceOptions, getPackage } from "../../../lib/packages";
import styles from "./page.module.css";

const STEPS = ["Details", "Quote", "Confirm & Pay"];
const DISTANCE_OPTIONS = getDistanceOptions();

// No backend yet — see root README "What's stubbed". The confirmation
// number and "booking" are generated client-side only and vanish on reload.
function generateConfirmationNumber() {
  return `FLM-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function BookingPage({ params }) {
  const { id } = use(params);
  const pkg = getPackage(id);
  if (!pkg) notFound();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const [details, setDetails] = useState({
    slot: pkg.slots[0],
    hours: pkg.minHours,
    distanceValue: "local",
  });

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    accountType: "guest",
    password: "",
    paymentMethod: "card",
  });

  const quote = useMemo(
    () => estimateQuote(pkg, { hours: details.hours, distanceValue: details.distanceValue }),
    [pkg, details.hours, details.distanceValue]
  );

  const detailsValid = Boolean(details.slot);
  const contactValid =
    contact.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    contact.phone.trim().length >= 7 &&
    (contact.accountType === "guest" || contact.password.trim().length >= 6);

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleConfirm = () => {
    setConfirmationNumber(generateConfirmationNumber());
    setDone(true);
  };

  if (done) {
    return (
      <main className={styles.page}>
        <div className={styles.doneWrap}>
          <div className={styles.doneCard}>
            <div className={styles.doneCheck} aria-hidden="true">
              ✓
            </div>
            <h1 className={styles.doneTitle}>Booking confirmed</h1>
            <p className={styles.doneConfirmation}>
              Confirmation <strong>{confirmationNumber}</strong>
            </p>

            <div className={styles.doneSummary}>
              <div className={styles.doneRow}>
                <span>Package</span>
                <span>{pkg.name}</span>
              </div>
              <div className={styles.doneRow}>
                <span>Scheduled</span>
                <span>{details.slot}</span>
              </div>
              <div className={styles.doneRow}>
                <span>Estimated total</span>
                <span>
                  ${quote.totalLow}–${quote.totalHigh}
                </span>
              </div>
            </div>

            <p className={styles.doneNote}>
              A confirmation email would be sent to <strong>{contact.email}</strong>
              {" — email delivery isn’t wired up yet in this build, so nothing is actually sent (see project README)."}
            </p>

            <Button as={Link} href="/" size="lg">
              Back to Float Moving
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href={`/listings/${pkg.id}`} className={styles.backLink}>
          ← {pkg.name}
        </Link>

        <div className={styles.header}>
          <Image src="/images/logo.webp" alt="Float Moving" width={1298} height={477} className={styles.logo} />
          <Stepper steps={STEPS} currentStep={step} />
        </div>

        <div className={styles.layout}>
          <div className={styles.stepPanel}>
            {step === 0 && (
              <DetailsStep pkg={pkg} details={details} setDetails={setDetails} />
            )}
            {step === 1 && <QuoteStep pkg={pkg} details={details} quote={quote} />}
            {step === 2 && (
              <ConfirmStep contact={contact} setContact={setContact} />
            )}

            <div className={styles.navRow}>
              {step > 0 ? (
                <Button variant="ghost" onClick={goBack}>
                  ← Back
                </Button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <Button onClick={goNext} disabled={step === 0 && !detailsValid}>
                  Continue
                </Button>
              ) : (
                <Button onClick={handleConfirm} disabled={!contactValid}>
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>

          <aside className={styles.summaryPanel}>
            <p className={styles.summaryTitle}>{pkg.name}</p>
            {pkg.tag && <Badge variant="accent">{pkg.tag}</Badge>}
            <div className={styles.summaryDivider} />
            <PriceBreakdown
              rows={[
                { label: `Labor (${details.hours} hrs @ $${pkg.basePrice}/hr)`, value: `$${quote.laborLow}–$${quote.laborHigh}` },
                { label: "Travel fee", value: `$${quote.travelFee}` },
                { label: "Materials & supplies", value: `$${quote.materialsFee}` },
              ]}
              total={`$${quote.totalLow}–$${quote.totalHigh}`}
              rangeNote="Final price depends on actual hours worked and any add-ons requested on moving day."
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailsStep({ pkg, details, setDetails }) {
  return (
    <div className={styles.stepBody}>
      <h2 className={styles.stepTitle}>When and how big is the job?</h2>
      <p className={styles.stepSubtitle}>Pick an available time, then tell us roughly how long it&rsquo;ll take.</p>

      <div className={styles.field}>
        <p className={styles.fieldLabel}>Available times</p>
        <div className={styles.slotGrid}>
          {pkg.slots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={[styles.slotOption, details.slot === slot ? styles.slotOptionActive : ""].join(" ")}
              onClick={() => setDetails((d) => ({ ...d, slot }))}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="hours">
          Estimated hours ({details.hours})
        </label>
        <input
          id="hours"
          type="range"
          min={pkg.minHours}
          max={pkg.maxHours}
          value={details.hours}
          onChange={(e) => setDetails((d) => ({ ...d, hours: Number(e.target.value) }))}
          className={styles.rangeInput}
        />
        <div className={styles.rangeLabels}>
          <span>{pkg.minHours} hrs</span>
          <span>{pkg.maxHours} hrs</span>
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.fieldLabel}>Approximate distance</p>
        <div className={styles.pillGroup}>
          {DISTANCE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[styles.pillOption, details.distanceValue === option.value ? styles.pillOptionActive : ""].join(" ")}
              onClick={() => setDetails((d) => ({ ...d, distanceValue: option.value }))}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteStep({ pkg, details, quote }) {
  return (
    <div className={styles.stepBody}>
      <h2 className={styles.stepTitle}>Your estimated price range</h2>
      <p className={styles.stepSubtitle}>
        No payment yet — this is a transparent estimate for {pkg.name.toLowerCase()} on {details.slot}.
      </p>

      <PriceBreakdown
        rows={[
          { label: `Labor (${details.hours} hrs @ $${pkg.basePrice}/hr)`, value: `$${quote.laborLow}–$${quote.laborHigh}` },
          { label: `Travel fee (${quote.distanceLabel})`, value: `$${quote.travelFee}` },
          { label: "Materials & supplies", value: `$${quote.materialsFee}` },
        ]}
        total={`$${quote.totalLow}–$${quote.totalHigh}`}
        rangeNote="The final invoice reflects actual hours worked, rounded to the nearest 15 minutes."
        note="You won't be charged until the job is complete."
      />
    </div>
  );
}

function ConfirmStep({ contact, setContact }) {
  return (
    <div className={styles.stepBody}>
      <h2 className={styles.stepTitle}>Confirm your details</h2>
      <p className={styles.stepSubtitle}>Book as a guest, or create an account to track this job and save details for next time.</p>

      <div className={styles.field}>
        <div className={styles.pillGroup}>
          <button
            type="button"
            className={[styles.pillOption, contact.accountType === "guest" ? styles.pillOptionActive : ""].join(" ")}
            onClick={() => setContact((c) => ({ ...c, accountType: "guest" }))}
          >
            Continue as guest
          </button>
          <button
            type="button"
            className={[styles.pillOption, contact.accountType === "account" ? styles.pillOptionActive : ""].join(" ")}
            onClick={() => setContact((c) => ({ ...c, accountType: "account" }))}
          >
            Create an account
          </button>
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="name">Full name</label>
          <input
            id="name"
            className={styles.textInput}
            value={contact.name}
            onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
            placeholder="Jane Doe"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="phone">Phone</label>
          <input
            id="phone"
            className={styles.textInput}
            value={contact.phone}
            onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
            placeholder="(904) 555-0134"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={styles.textInput}
          value={contact.email}
          onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
          placeholder="jane@example.com"
        />
      </div>

      {contact.accountType === "account" && (
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="password">Create a password</label>
          <input
            id="password"
            type="password"
            className={styles.textInput}
            value={contact.password}
            onChange={(e) => setContact((c) => ({ ...c, password: e.target.value }))}
            placeholder="At least 6 characters"
          />
        </div>
      )}

      <div className={styles.field}>
        <p className={styles.fieldLabel}>Payment method</p>
        <div className={styles.pillGroup}>
          <button
            type="button"
            className={[styles.pillOption, contact.paymentMethod === "card" ? styles.pillOptionActive : ""].join(" ")}
            onClick={() => setContact((c) => ({ ...c, paymentMethod: "card" }))}
          >
            Credit / debit card
          </button>
          <button
            type="button"
            className={[styles.pillOption, contact.paymentMethod === "later" ? styles.pillOptionActive : ""].join(" ")}
            onClick={() => setContact((c) => ({ ...c, paymentMethod: "later" }))}
          >
            Pay after service
          </button>
        </div>

        {contact.paymentMethod === "card" && (
          <div className={styles.cardFields}>
            <input className={styles.textInput} placeholder="Card number" disabled />
            <div className={styles.fieldRow}>
              <input className={styles.textInput} placeholder="MM / YY" disabled />
              <input className={styles.textInput} placeholder="CVC" disabled />
            </div>
            <p className={styles.stubNote}>
              Card entry is a visual stub — no payment processor is connected yet (see project README).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
