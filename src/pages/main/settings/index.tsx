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
            <div className={styles.profile}>
              <div>
                Name
                <div>
                  <input type="text" placeholder="First name" />
                  <input type="text" placeholder="Last name" />
                </div>
                Date of Birth
                <input type="date" name="date-of-birth" id="" />
                Gender
                <select name="select-gender" id="">
                  <option value="select-gender">Select your gender</option>
                  <option value="gender-male">Male</option>
                  <option value="gender-female">Female</option>
                </select>
                Country
                <select name="select-country" id="">
                  <option value="select-country">Select your country</option>
                </select>
                State
                <select name="select-state" id="">
                  <option value="select-state">Select your state</option>
                </select>
                Town
                <select name="select-town" id="">
                  <option value="select-town">Enter your town/city</option>
                </select>
              </div>
              <div>
                Profile Picture
                <input type="file" name="Add-New" id="" placeholder="Add New" />
              </div>
            </div>
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
