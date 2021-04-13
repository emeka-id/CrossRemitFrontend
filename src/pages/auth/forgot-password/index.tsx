import { Button } from 'components';
import AuthContext from 'context/auth';
import { ForgotPasswordApiService, LoginApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IAuth, IEmail, ILogin } from 'types/user';
import { IResponse } from 'types/response';
import styles from './forgot-password.module.scss';
import { Loading } from 'assets/svg';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import UserContext from 'context/user';
import toast from 'react-hot-toast';
import { YellowLineIcon } from 'assets/svg';
import { ForgotPasswordContext } from 'context/forgot-password';

const ForgotPassword = () => {
  const { storeEmail } = useContext(ForgotPasswordContext);
  let history = useHistory();

  const { mutate, isLoading } = useMutation(ForgotPasswordApiService, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      toast.success(`${data?.message}`);
      history.push(Page.set_new_password);
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () => {
    storeEmail(inputs.email);
    mutate(inputs);
  };

  const initState = { email: '' };
  const { inputs, handleChange, handleSubmit } = useForm<IEmail>(
    initState,
    submit
  );

  return (
    <div>
      <div className="text-center">
        <h2 className="mb-5">Forgot Password</h2>

        <YellowLineIcon />
      </div>
      <form className="mt-40" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>

        <div className={styles.action}>
          <Button type="submit" disabled={isLoading || !inputs.email}>
            {isLoading ? <Loading /> : 'Request OTP'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
