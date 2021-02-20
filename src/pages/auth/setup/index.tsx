import { Button } from 'components';
import AuthContext from 'context/auth';
import UserContext from 'context/user';
import { SignupApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IResponse } from 'types/response';
import { IAuth, ISignup } from 'types/user';
import styles from './setup.module.scss';

const Setup = () => {
  const { signUpState } = useContext(UserContext);
  const { setAuthAndCache } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!signUpState.email) history.push(Page.signup);
  }, []);

  const submit =  async() => {
    setLoading(true);
    try {
      const res = await SignupApiService(inputs);
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
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, []);

  const { inputs, handleChange, handleSubmit } = useForm<ISignup>(
    submit,
    signUpState
  );

  return (
    <div>
      <div className="text-center">
        <h2>Complete Registration</h2>
      </div>
      <form className="mt-40" onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className="form-group">
            <input
              placeholder="First Name"
              name="firstName"
              type="text"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Last Name"
              name="lastName"
              type="text"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>
            <label className="flex">
              <input type="checkbox" className="mr-5" />{' '}
              <small>I agree to Rabbi terms & privacy policy</small>
            </label>
          </div>
          <div className=" text-right">
            <Button className="mt-40">{loading ? 'loading': 'Finish'}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setup;
