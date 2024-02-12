import React from "react";
import styles from "./styles.module.css";
import VectorHelp from "@site/static/img/vectorHelp.svg";

export default function Help() {
  return (
    <div className={styles.helpWrapper}>
      <h2
        style={{
          textAlign: "left !important",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        Need help?
      </h2>
      <div className={styles.boxWrap}>
        <VectorHelp className={styles.imgHelp} />
        <div className={styles.helpBox}>
          <h4>Schedule a call</h4>
          <div className={styles.descriptionStart}>
            Get in touch with the team for any purpose.
          </div>
          <a className={styles.buttons} href={"https://cal.com/0xmatteo/15min"}>
            Schedule now
          </a>
        </div>
        <div className={styles.helpBox}>
          <h4>Submit Feedback</h4>
          <div className={styles.descriptionStart}>
            Submit a feedback, ask any question.
          </div>
          <a
            className={styles.buttons}
            href={"https://kprem87muy4.typeform.com/to/ahJVbIeI"}
          >
            Submit now
          </a>
        </div>
      </div>
    </div>
  );
}
