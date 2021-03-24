import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import {
  GetMyAccountBalanceApiService,
  InitializePaystackPayment,
  VerifyDespositApiService,
} from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { calculateCharges } from './helper';
import { IDeposit, IInitializeResponse } from 'types/user';
import styles from './deposit.module.scss';
import Payment from './payments';
import { usePaystackPayment } from 'react-paystack';

const Deposit = () => {
  const { currentUser } = useContext(UserContext);
  const [initialize, setInitialize] = useState(false);
  const [reference, setReference] = useState('');

  const childRef = useRef<any>();

  const initState: IDeposit = {
    amount: 0,
    email: currentUser.email,
  };

  const submit = () => {
    if (Number(inputs.amount < 1000)) {
      toast.error("You've to deposit a minimum of N 1,000");
    } else {
      initializePaystackPayment.mutate({
        amount: calculateCharges(inputs.amount).finalAmount,
        email: currentUser.email,
      });
    }
  };

  const { inputs, handleChange, handleSubmit } = useForm<IDeposit>(
    initState,
    submit
  );

  const initializePaystackPayment = useMutation(InitializePaystackPayment, {
    onSuccess: (res: AxiosResponse<IInitializeResponse>) => {
      const { data } = res;
      setInitialize(true);
      setReference(data.data.reference);
      const depositAmount = document.getElementById(
        'depositAmount'
      ) as HTMLInputElement;
      depositAmount.value = '';
      childRef?.current?.getAlert();
    },
    onError: (error) => {
      const { message = null } = handleError(error);
      toast.error(message);
    },
  });

  return (
    <>
      Deposit
      <Card>
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
          <Button>
            {initializePaystackPayment.isLoading ? <Loading /> : 'Deposit'}
          </Button>
        </form>
      </Card>
      {initialize && (
        <Payment
          ref={childRef}
          inputs={inputs}
          reference={reference}
          closeCB={setInitialize}
        />
      )}
    </>
  );
};

export default Deposit;
