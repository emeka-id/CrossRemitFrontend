import { Button } from 'components';
import AuthContext from 'context/auth';
import { LoginApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IAuth, ILogin } from 'types/user';
import { IResponse } from 'types/response';
import styles from './login.module.scss';
import { Loading } from 'assets/svg';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import UserContext from 'context/user';
import toast from 'react-hot-toast';

const Login = () => {
  const { setAuthAndCache } = useContext(AuthContext);
  const { updateCurrentUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation(LoginApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IAuth>>) => {
      const { success, data } = res.data;
      if (success) {
        setAuthAndCache(`${data?.type} ${data?.token}`);
        updateCurrentUser(data?.user);
        history.push(Page.dashboard);
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });
  let history = useHistory();

  const submit = () => mutate(inputs);
  const initState = { email: '', password: '' };
  const { inputs, handleChange, handleSubmit } = useForm<ILogin>(
    initState,
    submit
  );

  return (
    <div>
      <div className="text-center">
        <h2>Login To Rabbi</h2>
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
        <div className="form-group">
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.action}>
          <div>
            <label className="flex">
              <input type="checkbox" className="mr-5" /> Remember me
            </label>
          </div>
          <Button type="submit">{isLoading ? <Loading /> : 'Login'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
