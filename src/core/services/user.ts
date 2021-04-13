import {
  IEmail,
  ILogin,
  ISignup,
  IUser,
  IBank,
  IInvest,
  IUserInvestment,
  IVerifyDeposit,
  IDeposit,
  IWithdrawal,
  IMyInvestment,
  INewPassword,
} from 'types/user';
import { IList, IPagination, IResponse } from 'types/response';
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
    '/investment'
  );
  return res.data;
};

export const StartNewInvestmentApiService = (credentials: IUserInvestment) => {
  return Axios.post('/user/investment', credentials);
};

export const GetTransactionsApiService = async (
  credentials: Partial<IPagination>
) => {
  return await Axios.get(
    `/transaction/me?currentPage=${credentials.currentPage}&size=${credentials.size}`
  );
};

//TODO Merge InvestmentApiServices
export const GetMyInvestmentsApiService = async () => {
  const res: AxiosResponse<IResponse<IList<IMyInvestment>>> = await Axios.get(
    '/user/investment/me'
  );
  return res.data.data;
};

export const GetMyActiveInvestmentsApiService = async () => {
  const res: AxiosResponse<IResponse<IList<IMyInvestment>>> = await Axios.get(
    '/user/investment/me?active=true'
  );
  return res.data.data;
};

export const VerifyDespositApiService = (credentials: IVerifyDeposit) => {
  return Axios.post('/transaction/paystack/verify', credentials);
};

export const InitializePaystackPayment = (credentials: IDeposit) => {
  return Axios.post('transaction/paystack/initialize', credentials);
};

export const GetMyInvestmentTotalApiService = async () => {
  const res: AxiosResponse<IResponse> = await Axios.get(
    '/user/investment/me/total'
  );
  return res.data;
};

export const GetMyAccountBalanceApiService = async () => {
  const res: AxiosResponse<IResponse> = await Axios.get(
    '/transaction/me/balance/total'
  );
  return res.data;
};

export const WithdrawalApiSerive = (credentials: IWithdrawal) => {
  return Axios.post('/transaction/me/withdrawal', credentials);
};

export const ForgotPasswordApiService = (credentials: IEmail) => {
  return Axios.post('/auth/password/forgot', credentials);
};

export const SetNewPasswordApiService = (credentials: INewPassword) => {
  return Axios.post('/auth/password/forgot/validate', credentials);
};
