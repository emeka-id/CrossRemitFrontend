import { Button } from 'components';
import AuthContext from 'context/auth';
import { LoginApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAuth } from 'types/user';
import { IResponse } from 'types/response';
import styles from './login.module.scss';

const Login = () => {
  const { setAuthAndCache } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  
  const submit = async () => {
    setLoading(true);
    try {
      const res = await LoginApiService(inputs);
      setLoading(false);
      const {success, data}:IResponse<IAuth> = res.data;
      if(success) {
        setAuthAndCache(`${data?.type} ${data?.token}`);
        history.push(Page.dashboard);
        return;
      }
    } catch (error) {
      setLoading(false);
      //TODO: Type response
      const { response, message = null } = handleError(error);
      console.log(handleError(error));
      console.log(response.message || message);
    } 
  };

  const { inputs, handleChange, handleSubmit } = useForm(submit);

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
          <Button type="submit">{loading ? 'loading': 'Login'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
