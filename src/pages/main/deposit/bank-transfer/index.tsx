import { Button, Card } from "components";
import React from "react";
import styles from "./bank-transfer.module.scss";

const BankTransfer = () => {
  return (
    <>
      <div className={styles.modal_header}>Bank Transfer</div>
      {/* Ref Code Section */}
      <div className={styles.ref_code_section}>
        <div className={styles.heading}>Reference Code</div>
        <Card variant="block" color="primary-color" className={styles.card}>
          <div className={styles.code}>TM56748393764</div>
          <div>Copy</div>
        </Card>
        <div className={styles.instruction}>
          Please quote this code in your transfer reference, to make sure we can
          find your payment
        </div>
      </div>

      {/* Account Details Section */}
      <div className={styles.account_details_section}>
        <div className={styles.heading}>Account Details</div>
        <Card variant="outline" className={styles.card}>
          <div>Rabbi Limited</div>
          <div>8088463738</div>
          <div>FirstBank of Nigeria</div>
        </Card>
        <Card variant="outline" className={styles.card}>
          <div>Rabbi Limited</div>
          <div>8088463738</div>
          <div>Guarantee Trust Bank</div>
        </Card>
      </div>

      {/* Confirmation Section */}
      <div className={styles.confirmation_section}>
        <div className={styles.heading}>
          Click on Confirm to once you have made the transfer
        </div>
        <div className={styles.button_box}>
          <Button variant="block">Confirm</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </>
  );
};

export default BankTransfer;
