import { Button, Card, CustomInput } from "components";
import React from "react";
import styles from "./withdrawal.module.scss";

const Withdrawal = () => {
  return (
    <>
      <div className={styles.modal_header}>Funds Withdrawal</div>

      <div className={styles.available_balance_section}>
        <Card variant="block" color="primary-color" className={styles.card}>
          <div className={styles.balance}>
            <div className={styles.heading}>Available Balance</div>
            <div className={styles.money}>₦200,000</div>
          </div>
          <Button variant="block">Withdraw All</Button>
        </Card>
      </div>

      <div className={styles.withdraw_section}>
        <div className={styles.heading}>Amount to withdraw</div>
        <CustomInput label="" />
      </div>

      <div className={styles.confirmation_section}>
        <div className={styles.button_box}>
          <Button variant="block">Confirm</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
