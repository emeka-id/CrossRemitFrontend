import { IBank } from 'types/user';
import { IResponse } from 'types/response';
import Axios from './axios';

export const BankListApiService = async () => {
  const { data } = await Axios.get('/bank/list');
  return data;
};
