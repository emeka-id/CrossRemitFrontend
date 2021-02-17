import Verification from "pages/main/settings/verification";
import React, { FC, ReactChild } from "react";
import styles from "./verification-card.module.scss";

//TODO: use the right datatype for svg
type Props = {
  children: ReactChild;
};

const VerificationCard: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className={styles.card}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default VerificationCard;
