import {
  Chart,
  Investment,
  Loading,
  WalletBalance,
  WalletMoneyInvested,
} from 'assets/svg';
import { Button, Card, CustomInput, InvestmentCard } from 'components';
import {
  GetMyAccountBalanceApiService,
  GetMyActiveInvestmentsApiService,
  GetMyInvestmentTotalApiService,
  WithdrawalApiSerive,
} from 'core/services/user';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  IMyInvestment,
  ITransactions,
  IUserInvestment,
  IWithdrawal,
} from 'types/user';
import styles from './withdrawal.module.scss';
import { returnInvestmentData } from '../helper';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import modal from 'components/modal';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import toast from 'react-hot-toast';
import { IResponse } from 'types/response';
import UserContext from 'context/user';

const Withdrawal = () => {
  const { currentUser } = useContext(UserContext);

  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
  );

  const Withdrawal = useMutation(WithdrawalApiSerive, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      GetAccountBalance.refetch();
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
      toast.error('You cannot withdraw more than your balance');
    }
    if (!currentUser.bank.accountNumber && !currentUser.bank.sortCode) {
      toast.error(
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
      <div>
        <div className="flex justify-content-between">
          <h2 className="mt-5 mb-25 font-weight-bold">Withdraw</h2>
        </div>

        <div>
          <Card className={styles.withdrawHead}>
            <div className="flex justify-content-between align-content-center">
              <div className="flex pt-10">
                <WalletBalance />
                <div className="ml-50">
                  <div>Available Balance</div>
                  <h2>
                    N{' '}
                    {GetAccountBalance.isSuccess
                      ? new Intl.NumberFormat().format(
                          Number(GetAccountBalance.data.data)
                        )
                      : 'loading'}
                  </h2>
                </div>
              </div>
              <Button>Withdraw All</Button>
            </div>
          </Card>

          <Card className={styles.card}>
            <div style={{ fontWeight: 500 }}>Amount to Withdraw</div>
            <form onSubmit={handleSubmit}>
              <div className={[styles.inputContainer, 'mt-30'].join(' ')}>
                <CustomInput
                  name_of_input="NGN"
                  placeholder="0,000"
                  onChange={handleChange}
                />
                <Button disabled={Withdrawal.isLoading && true}>
                  {Withdrawal.isLoading ? <Loading /> : 'Proceed'}
                </Button>
              </div>
            </form>
          </Card>

          <Card className={styles.card}>
            <div style={{ fontWeight: 500 }}>Withdraw USDT</div>
            <form>
              <div className={[styles.inputContainer, 'mt-30'].join(' ')}>
                <CustomInput name_of_input="USDT" placeholder="0,000" />
                <Button>Proceed</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
