import { Wallet } from "assets/svg";
import { VerificationCard } from "components";
import React from "react";
import styles from "./verification.module.scss";

const Verification = () => {
  return (
    <div className={styles.verification}>
      <div>
        <VerificationCard>
          <div className={styles.v_details}>
            <div className={styles.icon}>
              <Wallet />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Personal Details</div>
              <div className={styles.subtitle}>Provide your BVN</div>
            </div>
            <div className={styles.status}>Verified</div>
          </div>
        </VerificationCard>
        <VerificationCard>
          <div className={styles.v_details}>
            <div className={styles.icon}>
              <Wallet />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Identity</div>
              <div className={styles.subtitle}>
                Upload your government issued ID card <br />
                (International passport, driver's license)
              </div>
            </div>
            <div className={styles.status}>Verify</div>
          </div>
        </VerificationCard>
      </div>
    </div>
  );
};

export default Verification;
