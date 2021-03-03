import { IEmail, ILogin, ISignup, IUser } from 'types/user';
import Axios from './axios';

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
