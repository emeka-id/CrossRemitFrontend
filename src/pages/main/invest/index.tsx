import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import {
  GetListOfInvestApiService,
  StartNewInvestmentApiService,
} from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { IResponse } from 'types/response';
import { IInvest, IUserInvestment } from 'types/user';
import styles from './invest.module.scss';

const Invest = () => {
  //TODO To use settings for percentage calculation
  const [investmentName, setInvestmentName] = useState('');
  const InvestList = useQuery('investList', GetListOfInvestApiService);

  const { isLoading, mutate } = useMutation(StartNewInvestmentApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUserInvestment>>) => {
      const { data } = res.data;
      return;
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () =>
    mutate({ ...inputs, investmentName: selectedInvestment?.name });

  const initInvestment: IUserInvestment = {
    investment: '',
    amount: 0,
    percent: 20,
    investmentName: '',
  };

  const { inputs, handleChange, handleSubmit } = useForm<IUserInvestment>(
    initInvestment,
    submit
  );

  const selectedInvestment = InvestList.data?.data.find(
    (data) => data._id === inputs.investment
  );

  return (
    <>
      Invest
      <div className="mb-20">
        <Card color="primary-color" className="flex justify-content-between">
          <div>
            <div>Available Balance</div>
            <div>&#x20A6; 250,000</div>
          </div>
          <Button className="dark text-light">Deposit</Button>
        </Card>
      </div>
      <Card>
        Investment Amount
        <form onSubmit={handleSubmit}>
          <div className={styles.invest}>
            <CustomInput
              name="amount"
              label="Enter Amount to invest"
              onChange={handleChange}
            />
            <CustomInput
              defaultValue={
                selectedInvestment &&
                Number(inputs.amount) * 0.2 * selectedInvestment?.duration
              }
              label="Total Interest based on 20%"
              disable={true}
            />
            <select name="investment" onChange={handleChange}>
              <option>Select an investment plan</option>
              {InvestList.data?.data.map((Invest: IInvest, index: number) => (
                <option key={index} value={Invest._id}>
                  {Invest.name} - {Invest.duration} months
                </option>
              ))}
            </select>
          </div>
          <Button className="mt-40">
            {isLoading ? <Loading /> : 'Deposit'}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Invest;
