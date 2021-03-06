import { Button, Card, CustomInput, Tabs } from 'components';
import React from 'react';
import styles from './settings.module.scss';
import Tab from '../../../components/tabs/tab';
import BankDetails from './bank-details';
import Verification from './verification';
import Profile from './profile';
import Password from './password';

const Settings = () => {
  return (
    <>
      Settings
      <Card>
        <Tabs>
          <Tab title="Bank Details">
            <BankDetails />
          </Tab>
          <Tab title="Verification">
            <Verification />
          </Tab>
          <Tab title="Profile">
            <Profile />
          </Tab>
          <Tab title="Password">
            <Password />
          </Tab>
        </Tabs>
      </Card>
    </>
  );
};

export default Settings;
