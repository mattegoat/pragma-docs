import React, { lazy, Suspense, useState, useEffect } from "react";
import styles from "./styles.module.css";
import SearchBar from "@theme/SearchBar";
import DocsBig from "@site/static/img/docs.svg";
import DocsSmall from "@site/static/img/docsSmall.svg";

const LazyDescription = lazy(() =>
  Promise.resolve({
    default: ({ description }) => (
      <div className={styles.description}>{description}</div>
    ),
  })
);

const BasicHero = ({ title, greenTitle, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          {isClient ? (
            <Suspense
              fallback={<div className={styles.description}>Loading...</div>}
            >
              <LazyDescription description={description} />
            </Suspense>
          ) : (
            <div className={styles.description}>{description}</div>
          )}
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
