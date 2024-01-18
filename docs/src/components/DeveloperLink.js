import React from "react";
import styles from "./styles.module.css";
import GitHub from "@site/static/img/github.svg";
import Arrow from "@site/static/img/arrow_outward.svg";

export const github = [
  {
    title: "pragma-monorepo",
    href: "https://github.com/Astraly-Labs/Pragma",
  },
  {
    title: "pragma-contracts",
    href: "https://github.com/Astraly-Labs/pragma-oracle",
  },
  {
    title: "pragma-sdk",
    href: "https://github.com/Astraly-Labs/pragma-sdk",
  },
  {
    title: "pragma-hack",
    href: "https://github.com/Astraly-Labs/pragma-hack",
  },
  {
    title: "pragma-x",
    href: "https://github.com/Astraly-Labs/pragma-x",
  },
];

export default function DeveloperLink() {
  return (
    <div className={styles.devWrapper}>
      <h2>Developer Links</h2>
      <div className={styles.descriptionDev}>
        Find useful repositories, to integrate Pragma to your Dapp, or to start
        developing on Starknet.
      </div>
      <div className={styles.gridContainer}>
        {github.map((repo, index) => (
          <a style={{ cursor: "pointer" }} href={repo.href}>
            <div key={index} className={styles.devBox}>
              <GitHub
                style={{
                  width: "24px",
                  height: "24px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              />
              <h4
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                {repo.title}
              </h4>
              <Arrow
                style={{
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                  transform: "translateY(2px)",
                  width: "40px",
                }}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
