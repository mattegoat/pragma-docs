import React from "react";
import styles from "./styles.module.css";
import SearchBar from "@theme/SearchBar";
import DocsBig from "@site/static/img/docs.svg";
import DocsSmall from "@site/static/img/docsSmall.svg";

const BasicHero = ({ title, greenTitle, description }) => {
  return (
    <div className={styles.wrapper}>
      <DocsBig className={styles.bigImage} />
      <DocsSmall className={styles.smallImage} />
      <div className={styles.flex}>
        <header className={styles.headerWrapper}>
          <h1>
            <span className={styles.heading}>{title}</span>
            <br />
            <span className={styles.verifiable}>{greenTitle}</span>
          </h1>
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>
          <div className={styles.description}>{description}</div>
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
