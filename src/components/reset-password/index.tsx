import { Button, Card } from 'components';
import AuthContext from 'context/auth';
import UserContext from 'context/user';
import { ChangePasswordApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { FC, useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { IUser } from 'types/user';
import styles from './reset-password.module.scss';

const ResetPassword: FC = () => {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const { auth, setLogout } = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    setLogout();
  };

  const { mutate, isLoading } = useMutation(ChangePasswordApiService, {
    onSuccess: (res) => {
      const { data } = res.data;
      updateCurrentUser({ ...currentUser, resetPassword: false });
      toast.success('Changed password successfully');
      history.push('/app/settings');
    },
    onError: (error) => {
      const { response } = handleError(error);
      toast.error(response.message);
    },
  });

  const submit = () => mutate(inputs);

  const { inputs, handleSubmit, handleChange } = useForm<IUser>(
    currentUser,
    submit
  );

  return (
    <>
      {auth && currentUser?.resetPassword && (
        <div className={styles.frostedGlass}>
          <Card className={styles.container}>
            <div>
              <h3>Reset Password</h3>
            </div>

            <div>Reset password to continue using Rabbi</div>

            <div className="mt-30">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Current Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-20">
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                  />
                </div>
                <Button className="mt-40">Reset Password</Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
