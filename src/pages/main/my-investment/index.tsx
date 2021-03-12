import { Investment } from 'assets/svg';
import { Button, Card, InvestmentCard } from 'components';
import { GetMyInvestmentsApiService } from 'core/services/user';
import React from 'react';
import { useQuery } from 'react-query';
import { IMyInvestment, ITransactions } from 'types/user';
import { returnInvestmentData } from '../helper';

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
                  name={returnInvestmentData(Investments).name}
                  duration={`${
                    returnInvestmentData(Investments).duration
                  } months`}
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
        <Button>Invest Another</Button>
      </Card>
    </>
  );
};

export default MyInvestment;
