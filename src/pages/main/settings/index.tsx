import { Button, Card, CustomInput, Tabs } from 'components';
import React from 'react';
import styles from './settings.module.scss';
import Tab from '../../../components/tabs/tab'

const Settings = () => {
  return (
    <>
      Settings
      <Card>
        {/* Deposit Amount
          <div className={styles.deposit}>
          <CustomInput label="Enter Amount to invest" />
        </div>
        <Button>Deposit</Button> */}
        <Tabs>
          <Tab title="Bank Details">
            Hello, these are bank details
            {/* Contents of the tab */}
          </Tab>
          <Tab title="Verification">
            Hello, these are verification details
            {/* Contents of the tab */}
          </Tab>
          <Tab title='Profile'>
            Hello, these are profile details
            {/* Contents of the tab */}
          </Tab>
          <Tab title="Password">
            Hello, these are password details
            {/* Contents of the tab */}
          </Tab>
        </Tabs>

      </Card>
    </>
  );
};

export default Settings;
