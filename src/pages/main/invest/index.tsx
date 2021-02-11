import { Button, Card, CustomInput } from 'components';
import React from 'react';
import styles from './invest.module.scss';

const Invest = () => {
  return (
    <>
      Invest
      <div className="mb-20">
        <Card color="primary-color" className="flex justify-content-between">
          <div>
            <div>Available Balance</div>
            <div>&#x20A6; 250,000</div>
          </div>
          <Button className="dark text-light">
              Deposit
          </Button>
        </Card>
      </div>
      <Card>
          Investment Amount
          <div className={styles.invest}>
            <CustomInput label="Enter Amount to invest"/>
            <CustomInput label="Total Interest based on 20%" disable={true}/>
            <select>
                <option>test</option>
            </select>
          </div>
          <Button className="mt-40">Deposit</Button>
      </Card>
    </>
  );
};

export default Invest;
