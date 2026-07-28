"use client";

import { useState } from "react";
import Button from "../Button/Button.jsx";
import styles from "./SearchBar.module.css";

/**
 * Configurable search/filter bar (Airbnb-style inline field group + pill CTA).
 * `fields` is a list of { name, label, type: 'select'|'date'|'text', options?, placeholder? }.
 */
export default function SearchBar({ fields = [], initialValues = {}, onSearch, submitLabel = "Search" }) {
  const [values, setValues] = useState(() => {
    const base = {};
    fields.forEach((field) => {
      base[field.name] = initialValues[field.name] ?? "";
    });
    return base;
  });

  const update = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(values);
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <div
          key={field.name}
          className={[styles.field, i !== fields.length - 1 ? styles.withDivider : ""].join(" ")}
        >
          <label className={styles.label} htmlFor={`search-${field.name}`}>
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={`search-${field.name}`}
              className={styles.control}
              value={values[field.name]}
              onChange={(e) => update(field.name, e.target.value)}
            >
              <option value="">{field.placeholder ?? "Any"}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`search-${field.name}`}
              className={styles.control}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => update(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <Button type="submit" size="md" className={styles.submit}>
        {submitLabel}
      </Button>
    </form>
  );
}
