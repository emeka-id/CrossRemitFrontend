import { Button, Card, CustomInput, Modal } from "components";
import { IModalRef } from "components/modal";
import React, { useRef } from "react";
import BankTransfer from "./bank-transfer";
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
        <BankTransfer />
      </Modal>
    </>
  );
};

export default Deposit;
