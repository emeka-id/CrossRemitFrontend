import { IDeposit } from 'types/deposit';
import Axios from './axios';

export const ConfirmDepositApiService = (credentials: IDeposit) => {
  return Axios.post('/transaction/usdt', credentials);
};
