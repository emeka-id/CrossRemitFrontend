import { DepositSvg } from 'assets/svg';
import { Card } from 'components';
import React from 'react';
import styles from './transaction.module.scss';

const Transaction = () => {
  return (
    <>
      Transaction
      <Card>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className={[styles.txn, "flex justify-content-between pb-15 mb-15"].join(' ')}>
            <div className="flex">
              <DepositSvg />
              <div className="ml-10">
                <b>Deposit</b>
                <br />
                <small>October 17, 2020 1:21PM</small>
              </div>
            </div>
            <div className={styles.ref}>
              <b>₦1,000,000</b>
              <br />
              <small>REF: 76854948583</small>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

export default Transaction;
