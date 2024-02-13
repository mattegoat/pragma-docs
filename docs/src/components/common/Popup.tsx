import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface PopupProps {
  title: string;
  text: string;
}

const PopupComponent: React.FC<PopupProps> = ({ title, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.popup}>
          <span className={styles.close} onClick={handleClosePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          <h3
            style={{
              paddingBottom: "20px",
              fontSize: "1.125rem !important",
              color: "#B5F0E5",
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#B5F0E5", opacity: "0.50" }}>
            {text}
          </p>
        </div>
      )}
    </>
  );
};

export default PopupComponent;
