import { Call, Mail } from "assets/svg";
import { Navigation } from "components";
import Card from "components/card";
import React, { FC, ReactChild } from "react";
import styles from "./auth.module.scss";

type Props = {
  children: ReactChild | ReactChild[];
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <Card className={styles.card}>{children}</Card>
      </div>
    </div>
  );
};

export default AuthLayout;
