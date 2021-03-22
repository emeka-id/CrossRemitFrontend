import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput } from 'components';
import CustomDropdown from 'components/custom-dropdown';
import UserContext from 'context/user';
import {
  GetListOfInvestApiService,
  GetMyAccountBalanceApiService,
  StartNewInvestmentApiService,
} from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Iselect } from 'types/inputs';
import { IResponse } from 'types/response';
import { IBalanceResponse, IInvest, IUserInvestment } from 'types/user';
import styles from './invest.module.scss';

const Invest = () => {
  //TODO To use settings for percentage calculation
  const [investmentName, setInvestmentName] = useState('');
  const InvestList = useQuery('investList', GetListOfInvestApiService);
  let InvestmentSelectList: Array<{ name: string; value: string }> = [];

  const [investmentPlan, setInvestmentPlan] = useState('');

  InvestList.data?.data.forEach((Invest: IInvest) => {
    InvestmentSelectList.push({
      name: Invest.name + ' - ' + Invest.duration + ' months',
      value: Invest._id,
    });
  });

  const GetAccountBalance = useQuery(
    'getAccountBalance',
    GetMyAccountBalanceApiService
  );

  const tempInvestmentList: Array<Iselect> = [];

  const { isLoading, mutate } = useMutation(StartNewInvestmentApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUserInvestment>>) => {
      const { data } = res.data;
      GetAccountBalance.refetch();
      const investAmount = document.getElementById(
        'investAmount'
      ) as HTMLInputElement;
      const investInterest = document.getElementById(
        'investInterest'
      ) as HTMLInputElement;
      const selectInvest = document.getElementById(
        'selectInvest'
      ) as HTMLSelectElement;
      investInterest.value = '';
      investAmount.value = '';
      return;
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () => {
    if (Number(inputs.amount) < 1000) {
      toast.error('You have to invest a minimum of N1,000');
    }
    if (Number(inputs.amount) > Number(GetAccountBalance.data?.data)) {
      toast.error("You don't have sufficient balance to make this investment");
    }
    if (investmentPlan === '') {
      toast.error('Please select an investment plan');
    }
    if (Number(inputs.amount) < Number(GetAccountBalance.data?.data)) {
      mutate({
        ...inputs,
        investment: investmentPlan,
        investmentName: selectedInvestment?.name,
      });
    }
  };

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
    (data) => data._id === investmentPlan
  );

  return (
    <>
      Invest
      <div className="mb-20">
        <Card color="primary-color" className="flex justify-content-between">
          <div>
            <div>Available Balance</div>
            <div>
              &#x20A6;{' '}
              {GetAccountBalance.isLoading
                ? '...loading'
                : new Intl.NumberFormat().format(
                    Number(GetAccountBalance.data?.data)
                  )}
            </div>
          </div>
          <Link to="/app/deposit">
            <Button className="dark text-light">Deposit</Button>
          </Link>
        </Card>
      </div>
      <Card>
        Investment Amount
        <form onSubmit={handleSubmit}>
          <div className={styles.invest}>
            <CustomInput
              name="amount"
              label="Enter Amount to invest"
              id="investAmount"
              onChange={handleChange}
            />
            <CustomInput
              defaultValue={
                selectedInvestment &&
                new Intl.NumberFormat().format(
                  Number(inputs.amount) * 0.2 * selectedInvestment?.duration
                )
              }
              label="Total Interest based on 20%"
              id="investInterest"
              disable={true}
            />
            <CustomDropdown
              dropdownOption={InvestmentSelectList}
              placeHolderText="Select an investment option"
              selectedOption={investmentPlan}
              handleChange={(e: string) => setInvestmentPlan(e)}
            />
          </div>
          <Button className="mt-40">
            {isLoading ? <Loading /> : 'Invest'}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Invest;
