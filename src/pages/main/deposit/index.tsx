import { Button, Card, CustomInput } from 'components';
import React from 'react';
import styles from './deposit.module.scss';

const Deposit = () => {
  return (
    <>
      Deposit
      <Card>
          Deposit Amount
          <div className={styles.deposit}>
            <CustomInput label="Enter Amount to invest"/>
          </div>
          <Button>Deposit</Button>
      </Card>
    </>
  );
};

export default Deposit;
