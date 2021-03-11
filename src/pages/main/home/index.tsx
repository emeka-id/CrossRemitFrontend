import { Invest, Investment, Wallet } from 'assets/svg';
import { AccountCard, Button, Card, InvestmentCard, Modal } from 'components';
import { IModalRef } from 'components/modal';
import { GetMyActiveInvestmentsApiService } from 'core/services/user';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment } from 'types/user';
import styles from './home.module.scss';
import Withdrawal from './withdrawal';
import { remainingMonths, reduceFunction } from '../helper';

const Home = () => {
  const modal = useRef<IModalRef>(null);

  const MyActiveInvestments = useQuery(
    'getMyActiveInvestments',
    GetMyActiveInvestmentsApiService
  );

  return (
    <>
      Dashboard
      <Card>
        <div className={styles.home}>
          <div className={styles.accounting}>
            <AccountCard
              icon={Wallet}
              amount="220,000.00"
              title="Available Balance"
            >
              <Button>Deposit</Button>
              <Button variant="outline" onClick={() => modal?.current?.open()}>
                Withdraw
              </Button>
            </AccountCard>
            <AccountCard
              icon={Invest}
              amount="220,000.00"
              title="Total Money Invested"
            >
              <Button>Invest More</Button>
            </AccountCard>
          </div>
          <div>
            <p>Active Investments</p>
          </div>
          {MyActiveInvestments.isLoading ? (
            <div>Loading active investments</div>
          ) : (
            <div>
              {MyActiveInvestments.data?.response.map(
                (Investments: IMyInvestment, index: number) => (
                  <InvestmentCard
                    key={index}
                    icon={Investment}
                    name={Investments.investment.name}
                    duration={`${Investments.investment.duration} months`}
                    timeLeft={`${Math.floor(
                      remainingMonths(
                        Investments.investment.createdAt,
                        Investments.investment.duration
                      )
                    )}`}
                    amount={`${Investments.amount}`}
                    interest={
                      Investments.amount *
                        (Investments.percent / 100) *
                        Investments.investment.duration -
                      Investments.interest.reduce(reduceFunction, 0)
                    }
                    interestPaid={Investments.interest.reduce(
                      reduceFunction,
                      0
                    )}
                    progress={
                      (Investments.interest.reduce(reduceFunction, 0) * 100) /
                      Investments.amount
                    }
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
