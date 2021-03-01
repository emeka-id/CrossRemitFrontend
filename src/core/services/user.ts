import { IEmail, ILogin, ISignup} from 'types/user';
import Axios from './axios';

export const LoginApiService = (credentials: ILogin) => {
  return Axios.post('/auth/login', credentials);
};


export const CheckUserApiService = (credientials: IEmail) => {
  return Axios.post('/auth/check', credientials);
}

export const SignupApiService = (credientials: ISignup) => {
  return Axios.post('/auth', credientials);
}