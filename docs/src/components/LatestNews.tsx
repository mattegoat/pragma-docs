import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import InputComponent from "./EmailInput";
import Vector from "@site/static/img/vector1.svg";
import VectorSmall from "@site/static/img/vector1small.svg";

const LatestNews = () => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean-up function to remove event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const actualWindowWidth = windowWidth ?? 0;

  const ImageComponent = actualWindowWidth < 640 ? VectorSmall : Vector;

  return (
    <div className={styles.darkGreenBox}>
      <h3>
        Get the latest news from the <br />{" "}
        <span style={{ color: "#15FF81" }}>Pragma community</span>
      </h3>
      <InputComponent placeholderText="Email address" footer={false} />
      <ImageComponent className={styles.imageNews} />
    </div>
  );
};

export default LatestNews;
