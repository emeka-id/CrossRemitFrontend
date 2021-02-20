import { Button } from 'components';
import UserContext from 'context/user';
import { CheckUserApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IResponse } from 'types/response';
import { ISignup } from 'types/user';

const Signup = () => {
  const { signUpState, updateSignupState } = useContext(UserContext);
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const {email} = signUpState;
      const res = await CheckUserApiService({email});
      setLoading(false);
      const { success }: IResponse = res.data;
      if (success) {
        updateSignupState(inputs);
        history.push(Page.verify);
      }
    } catch (error) {
      setLoading(false);
      const { response, message = null } = handleError(error);
      console.log(handleError(error));
      console.log(response.message || message);
    }
  };

  const { inputs, handleChange, handleSubmit } = useForm<ISignup>(submit, signUpState);

  return (
    <div>
      <div className="text-center">
        <h2>Join Rabbi</h2>
      </div>
      <form className="mt-40" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            defaultValue={signUpState.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-content-end mt-40">
          <Button type="submit">{loading ? 'loading' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
