import { Investment } from 'assets/svg';
import ProgressBar from 'components/progress-bar';
import React, { FC } from 'react';
import styles from './investment-card.module.scss';

//TODO: use the right datatype for svg
type Props = {
  icon?: any;
  name: String;
  duration: string;
  amount: string;
  interestPaid: number;
  interest: number;
  progress: number;
  timeLeft: string;
};

const InvestmentCard: FC<Props> = ({
  icon: Icon,
  name,
  duration,
  amount,
  interest,
  interestPaid,
  progress,
  timeLeft,
}) => {
  return (
    <div className={styles.card}>
      <div className={[styles.investment, 'flex'].join(' ')}>
        <Icon />
        <div className="ml-30">
          <div>{name}</div>
          <div className="grey-text small">Growing for {duration} months</div>
        </div>
      </div>
      <div className={styles.stats}>
        <div className="flex justify-content-between mb-15">
          <div className={styles.investment_sm_text}>
            Invested: ₦ {new Intl.NumberFormat().format(Number(amount))}
          </div>
          <div className={styles.investment_sm_text}>
            {timeLeft} months left
          </div>
        </div>
        <ProgressBar percentage={progress} />
        <div className="flex justify-content-between mt-10">
          <div className={styles.investment_sm_text}>
            Paid: ₦ {new Intl.NumberFormat().format(Number(interestPaid))}
          </div>
          <div className={styles.investment_sm_text}>
            Unpaid: ₦ {new Intl.NumberFormat().format(Number(interest))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
