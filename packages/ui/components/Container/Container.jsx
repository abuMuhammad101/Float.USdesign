import styles from "./Container.module.css";

export default function Container({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component className={[styles.container, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Component>
  );
}
