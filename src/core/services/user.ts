import { IEmail, ILogin, ISignup, IUser, IBank, IInvest } from 'types/user';
import { IResponse } from 'types/response';
import Axios from './axios';
import { AxiosResponse } from 'axios';

export const LoginApiService = (credentials: ILogin) => {
  return Axios.post('/auth/login', credentials);
};

export const CheckUserApiService = (credientials: IEmail) => {
  return Axios.post('/auth/check', credientials);
};

export const SignupApiService = (credientials: ISignup) => {
  return Axios.post('/auth', credientials);
};

export const UpdateUserApiService = (credentials: IUser) => {
  return Axios.patch('/user/me', credentials);
};

export const ChangePasswordApiService = (credentials: IUser) => {
  return Axios.post('/user/change-password', credentials);
};

export const UpdateBankDetailsApiService = (credentials: IBank) => {
  const { accountNumber, sortCode } = credentials;
  return Axios.get(`/bank/resolve/${accountNumber}/${sortCode}`);
};

export const GetListOfInvestApiService = async () => {
  const res: AxiosResponse<IResponse<IInvest[]>> = await Axios.get(
    `/investment`
  );
  return res.data;
};
