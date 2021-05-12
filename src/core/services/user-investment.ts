import { AxiosResponse } from 'axios';
import { IList, IResponse } from 'types/response';
import { IDashboard, IMyInvestment } from 'types/user';
import Axios from './axios';

export const GetDashboardApiService = async () => {
  const res: AxiosResponse<IResponse<IDashboard>> = await Axios.get(
    '/user/investment/dashboard'
  );
  return res.data;
};

export const NextROIApiService = async () => {
  const res: AxiosResponse<IResponse<IList<IMyInvestment>>> = await Axios.get(
    '/user/investment/me?active=true&size=4'
  );
  return res.data.data;
};
