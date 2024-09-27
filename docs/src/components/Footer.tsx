import React from "react";
import InputComponent from "./EmailInput";
import classNames from "classnames";
import styles from "./styles.module.css";

interface FooterLink {
  title: string;
  href: string;
  external: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const content: FooterColumn[] = [
  {
    heading: "Developers",
    links: [
      {
        title: "Documentation",
        href: "https://docs.pragma.build/",
        external: true,
      },
      {
        title: "View on Block Explorer",
        href: `https://voyager.online/contract/0x02a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b`,
        external: true,
      },
    ],
  },
  {
    heading: "Product",
    links: [
      {
        title: "Home",
        href: "https://pragma.build",
        external: false,
      },
      {
        title: "Ecosystem",
        href: "https://pragma.build/ecosystem",
        external: false,
      },
      {
        title: "Resources",
        href: "https://pragma.build/resources",
        external: false,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        title: "Blog",
        href: "https://blog.pragma.build/",
        external: true,
      },
      {
        title: "Press Kit",
        href: "https://buildonpragma.notion.site/Pragma-brand-kit-7a0505dd53874274819309d9a1f6ed3c?pvs=4",
        external: true,
      },
      {
        title: "Contact Us",
        href: "mailto:support@pragma.build?body=Hi%Pragma-Team,",
        external: true,
      },
      {
        title: "Terms and Conditions",
        href: "https://pragma.build/terms",
        external: true,
      },
      {
        title: "Privacy Policy",
        href: "https://pragma.build/privacyPolicy",
        external: true,
      },
    ],
  },
];

export interface SocialMedia {
  name: string;
  src: string;
  href: string;
}

const Footer = () => (
  <div
    style={{
      marginTop: "70px",
      width: "full",
      overflow: "hidden",
      background: "#1B63521F",
    }}
  >
    <div className={styles.bigScreen}>
      <div
        style={{
          paddingBottom: "80px",
        }}
        className={styles.logoWrapFoot}
      >
        <a href="/">
          <div style={{ width: "fit-content" }}>
            <img
              className={styles.imgFooter}
              src="/img/pragma-og-img.png"
              alt="Pragma"
              width={"auto"}
              height={60}
            />
          </div>
        </a>
        <p className={styles.footerDescription}>
          Pragma is the leading oracle on Starknet, built to empower native
          protocols to realize their ambitious potential.
        </p>
      </div>
      <div className={styles.gridFooter}>
        {content.map((column) => (
          <nav key={column.heading} className={styles.navFooter}>
            <p
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color: "#B5F0E580",
              }}
            >
              {column.heading}
            </p>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {column.links.map(({ external, title, href }) => (
                <React.Fragment key={title}>
                  {external ? (
                    <a
                      style={{
                        fontSize: "16px",
                        lineHeight: "16px",
                        letterSpacing: "2%",
                        paddingBottom: "20px",
                      }}
                      className={styles.linkFooter}
                      href={href}
                    >
                      {title}
                    </a>
                  ) : (
                    <a
                      style={{
                        fontSize: "16px",
                        lineHeight: "16px",
                        letterSpacing: "2%",
                        paddingBottom: "20px",
                      }}
                      className={styles.linkFooter}
                      href={href}
                    >
                      {title}
                    </a>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        ))}
        {/* <div style={{ gridColumn: "span 4", maxWidth: "28rem" }}>
          <div
            className="pb-3 text-lg text-lightGreen"
            style={{
              paddingBottom: "12px",
              fontSize: "1rem",
              lineHeight: "1.75rem",
              color: "#B5F0E5",
            }}
          >
            Subscribe to our mailing list
          </div>
          <InputComponent placeholderText="Email address" footer={true} />
        </div> */}
      </div>
      <div className={styles.copyright}>
        © Pragma Labs - 2024. All rights reserved.
      </div>
    </div>
  </div>
);

export default Footer;
