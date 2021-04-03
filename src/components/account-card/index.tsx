import React, { FC, ReactChild } from "react";
import styles from "./account-card.module.scss";

//TODO: use the right datatype for svg
type Props = {
  icon?: any;
  amount: String;
  children: ReactChild | ReactChild[];
  title?: String;
};

const AccountCard: FC<Props> = ({ icon: Icon, amount, children, title }) => {
  return (
    <div>
      <div className="mb-10">{title}</div>
      <div className={styles.card}>
        <header>
          <Icon />
          <div>
            <h2 className="font-weight-normal mt-10">&#x20A6; {amount}</h2>
          </div>
        </header>
        <footer>{children}</footer>
      </div>
    </div>
  );
};

export default AccountCard;
