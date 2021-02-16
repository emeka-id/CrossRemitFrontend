import { Button, Card, CustomInput, Tabs } from 'components';
import React from 'react';
import styles from './settings.module.scss';
import Tab from '../../../components/tabs/tab'

const Settings = () => {
  return (
    <>
      Settings
      <Card>
        <Tabs>
          <Tab title="Bank Details">
            Account Number
            <input type="text" />
            Beneficiary Bank
            <select name="" id="">
              <option value="FirstBank">FirstBank</option>
            </select>
            Account name
            <input type="text" />
            <Button>Save</Button>
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
