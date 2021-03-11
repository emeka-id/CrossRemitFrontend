import { Investment } from 'assets/svg';
import { Button, Card, InvestmentCard } from 'components';
import { GetMyInvestmentsApiService } from 'core/services/user';
import React from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment } from 'types/user';
import { remainingMonths, reduceFunction } from '../helper';

const MyInvestment = () => {
  const MyInvestments = useQuery(
    'getMyInvestments',
    GetMyInvestmentsApiService
  );

  return (
    <>
      My Investments
      <Card>
        <>
          <div className="mb-20">All Investments</div>
          {MyInvestments.isLoading ? (
            <div>Loading investments...</div>
          ) : (
            MyInvestments.data?.response.map(
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
                  interestPaid={Investments.interest.reduce(reduceFunction, 0)}
                  progress={
                    (Investments.interest.reduce(reduceFunction, 0) * 100) /
                    Investments.amount
                  }
                />
              )
            )
          )}
        </>
        <Button>Invest Another</Button>
      </Card>
    </>
  );
};

export default MyInvestment;
