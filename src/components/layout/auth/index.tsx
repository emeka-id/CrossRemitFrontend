import { Call, Mail } from 'assets/svg';
import { Navigation } from 'components';
import Card from 'components/card';
import React, { FC, ReactChild } from 'react';
import styles from './auth.module.scss';

type Props = {
  children: ReactChild | ReactChild[];
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.info}>
        <div className="container text-base-color pt-10 pb-10 flex justify-content-end">
          <Mail className="mr-5" /> support@mbatrades.com{' '}
          <div className="ml-15" style={{borderRight: '1px solid #838595', height: '20px'}}></div>
          <Call className="ml-15 mr-5" />
          +2347000002000
        </div>
      </div>
      <div className={styles.main}>
        <div className="container flex justify-content-center">
          <Card className={styles.card}>{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
