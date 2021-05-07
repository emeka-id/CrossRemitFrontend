import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import { InitializePaystackPayment } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { calculateCharges } from './helper';
import { IDeposit } from 'types/user';
import styles from './deposit.module.scss';
import { useLocation } from 'react-router-dom';
import { IResponse } from 'types/response';
import Axios from 'core/services/axios';
import { ConfirmDepositApiService } from 'core/services/transaction';

const Deposit = () => {
  const { currentUser } = useContext(UserContext);
  const query = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState(false);

  const getTransaction = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_PAYMENT_GATEWAY
        }/api/v1/deposits/find?txid=${query.get('txid')}`,
        {
          method: 'post',
          headers: new Headers({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIxLTA0LTExVDE5OjU0OjU4LjE1MTkwMDI4MSswMTowMCIsInJvbGUiOiJ1c2VyIiwidXNlcmlkIjoiS0Fqc2pzaTIzMyJ9.jI_q8JECwydD-v47iSEY9l2wNPKbDTKvSaFg3g_agZM',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ txid: query.get('txid') }),
        }
      );
      if (res) {
        const data = await res.json();
        console.log(data);
        const verify = await ConfirmDepositApiService({
          ref: data.deposit.txId,
          amount: data.deposit.naira_amount,
          purpose: 'Deposit',
          type: 'Deposit',
          gateway: data.deposit.assets,
        });
        toast.success('Deposit Successful');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      const { response, message = null } = handleError(error);
      toast.error(
        response.message.includes('E11000')
          ? 'Duplicate transaction ID'
          : 'Cannot get transaction data'
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.get('txid')) {
      getTransaction();
    }
  }, []);

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
      <h2 className="mt-5 mb-25 font-weight-bold">Deposit</h2>
      <Card className="mt-15">
        Deposit Amount
        <form onSubmit={handleSubmit} className="mt-20">
          <div className={styles.deposit}>
            <CustomInput
              onChange={handleChange}
              name="amount"
              label="Enter Amount to deposit"
              name_of_input="NGN"
              id="depositAmount"
            />
          </div>
          <Button disabled={loading} onClick={() => submit}>
            {loading ? <Loading /> : 'Deposit'}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Deposit;
