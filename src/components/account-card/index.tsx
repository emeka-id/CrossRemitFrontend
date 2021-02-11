import React,{ FC, ReactChild } from 'react';
import styles from './account-card.module.scss';

//TODO: use the right datatype for svg
type Props = {
  icon?: any;
  amount: String;
  children: ReactChild | ReactChild[];
  title?: String;
};

const AccountCard: FC<Props> = ({ icon: Icon, amount, children, title }) => {
  return (
    <div>
    {title}
    <div className={styles.card}>
      <header>
        <Icon />
        <div>
        &#x20A6; {amount}
        </div>
      </header>
      <footer>
        {children}
      </footer>
    </div>
    </div>
  );
};

export default AccountCard;
