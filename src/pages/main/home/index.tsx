import { Invest, Investment, Wallet } from 'assets/svg';
import { AccountCard, Button, Card, InvestmentCard, Modal } from 'components';
import { IModalRef } from 'components/modal';
import { GetMyActiveInvestmentsApiService } from 'core/services/user';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment } from 'types/user';
import styles from './home.module.scss';
import Withdrawal from './withdrawal';
import { returnInvestmentData } from '../helper';

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
                    name={returnInvestmentData(Investments).name}
                    duration={`${
                      returnInvestmentData(Investments).duration
                    } months`}
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
