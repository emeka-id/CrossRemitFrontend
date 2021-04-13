import { Button } from 'components';
import AuthContext from 'context/auth';
import { LoginApiService, SetNewPasswordApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAuth, ILogin, INewPassword } from 'types/user';
import { IResponse } from 'types/response';
import styles from './set-new-password.module.scss';
import { Loading } from 'assets/svg';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import UserContext from 'context/user';
import toast from 'react-hot-toast';
import { YellowLineIcon } from 'assets/svg';
import { ForgotPasswordContext } from 'context/forgot-password';

const ChangePassword = () => {
  let [confirmPwd, setConfirmPwd] = useState('');
  const { emailAddress } = useContext(ForgotPasswordContext);
  let history = useHistory();

  const { mutate, isLoading } = useMutation(SetNewPasswordApiService, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      toast.success(`${data?.message}`);
      history.push(Page.login);
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () => {
    if (inputs.password !== confirmPwd) {
      toast.error('Password does not match');
      return;
    }
    mutate({ ...inputs, ...{ email: emailAddress } });
  };

  const initState = { email: '', otp: 0, password: '' };
  const { inputs, handleChange, handleSubmit } = useForm<INewPassword>(
    initState,
    submit
  );

  return (
    <div>
      <div className="text-center">
        <h2 className="mb-5">Change Password</h2>

        <YellowLineIcon />
      </div>
      <form className="mt-40" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="otp"
            type="text"
            maxLength={6}
            required
            placeholder="OTP"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="password"
            type="password"
            required
            placeholder="New Password"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="confirm-new-passwrd"
            id="confirm-pwd"
            type="password"
            required
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>

        <div className={styles.action}>
          <Button
            type="submit"
            disabled={(!inputs.password && !confirmPwd) || isLoading}
          >
            {isLoading ? <Loading /> : 'Change Password'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
