import { Button } from 'components';
import React from 'react';
import styles from './password.module.scss';

const Password = () => {
  return (
    <div className={styles.password}>
      <div>
        <div className="form-group">
          <label htmlFor="change_password">Change Password</label>
          <input
            type="password"
            name="old_password"
            placeholder="Old Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
          />
        </div>
        <Button className="mt-40">Save</Button>
      </div>
    </div>
  );
};

export default Password;
