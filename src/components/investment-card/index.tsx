import ProgressBar from 'components/progress-bar';
import React, { FC } from 'react';
import styles from './investment-card.module.scss';

//TODO: use the right datatype for svg
type Props = {
  icon?: any;
  name: String;
  duration: string;
};

const InvestmentCard: FC<Props> = ({icon:Icon, name, duration}) => {
  return (
    <div className={styles.card}>
      <div className={[styles.investment, 'flex'].join(' ')}>
        <Icon/>
        <div className="ml-30">
            <div>{name}</div>
            <div>{duration}</div>
        </div>
      </div>
      <div className={styles.stats}>
        <div className="flex justify-content-between mb-15">
          <div>Invested: ₦1,000,000</div>
          <div>2 Months reaming</div>
        </div>
        <ProgressBar percentage={30} />
        <div className="flex justify-content-between mt-10">
          <div>Paid: ₦289,400.00</div>
          <div>Unpaid: ₦89,400.00</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
