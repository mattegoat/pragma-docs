import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import { ArrowRightIcon } from "@heroicons/react/outline";
import PopupComponent from "./common/Popup";

interface InputProps {
  placeholderText: string;
  footer: boolean;
  className?: string;
}

const InputComponent: React.FC<InputProps> = ({
  placeholderText,
  footer,
  className,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailPattern.test(email);
    setIsValidEmail(isValid);
    if (isValid) {
      setIsSubmitted(true); // Set to true if email is valid
    }
  };

  const handleButtonClick = () => {
    if (!isCheckboxChecked) {
      alert("Please tick the box");
      return;
    }
    validateEmail();
  };

  return (
    <div
      className={footer ? "" : styles.notFooterInput}
      style={
        footer
          ? { display: "flex", flexDirection: "column", gap: "5px" }
          : {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <input
          type="text"
          value={email}
          onChange={handleInputChange}
          placeholder={placeholderText}
          className={classNames(className, styles.input)}
        />
        <button
          style={footer ? { display: "unset" } : { display: "none" }}
          className={styles.emailButton}
          onClick={handleButtonClick}
        >
          <ArrowRightIcon
            style={{
              width: "12px",
              cursor: "pointer",
              transform: "translateY(1px)",
            }}
          />
        </button>
      </div>
      {!isValidEmail && <p style={{ color: "red" }}>Invalid email format</p>}

      {isSubmitted && (
        <PopupComponent
          title="Email submitted successfully"
          text="You will now start recieving emails from Pragma."
        />
      )}
      <label
        className={styles.checkbox}
        style={{ display: "flex", gap: "12px", paddingTop: "12px" }}
      >
        <input
          type="checkbox"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
        />
        <span className={styles.checkmark}></span>
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            color: "#B5F0E5",
            opacity: "0.5",
          }}
        >
          I agree with the privacy policy.
        </div>
      </label>
      <button
        className={styles.buttonsolid}
        style={footer ? { display: "none" } : { display: "unset" }}
        onClick={handleButtonClick}
      >
        Subscribe now
      </button>
    </div>
  );
};

export default InputComponent;
