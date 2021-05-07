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
      <h2 className="mt-5 mb-25 font-weight-bold">Settings</h2>
      <Card className="mt-15">
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
