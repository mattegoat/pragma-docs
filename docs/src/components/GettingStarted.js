import React from "react";
import styles from "./styles.module.css";

const productList = [
  {
    title: "Price Feeds",
    description:
      "Provable data for DeFi. The highest quality data for your dapp.",
    button: "integrate now",
    link: "/v1/Resources/data-feeds/consuming-data",
  },
  {
    title: "Computational feeds",
    description:
      "Provable feeds built with our price feeds. Volatility, Yield curve and more.",
    button: "integrate now",
    link: "/v1/Resources/computational-feeds/what-are-computational-feeds",
  },
  {
    title: "PragmAPI",
    description: "The highest quality data for the lowest latency.",
    button: "integrate now",
    link: "/api/overview",
  },
  {
    title: "VRF",
    description: "Verifiable, tamper-proof randomness available onchain.",
    button: "integrate now",
    link: "/v1/Resources/randomness/randomness",
  },
  {
    title: "Optimistic Oracle",
    description:
      "A secure dispute arbitration system bringing any data on-chain for DeFi, prediction markets, and more.",
    button: "integrate now",
    link: "/v1/Resources/optimistic-oracle/overview",
  },
  {
    title: "Merkle Feeds",
    description:
      "Feeds for options, enabling verified off-chain data retrieval and on-chain validation with our Rust SDK.",
    button: "integrate now",
    link: "/v1/Resources/merkle-feeds/what-are-merkle-feeds",
  },
];

export default function GettingStarted() {
  return (
    <div className={styles.startWrapper}>
      {productList.map((product, index) => (
        <div key={index} className={styles.productBox}>
          <h4>{product.title}</h4>
          <div className={styles.descriptionStart}>{product.description}</div>
          <a className={styles.buttons} href={product.link}>
            Integrate Now
          </a>
        </div>
      ))}
    </div>
  );
}
