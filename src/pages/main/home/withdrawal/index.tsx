import { Loading } from 'assets/svg';
import { AxiosAdapter, AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import { IModalRef } from 'components/modal';
import UserContext from 'context/user';
import {
  GetMyAccountBalanceApiService,
  WithdrawalApiSerive,
} from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { RefObject, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { IResponse } from 'types/response';
import { IWithdrawal } from 'types/user';
import styles from './withdrawal.module.scss';

const Withdrawal = ({ modal }: any) => {
  const { currentUser } = useContext(UserContext);
  const [withdrawMessage, setWithdrawMessage] = useState('');

  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
  );

  const Withdrawal = useMutation(WithdrawalApiSerive, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      GetAccountBalance.refetch();
      modal.current.close();
      toast.success(`${data.message}`);
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
      <div className="mb-20 text-center">
        <b>Funds Withdrawal</b>
      </div>

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
            {withdrawMessage ? withdrawMessage : null}
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
