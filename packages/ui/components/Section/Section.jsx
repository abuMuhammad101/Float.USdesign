import Container from "../Container/Container.jsx";
import styles from "./Section.module.css";

export default function Section({ className = "", containerClassName = "", children, ...props }) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(" ")} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
