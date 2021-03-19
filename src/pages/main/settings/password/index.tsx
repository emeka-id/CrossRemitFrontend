import { Button } from 'components';
import React from 'react';
import styles from './password.module.scss';

import { useMutation } from 'react-query';
import useForm from '../../../../core/utils/use-form';
import { ChangePasswordApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import { useContext } from 'react';
import UserContext from 'context/user';
import { IUser } from 'types/user';
import { Loading } from 'assets/svg';
import toast from 'react-hot-toast';

const Password = () => {
  const { currentUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation(ChangePasswordApiService, {
    onSuccess: (res) => {
      const { data } = res.data;
      toast.success('Changed password successfully');
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response.message);
    },
  });

  const submit = () => mutate(inputs);

  const { inputs, handleSubmit, handleChange } = useForm<IUser>(
    currentUser,
    submit
  );

  return (
    <div className={styles.password}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="change_password">Change Password</label>
            <input
              type="password"
              name="password"
              placeholder="Old Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
            />
          </div>
          <Button className="mt-40">{isLoading ? <Loading /> : 'Save'}</Button>
        </form>
      </div>
    </div>
  );
};

export default Password;
