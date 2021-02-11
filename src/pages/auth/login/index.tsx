import { Button } from 'components';
import React from 'react';
import styles from './login.module.scss';

const Login = () => {
  return (
    <div>
      <div className="text-center">
        <h2>Login To Rabbi</h2>
      </div>
      <form className="mt-40">
        <div className="form-group">
          <input placeholder="Email Address" />
        </div>
        <div className="form-group">
          <input placeholder="Password" />
        </div>

        <div className={styles.action}>
          <div>
            <label className="flex">
              <input type="checkbox" className="mr-5" /> Remember me
            </label>
          </div>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
