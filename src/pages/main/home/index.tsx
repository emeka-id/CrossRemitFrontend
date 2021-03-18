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
import { IMyInvestment } from 'types/user';
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
      Dashboard
      <Card>
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
                <Button>Deposit</Button>
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
                <Button>Invest More</Button>
              </Link>
            </AccountCard>
          </div>
          <div>
            <p>Active Investments</p>
          </div>
          {MyActiveInvestments.isLoading ? (
            <div>Loading active investments</div>
          ) : MyActiveInvestments.data?.response.length === 0 ? (
            <div>No active investments yet</div>
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
        <Withdrawal />
      </Modal>
    </>
  );
};

export default Home;
