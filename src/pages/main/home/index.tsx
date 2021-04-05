import { Invest, Investment, Wallet } from 'assets/svg';
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
      <h3 className="mt-5 mb-5 font-weight-normal">Dashboard</h3>
      <Card className="mt-15">
        <div className={styles.home}>
          <div className={styles.accounting}>
            <AccountCard
              icon={Wallet}
              amount={
                GetAccountBalance.isLoading
                  ? 'loading...'
                  : new Intl.NumberFormat().format(
                      Number(GetAccountBalance.data?.data)
                    )
              }
              title="Available Balance"
            >
              <Link to="/app/deposit">
                <Button className="mb-10">Deposit</Button>
              </Link>

              <Button variant="outline" onClick={() => modal?.current?.open()}>
                Withdraw
              </Button>
            </AccountCard>
            <AccountCard
              icon={Invest}
              amount={
                GetInvestmentBalance.isLoading
                  ? 'loading...'
                  : new Intl.NumberFormat().format(
                      Number(GetInvestmentBalance.data?.data)
                    )
              }
              title="Total Money Invested"
            >
              <Link to="/app/invest">
                <Button className="mb-10">Invest More</Button>
              </Link>
            </AccountCard>
          </div>
          <div>
            <p className="mb-5">Active Investments</p>
          </div>
          {MyActiveInvestments.isLoading ? (
            <div>Loading active investments</div>
          ) : MyActiveInvestments.data?.response.length === 0 ? (
            <Card variant="outline">
              <div className="flex justify-content-center align-item-center">
                <div>
                  You have no investments yet,
                  <Link to="/app/invest">
                    {'  '}
                    <span className="text-primary-color">invest now</span>
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <div className="mt-20">
              {MyActiveInvestments.data?.response.map(
                (Investments: IMyInvestment, index: number) => (
                  <InvestmentCard
                    key={index}
                    icon={Investment}
                    name={returnInvestmentData(Investments).name}
                    duration={`${returnInvestmentData(Investments).duration}`}
                    timeLeft={`${returnInvestmentData(Investments).timeLeft}`}
                    amount={`${Investments.amount}`}
                    interest={returnInvestmentData(Investments).interest}
                    interestPaid={
                      returnInvestmentData(Investments).interestPaid
                    }
                    progress={returnInvestmentData(Investments).progress}
                  />
                )
              )}
            </div>
          )}
        </div>
      </Card>
      <Modal ref={modal}>
        <Withdrawal modal={modal} />
      </Modal>
    </>
  );
};

export default Home;
