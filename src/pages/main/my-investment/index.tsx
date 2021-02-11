import { Investment } from 'assets/svg';
import { Button, Card, InvestmentCard } from 'components';
import React from 'react';

const MyInvestment = () => {
  return (
    <>
      My Investments
      <Card>
        <>
          <div className="mb-20">All Investments</div>
          {[1, 2, 3].map((element, index) => (
            <InvestmentCard
              key={index}
              icon={Investment}
              name="Starter"
              duration="5 months"
            />
          ))}
          <Button>Invest Another</Button>
        </>
      </Card>
    </>
  );
};

export default MyInvestment;
