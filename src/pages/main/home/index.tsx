import { Invest, Investment, Loading, Wallet } from 'assets/svg';
import { AccountCard, Button, Card, InvestmentCard, Modal } from 'components';
import { IModalRef } from 'components/modal';
import {
  GetMyAccountBalanceApiService,
  GetMyActiveInvestmentsApiService,
  GetMyInvestmentTotalApiService,
} from 'core/services/user';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment, ITransactions, IUserInvestment } from 'types/user';
import styles from './home.module.scss';
import Withdrawal from './withdrawal';
import { returnInvestmentData } from '../helper';
import { Link } from 'react-router-dom';

const Home = () => {
  const modal = useRef<IModalRef>(null);

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
          <h2 className="mt-5 mb-5 font-weight-bold">Dashboard</h2>
          <Button>Invest</Button>
        </div>

        <div className={styles.amounts}>
          <Card>
            <small>Total Investment</small>
            <h3>N 200,000</h3>
          </Card>
          <Card>
            <small>Total Returns</small>
            <h3>N 1,400,000</h3>
          </Card>
          <Card>
            <small>Active Investment</small>
            <h3>N 800,000</h3>
          </Card>
          <Card>
            <small>Expected Returns</small>
            <h3>N 940,000</h3>
          </Card>
        </div>

        <div className={styles.investment}>
          <Card>
            <h3>Returns</h3>
          </Card>
          <Card>
            <div>
              <h3>Active Investments</h3>

              <InvestmentCard
                key={0}
                icon={Investment}
                name={'Starter'}
                duration={`3`}
                timeLeft={`1`}
                amount={`300000`}
                interest={1000000}
                interestPaid={0}
                progress={85}
                hideIcon={true}
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
