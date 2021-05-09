import {
  Chart,
  Investment,
  Loading,
  WalletBalance,
  WalletMoneyInvested,
} from 'assets/svg';
import { Button, Card, InvestmentCard } from 'components';
import {
  GetMyAccountBalanceApiService,
  GetMyActiveInvestmentsApiService,
  GetMyInvestmentTotalApiService,
} from 'core/services/user';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment, ITransactions, IUserInvestment } from 'types/user';
import styles from './home.module.scss';
import { activeInvestmentTotal, returnInvestmentData } from '../helper';
import { Link } from 'react-router-dom';
import UserContext from 'context/user';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { bank, idCard } = currentUser;

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
      <div className={styles.lock}>
        <div>
          <div className="flex justify-content-between">
            <h2 className="mt-5 mb-5 font-weight-bold">Dashboard</h2>
            <Button>Invest</Button>
          </div>

          <div className="mt-30">
            {idCard.status === 'Not Verified' ? (
              <Card
                className={[
                  styles.verify,
                  'flex justify-content-between primary-color-light',
                ].join(' ')}
              >
                <div>
                  <h3>Verify Your Identity</h3>
                  <div style={{ width: '80%' }}>
                    Please provide your identity as this will enable us to
                    verify your identity and provide you quality service.
                  </div>
                </div>
                <Link to="/app/settings">
                  <Button>Verify Now</Button>
                </Link>
              </Card>
            ) : null}

            {!bank.accountNumber ? (
              <Card
                className={[
                  styles.verify,
                  'flex justify-content-between primary-color-light',
                ].join(' ')}
              >
                <div>
                  <h3>Add Bank Details</h3>
                  <div style={{ width: '80%' }}>
                    Please provide your bank details as this will enable us to
                    provide payout
                  </div>
                </div>
                <Link to="/app/settings">
                  <Button>Add Bank Account</Button>
                </Link>
              </Card>
            ) : null}
          </div>

          <div className={styles.amounts}>
            <Card>
              <small>Total Investment</small>
              <h3>
                N{' '}
                {GetInvestmentBalance.isSuccess
                  ? new Intl.NumberFormat().format(
                      Number(GetInvestmentBalance.data.data)
                    )
                  : 'loading'}
              </h3>
            </Card>
            <Card>
              <small>Total Returns</small>
              <h3>N {0}</h3>
            </Card>
            <Card>
              <small>Active Investment</small>
              <h3>
                N{' '}
                {MyActiveInvestments.isSuccess
                  ? new Intl.NumberFormat().format(
                      Number(activeInvestmentTotal(MyActiveInvestments.data))
                    )
                  : 'loading'}
              </h3>
            </Card>
            <Card>
              <small>Expected Returns</small>
              <h3>N {0}</h3>
            </Card>
          </div>

          {/* Investment Information Section */}
          <div className={styles.investment}>
            <Card className={styles.chart}>
              <h3>Returns</h3>
            </Card>
            <Card>
              <div>
                <div className="flex justify-content-between">
                  <h3>Active Investments</h3>
                  <div>See More</div>
                </div>

                {MyActiveInvestments.isLoading ? (
                  <Card variant="block">
                    <div className="flex justify-content-center align-item-center">
                      <div className="pt-20 pb-20">
                        <Loading className="dark-loader" />
                      </div>
                    </div>
                  </Card>
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
                  MyActiveInvestments.data?.response.map(
                    (Investments: IMyInvestment, index: number) => (
                      <InvestmentCard
                        key={index}
                        icon={Investment}
                        name={returnInvestmentData(Investments).name}
                        duration={`${
                          returnInvestmentData(Investments).duration
                        }`}
                        timeLeft={`${
                          returnInvestmentData(Investments).timeLeft
                        }`}
                        amount={`${Investments.amount}`}
                        interest={returnInvestmentData(Investments).interest}
                        interestPaid={
                          returnInvestmentData(Investments).interestPaid
                        }
                        progress={returnInvestmentData(Investments).progress}
                        hideIcon={true}
                      />
                    )
                  )
                )}
              </div>
            </Card>
          </div>

          {/* Balance Information Section */}
          <div className={styles.balances}>
            <Card>
              <WalletBalance />
              <div className="mt-20">
                <div>Available Balance</div>
                <h1>
                  N{' '}
                  {GetAccountBalance.isSuccess
                    ? new Intl.NumberFormat().format(
                        Number(GetAccountBalance.data?.data)
                      )
                    : 'loading'}
                </h1>
              </div>
              <div className="mt-40">
                <Button className="mr-10">Deposit</Button>
                <Button variant="outline">Withdraw</Button>
              </div>
            </Card>
            <Card>
              <WalletMoneyInvested />
              <div className="mt-20">
                <div>Total Money Invested</div>
                <h1>
                  N{' '}
                  {GetInvestmentBalance.isSuccess
                    ? new Intl.NumberFormat().format(
                        Number(GetInvestmentBalance.data.data)
                      )
                    : 'loading'}
                </h1>
              </div>
              <div className="mt-40">
                <Button>Invest</Button>
              </div>
            </Card>
            <Card className="primary-color">
              <div className={styles.heading}>Next Payment Dates</div>
              <hr />
              <div className={styles.payDayGrid}>
                <div>Saturday - 24th May 2021</div>
                <div>05 : 12 : 30 : 30</div>
              </div>
              <div className={styles.payDayGrid}>
                <div>Saturday - 24th May 2021</div>
                <div>05 : 12 : 30 : 30</div>
              </div>
              <div className={styles.payDayGrid}>
                <div>Saturday - 24th May 2021</div>
                <div>05 : 12 : 30 : 30</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
