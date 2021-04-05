import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button } from 'components';
import UserContext from 'context/user';
import { CheckUserApiService } from 'core/services/user';
import { Page } from 'core/utils/constants';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { IResponse } from 'types/response';
import { ISignup } from 'types/user';
import toast from 'react-hot-toast';
import { YellowLineIcon } from 'assets/svg';

const Signup = () => {
  const { signUpState, updateSignupState } = useContext(UserContext);
  let history = useHistory();
  const { mutate, isLoading } = useMutation(CheckUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<null>>) => {
      const { success } = res.data;
      if (success) {
        updateSignupState(inputs);
        history.push(Page.verify);
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
        <h2 className="mb-5">Join Rabbi</h2>
        <YellowLineIcon />
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
          <Button type="submit" disabled={isLoading ? true : false}>
            {isLoading ? <Loading /> : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
