import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import { InitializePaystackPayment } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { calculateCharges } from './helper';
import { IDeposit } from 'types/user';
import styles from './deposit.module.scss';

const Deposit = () => {
  const { currentUser } = useContext(UserContext);

  const initState: IDeposit = {
    amount: 0,
    email: currentUser.email,
  };

  const submit = () => {
    if (Number(inputs.amount < 1000)) {
      toast.error("You've to deposit a minimum of N 1,000");
    } else {
      usdt();
    }
  };

  const usdt = () => {
    const base = {
      user_fullname: `${currentUser.firstName} ${currentUser.lastName}`,
      user_phone_number: currentUser.phone || '0',
      user_email: currentUser.email,
      naira_amount: Number(inputs.amount),
    };
    let objJsonStr = JSON.stringify(base);
    let objJsonB64 = Buffer.from(objJsonStr).toString('base64');
    window.open(
      `${process.env.REACT_APP_PAYMENT_GATEWAY}/pay/${objJsonB64}?callback_url=${window.location.href}`,
      '_self'
    );
  };

  const { inputs, handleChange, handleSubmit } = useForm<IDeposit>(
    initState,
    submit
  );

  return (
    <>
      <h3 className="mt-5 mb-5 font-weight-normal">Deposit</h3>
      <Card className="mt-15">
        Deposit Amount
        <form onSubmit={handleSubmit} className="mt-20">
          <div className={styles.deposit}>
            <CustomInput
              onChange={handleChange}
              name="amount"
              label="Enter Amount to deposit"
              id="depositAmount"
            />
          </div>
          <Button onClick={() => submit}>Deposit</Button>
        </form>
      </Card>
    </>
  );
};

export default Deposit;
