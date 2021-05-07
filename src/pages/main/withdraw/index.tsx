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
} from 'core/services/user';
import React from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment, ITransactions, IUserInvestment } from 'types/user';
import styles from './withdrawal.module.scss';
import { returnInvestmentData } from '../helper';
import { Link } from 'react-router-dom';

const Withdrawal = () => {
  const MyActiveInvestments = useQuery(
    'getMyActiveInvestments',
    GetMyActiveInvestmentsApiService
  );

  const GetInvestmentBalance = useQuery(
    'getInvestmentBalance',
    GetMyInvestmentTotalApiService
  );

  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
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
            <div className="mt-30">
              <CustomInput
                name_of_input="NGN"
                placeholder="0,000"
                className={styles.input}
              />
              <Button>Proceed</Button>
            </div>
          </Card>

          <Card className={styles.card}>
            <div style={{ fontWeight: 500 }}>Withdraw USDT</div>
            <div className="mt-30">
              <CustomInput
                name_of_input="USDT"
                placeholder="0,000"
                className={styles.input}
              />
              <Button>Proceed</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
