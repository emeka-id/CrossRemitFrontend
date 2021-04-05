import { Investment } from 'assets/svg';
import { Button, Card, InvestmentCard } from 'components';
import { GetMyInvestmentsApiService } from 'core/services/user';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IMyInvestment, ITransactions } from 'types/user';
import { returnInvestmentData } from '../helper';

const MyInvestment = () => {
  const MyInvestments = useQuery(
    'getMyInvestments',
    GetMyInvestmentsApiService
  );

  return (
    <>
      <h3 className="mt-5 mb-5 font-weight-normal">My Investments</h3>
      <Card className="mt-15">
        <>
          <div className="mb-20">All Investments</div>
          {MyInvestments.isLoading ? (
            <div>Loading investments...</div>
          ) : MyInvestments.data?.response.length === 0 ? (
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
            MyInvestments.data?.response.map(
              (Investments: IMyInvestment, index: number) => (
                <InvestmentCard
                  key={index}
                  icon={Investment}
                  name={returnInvestmentData(Investments).name}
                  duration={`${returnInvestmentData(Investments).duration}`}
                  timeLeft={`${returnInvestmentData(Investments).timeLeft}`}
                  amount={`${Investments.amount}`}
                  interest={returnInvestmentData(Investments).interest}
                  interestPaid={returnInvestmentData(Investments).interestPaid}
                  progress={returnInvestmentData(Investments).progress}
                />
              )
            )
          )}
        </>
        <div className="mt-30">
          <Link to={'/app/invest'}>
            <Button>Invest</Button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default MyInvestment;
