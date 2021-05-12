import {
  Chart,
  Investment,
  Loading,
  WalletBalance,
  WalletMoneyInvested,
} from 'assets/svg';
import { Button, Card, InvestmentCard, TextLoader } from 'components';
import {
  GetMyAccountBalanceApiService,
  GetMyActiveInvestmentsApiService,
} from 'core/services/user';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment } from 'types/user';
import styles from './home.module.scss';
import { returnInvestmentData } from '../helper';
import { Link } from 'react-router-dom';
import UserContext from 'context/user';
import {
  GetDashboardApiService,
  NextROIApiService,
} from 'core/services/user-investment';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { bank, idCard } = currentUser;

  const MyActiveInvestments = useQuery(
    'getMyActiveInvestments',
    GetMyActiveInvestmentsApiService
  );
  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
  );

  const GetDashboard = useQuery('getDashboard', GetDashboardApiService);
  const GetNextROI = useQuery('getNextROI', NextROIApiService);

  console.log(GetDashboard.data?.data);

  return (
    <>
      <div className={styles.lock}>
        <div>
          <div className="flex justify-content-between">
            <h2 className="mt-5 mb-5 font-weight-bold">Dashboard</h2>
            <Link to="/app/invest">
              <Button>Invest</Button>
            </Link>
          </div>

          <div className={styles.amounts}>
            <Card>
              <small>Total Investment</small>
              <h3>
                ₦{' '}
                {GetDashboard.isSuccess ? (
                  new Intl.NumberFormat().format(
                    Number(GetDashboard.data.data.totalInvestmentAmount)
                  )
                ) : (
                  <TextLoader />
                )}
              </h3>
            </Card>
            <Card>
              <small>Total Returns</small>
              <h3>
                ₦{' '}
                {GetDashboard.isSuccess ? (
                  new Intl.NumberFormat().format(
                    Number(GetDashboard.data.data.totalReturnAmount)
                  )
                ) : (
                  <TextLoader />
                )}
              </h3>
            </Card>
            <Card>
              <small>Active Investment</small>
              <h3>
                ₦{' '}
                {GetDashboard.isSuccess ? (
                  new Intl.NumberFormat().format(
                    Number(GetDashboard.data.data.activeInvestmentAmount)
                  )
                ) : (
                  <TextLoader />
                )}
              </h3>
            </Card>
            <Card>
              <small>Expected Returns</small>
              <h3>
                ₦ <TextLoader />
              </h3>
            </Card>
          </div>

          {/* Investment Information Section */}
          <div className={styles.investment}>
            <Card className={styles.chart}>
              <div>
                <h3>Returns</h3>
                <div className="flex justify-content-center align-item-center">
                  <div className="pt-20 pb-20">
                    <Loading className="dark-loader" />
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div>
                <div className="flex justify-content-between">
                  <h3>Active Investments</h3>
                  <Link to="/app/invest"><span className="text-dark">See More</span></Link>
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
                  ₦{' '}
                  {GetAccountBalance.isSuccess ? (
                    new Intl.NumberFormat().format(
                      Number(GetAccountBalance.data?.data)
                    )
                  ) : (
                    <TextLoader />
                  )}
                </h1>
              </div>
              <div className="mt-40">
                <Link to="/app/deposit">
                  <Button className="mr-10">Deposit</Button>
                </Link>
                <Link to="/app/withdraw">
                  <Button variant="outline">Withdraw</Button>
                </Link>
              </div>
            </Card>
            <Card>
              <WalletMoneyInvested />
              <div className="mt-20">
                <div>Total Money Invested</div>
                <h1>
                  ₦{' '}
                  {GetDashboard.isSuccess ? (
                    new Intl.NumberFormat().format(
                      Number(GetDashboard.data.data.totalInvestmentAmount)
                    )
                  ) : (
                    <TextLoader />
                  )}
                </h1>
              </div>
              <div className="mt-40">
                <Link to="/app/invest">
                  <Button>Invest</Button>
                </Link>
              </div>
            </Card>
            <Card className="primary-color">
              <div>
                <div className={styles.heading}>Next Payment Dates</div>
                <hr />
                {GetNextROI.isLoading ? (
                  <div className="flex justify-content-center align-item-center">
                    <div className="pt-50 pb-20">
                      <Loading className="dark-loader" />
                    </div>
                  </div>
                ) : (
                  GetNextROI.data?.response.length === 0 && (
                    <div className="flex justify-content-center align-item-center">
                      <div className="pt-50 pb-50">
                        You have no investments yet,
                        <Link to="/app/invest">
                          <span className="text-base-color"> invest now</span>
                        </Link>
                      </div>
                    </div>
                  )
                )}
                {GetNextROI.isSuccess &&
                  GetNextROI.data?.response.map(
                    (item: IMyInvestment, index: Number) => (
                      <div className={styles.payDayGrid}>
                        <div>{new Date(item.nextROI).toDateString()}</div>
                        <div>{`${
                          new Date(item.nextROI).toTimeString().split(' ')[0]
                        }  ${
                          new Date(item.nextROI).toTimeString().split(' ')[1]
                        }`}</div>
                      </div>
                    )
                  )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
