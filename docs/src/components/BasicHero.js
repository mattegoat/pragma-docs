import React, { lazy, useEffect, useState } from "react";
import styles from "./styles.module.css";
import DocsBig from "@site/static/img/docs.svg";
import DocsSmall from "@site/static/img/docsSmall.svg";

// Lazy load the SearchBar component
const SearchBar = lazy(() => import("@theme-original/SearchBar"));

const BasicHero = ({ title, greenTitle, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={styles.wrapper}>
      {isClient && (
        <>
          <DocsBig className={styles.bigImage} loading="lazy" />
          <DocsSmall className={styles.smallImage} loading="lazy" />
        </>
      )}
      <div className={styles.flex}>
        <header className={styles.headerWrapper}>
          <h1>
            <span className={styles.heading}>{title}</span>
            <br />
            <span className={styles.verifiable}>{greenTitle}</span>
          </h1>
          <div className={styles.searchWrapper}>
            {isClient && <SearchBar />}
          </div>
          <div className={styles.description}>{description}</div>
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
