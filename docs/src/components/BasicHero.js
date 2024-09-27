import React, { lazy, useEffect, useState, Suspense } from "react";
import styles from "./styles.module.css";

// Lazy load the components
const SearchBar = lazy(() => import("@theme-original/SearchBar"));
const DocsBig = lazy(() => import("@site/static/img/docs.svg"));
const DocsSmall = lazy(() => import("@site/static/img/docsSmall.svg"));

const BasicHero = ({ title, greenTitle, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={styles.wrapper}>
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <DocsBig className={styles.bigImage} loading="lazy" />
          <DocsSmall className={styles.smallImage} loading="lazy" />
        </Suspense>
      )}
      <div className={styles.flex}>
        <header className={styles.headerWrapper}>
          <h1>
            <span className={styles.heading}>{title}</span>
            <br />
            <span className={styles.verifiable}>{greenTitle}</span>
          </h1>
          <div className={styles.searchWrapper}>
            {isClient && (
              <Suspense fallback={<div>Loading...</div>}>
                <SearchBar />
              </Suspense>
            )}
          </div>
          <div className={styles.description}>{description}</div>
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
