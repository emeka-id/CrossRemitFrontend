import { Button, Card, CustomInput, Modal } from "components";
import { IModalRef } from "components/modal";
import React, { useRef } from "react";
import styles from "./deposit.module.scss";

const Deposit = () => {
  const modal = useRef<IModalRef>(null);
  return (
    <>
      Deposit
      <Card>
        Deposit Amount
        <div className={styles.deposit}>
          <CustomInput label="Enter Amount to invest" />
        </div>
        <Button onClick={() => modal?.current?.open()}>Deposit</Button>
      </Card>
      <Modal ref={modal}>
        <div className={styles.modal_header}>Bank Transfer</div>
        <div className={`ref-code-section`}>
          <div>Reference Code</div>
          <div className={styles.ref_code}>
            <div>TM56748393764</div>
            <div>Copy</div>
          </div>
          <div>
            Please quote this code in your transfer reference, to make sure we
            can find your payment
          </div>
        </div>
        <div>
          <div>Account Details</div>
        </div>
      </Modal>
    </>
  );
};

export default Deposit;
