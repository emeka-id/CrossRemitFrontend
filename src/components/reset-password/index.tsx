import { Button, Card } from 'components';
import AuthContext from 'context/auth';
import UserContext from 'context/user';
import React, { FC, useContext } from 'react';
import styles from './reset-password.module.scss';

const ResetPassword: FC = () => {
  const { currentUser } = useContext(UserContext);
  const { auth, setLogout } = useContext(AuthContext);

  const logout = () => {
    setLogout();
  };

  return (
    <>
      {auth && currentUser.reset_password ? (
        <div className={styles.frostedGlass}>
          <Card className={styles.container}>
            <div className="flex justify-content-between">
              <h3>Reset Password</h3>
              <small
                className="text-red"
                style={{ cursor: 'pointer' }}
                onClick={logout}
              >
                Logout
              </small>
            </div>

            <div>Reset password to continue using Rabbi</div>

            <div className="mt-30">
              <form>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Old Password"
                  />
                </div>
                <div className="form-group mt-20">
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                  />
                </div>
                <Button className="mt-40">Reset Password</Button>
              </form>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default ResetPassword;
