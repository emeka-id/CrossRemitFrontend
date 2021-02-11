import { Button } from 'components';
import React from 'react';
import styles from './setup.module.scss';

const Setup = () => {
  return (
    <div>
      <div className="text-center">
        <h2>Complete Registration</h2>
      </div>
      <form className="mt-40">
        <div className={styles.formGrid}>
          <div className="form-group">
            <input placeholder="First Name" />
          </div>
          <div className="form-group">
            <input placeholder="Last Name" />
          </div>
          <div className="form-group">
            <input placeholder="Password" />
          </div>
        </div>

        <div>
          <div>
            <label className="flex">
              <input type="checkbox" className="mr-5" /> <small>I agree to Rabbi terms & privacy policy</small>
            </label>
          </div>
          <div className=" text-right">
          <Button className="mt-40">Finish</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setup;
