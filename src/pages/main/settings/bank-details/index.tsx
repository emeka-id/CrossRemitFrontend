import { Button } from 'components';
import React from 'react';
import styles from './bank-details.module.scss';

const BankDetails = () => {
  return (
    <div className={styles.bankDetails}>
      <div>
        <div className="form-group">
          <label>Account Number</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Beneficiary Bank</label>
          <select name="" id="">
            <option value="FirstBank">FirstBank</option>
          </select>
        </div>
        <div className="form-group">
          <label>Account name</label>
          <input type="text" />
        </div>
        <Button className="mt-20">Save</Button>
      </div>
    </div>
  )
}

export default BankDetails
