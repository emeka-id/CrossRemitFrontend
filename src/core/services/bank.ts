import { AxiosResponse } from 'axios';
import { IBankDetails, IBankResolve } from 'types/bank';
import { IResponse } from 'types/response';
import { IBank } from 'types/user';
import Axios from './axios';

export const BankListApiService = async () => {
  const res: AxiosResponse<IResponse<IBankDetails[]>> = await Axios.get(
    '/bank/list'
  );
  return res.data;
};

export const VerifyAccountNameApiService = async (inputs: IBank) => {
  const { accountNumber, sortCode } = inputs;
  const res: AxiosResponse<IResponse<IBankResolve>> = await Axios.get(
    `/bank/resolve/${accountNumber}/${sortCode}`
  );
  console.log(inputs);
  return res.data;
};
