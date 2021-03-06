import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button } from 'components';
import AuthContext from 'context/auth';
import UserContext from 'context/user';
import { SignupApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { IResponse } from 'types/response';
import { IAuth, ISignup } from 'types/user';
import toast from 'react-hot-toast';
import styles from './setup.module.scss';

const Setup = () => {
  const [term, setTerm] = useState(false);

  const toggleSetTerm = () => {
    if (!term) {
      setTerm(true);
    } else {
      setTerm(false);
    }
  };
  const { signUpState, updateCurrentUser } = useContext(UserContext);
  const { setAuthAndCache } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!signUpState.email) history.push(Page.signup);
  }, []);

  const { mutate, isLoading } = useMutation(SignupApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IAuth>>) => {
      const { success, data } = res.data;
      if (success) {
        updateCurrentUser(data?.user);
        setAuthAndCache(`${data?.type} ${data?.token}`);
        history.push(Page.dashboard);
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response.message);
    },
  });

  const submit = () => mutate(inputs);
  const { inputs, handleChange, handleSubmit } = useForm<ISignup>(
    signUpState,
    submit
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
              <input
                type="checkbox"
                id="terms"
                required
                className="mr-5"
                onChange={toggleSetTerm}
              />{' '}
              <small>I agree to Rabbi terms &amp; privacy policy</small>
            </label>
          </div>
          <div className=" text-right">
            <Button
              className="mt-40"
              disabled={isLoading || !term ? true : false}
            >
              {isLoading ? <Loading /> : 'Finish'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setup;
