import { Loading } from 'assets/svg';
import { AxiosAdapter, AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import {
  GetMyAccountBalanceApiService,
  WithdrawalApiSerive,
} from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { IResponse } from 'types/response';
import { IWithdrawal } from 'types/user';
import styles from './withdrawal.module.scss';

const Withdrawal = () => {
  const [withdrawMessage, setWithdrawMessage] = useState('');
  const { currentUser } = useContext(UserContext);

  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
  );

  const Withdrawal = useMutation(WithdrawalApiSerive, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      GetAccountBalance.refetch();
      const input = document.getElementById(
        'withdrawAmount'
      ) as HTMLInputElement;
      input.value = '';
      setWithdrawMessage('');
      return;
    },
    onError: (error) => {
      const { message = null } = handleError(error);
    },
  });

  const initState = {
    amount: 0,
  };

  const submit = () => {
    if (Number(inputs.amount) > Number(GetAccountBalance.data?.data)) {
      setWithdrawMessage('You cannot withdraw more than your balance');
    }
    if (!currentUser.bank.accountNumber && !currentUser.bank.sortCode) {
      setWithdrawMessage(
        'You cannot withdraw without your bank details, provide them in Settings'
      );
    } else if (Number(inputs.amount) < Number(GetAccountBalance.data?.data)) {
      Withdrawal.mutate({ ...inputs, amount: Number(inputs.amount) });
    }
  };

  const { inputs, handleChange, handleSubmit } = useForm<IWithdrawal>(
    initState,
    submit
  );

  return (
    <>
      <div className={styles.modal_header}>Funds Withdrawal</div>

      <div className={styles.available_balance_section}>
        <Card variant="block" color="primary-color" className={styles.card}>
          <div className={styles.balance}>
            <div className={styles.heading}>Available Balance</div>
            <div className={styles.money}>
              ₦{' '}
              {new Intl.NumberFormat().format(
                Number(GetAccountBalance.data?.data)
              )}
            </div>
          </div>
          <Button variant="block">Withdraw All</Button>
        </Card>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.withdraw_section}>
          <div className={styles.heading}>Amount to withdraw</div>
          <CustomInput
            name="amount"
            onChange={handleChange}
            defaultValue=""
            id="withdrawAmount"
            label="Enter amount"
          />
          <small className="text-red">
            {withdrawMessage !== '' ? withdrawMessage : null}
          </small>
        </div>

        <div className={styles.confirmation_section}>
          <div className={styles.button_box}>
            <Button variant="block">
              {Withdrawal.isLoading ? <Loading /> : 'Confirm'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Withdrawal;
