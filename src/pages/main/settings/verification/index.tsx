import { Wallet } from 'assets/svg';
import { Button, Card } from 'components';
import React from 'react';
import styles from './verification.module.scss';

const Verification = () => {
  return (
    <div className={styles.verification}>
      <div>
        <Card variant="outline">
          <div className={[styles.v_details, 'flex'].join(' ')}>
            <div className={styles.icon}>
              <Wallet />
            </div>
            <div className={[styles.text, 'mt-10 mb-10'].join(' ')}>
              <div className={styles.title}>Personal Details</div>
              <div className={styles.subtitle}>Provide your BVN</div>
            </div>
            <div>
              <span className={styles.status_verified}>Verified</span>
            </div>
          </div>
        </Card>
        <Card variant="outline">
          <div className={styles.v_details}>
            <div className={styles.icon}>
              <Wallet />
            </div>
            <div className={[styles.text, 'mt-10 mb-10'].join(' ')}>
              <div className={styles.title}>Identity</div>
              <div className={styles.subtitle}>
                Upload your government issued ID card
                (International passport, driver's license)
              </div>
            </div>
            <div className={styles.status_not_verified}>
              <Button>Verify</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Verification;
