import styles from "./SiteFooter.module.css";

export default function SiteFooter({
  as: LinkComponent = "a",
  logo,
  tagline,
  columns = [],
  socialLinks = [],
  copyrightName = "Float.us",
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {(logo || tagline || columns.length > 0) && (
          <div className={styles.top}>
            <div className={styles.brandCol}>
              {logo}
              {tagline && <p className={styles.tagline}>{tagline}</p>}
            </div>

            {columns.map((col) => (
              <div key={col.title} className={styles.col}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul className={styles.colList}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <LinkComponent href={link.href} className={styles.colLink}>
                        {link.label}
                      </LinkComponent>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className={styles.bottom}>
          {socialLinks.length > 0 && (
            <>
              <div className={styles.divider}>
                <span className={styles.line} />
                <p className={styles.stayConnected}>Stay Connected</p>
                <span className={styles.line} />
              </div>

              <div className={styles.socials}>
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} aria-label={social.name} className={styles.socialLink}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </>
          )}

          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} <span>{copyrightName}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
