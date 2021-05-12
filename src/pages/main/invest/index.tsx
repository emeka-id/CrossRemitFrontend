import { Loading } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, CustomInput, TextLoader } from 'components';
import CustomDropdown from 'components/custom-dropdown';
import UserContext from 'context/user';
import {
  GetListOfInvestApiService,
  GetMyAccountBalanceApiService,
  GetMyActiveInvestmentsApiService,
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
import { checkInput } from '../helper';
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

  const MyActiveInvestments = useQuery(
    'getMyActiveInvestments',
    GetMyActiveInvestmentsApiService
  );

  const tempInvestmentList: Array<Iselect> = [];

  const investAmount = document.getElementById(
    'investAmount'
  ) as HTMLInputElement;
  const investInterest = document.getElementById(
    'investInterest'
  ) as HTMLInputElement;
  const selectInvest = document.getElementById(
    'selectInvest'
  ) as HTMLSelectElement;

  const { isLoading, mutate } = useMutation(StartNewInvestmentApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUserInvestment>>) => {
      const { data } = res.data;
      GetAccountBalance.refetch();
      investInterest.value = '';
      investAmount.value = '';
      toast.success(
        `Investment of N ${inputs.amount} on ${selectedInvestment?.name} Plan was successful`
      );
      return;
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const getInvestmentPlanPercent = (id: string) => {
    const plan = InvestList.data?.data.find((obj) => obj._id === id);
    return plan?.percent || 0;
  };

  const submit = () => {
    if (Number(inputs.amount) < 100000) {
      toast.error('You have to invest a minimum of N 100,000');
    } else if (
      Number(inputs.amount) < Number(GetAccountBalance.data?.data) &&
      inputs.amount &&
      investmentPlan
    ) {
      mutate({
        ...inputs,
        investment: investmentPlan,
        percent: getInvestmentPlanPercent(investmentPlan),
        investmentName: selectedInvestment?.name,
        dateInvested: JSON.stringify(new Date()),
      });
    } else if (!inputs.amount) {
      toast.error('Please enter an amount');
    } else if (Number(inputs.amount) > Number(GetAccountBalance.data?.data)) {
      toast.error("You don't have sufficient balance to make this investment");
    } else if (investmentPlan === '') {
      toast.error('Please select an investment plan');
    }
  };

  const initInvestment: IUserInvestment = {
    investment: '',
    amount: 0,
    percent: 0,
    investmentName: '',
    dateInvested: '',
  };

  const { inputs, handleChange, handleSubmit } = useForm<IUserInvestment>(
    initInvestment,
    submit
  );

  const selectedInvestment = InvestList.data?.data.find(
    (data) => data._id === investmentPlan
  );

  const equalTo6 = MyActiveInvestments.data?.response.length === 6;

  return (
    <>
      <h2 className="mt-5 mb-25 font-weight-bold">Invest</h2>
      <div className="mb-20 mt-15">
        <Card color="primary-color" className="flex justify-content-between">
          <div>
            <h3 className="font-weight-bold mb-10">Available Balance</h3>
            <h2 className="font-weight-medium mt-5 mb-5">
              &#x20A6;{' '}
              {GetAccountBalance.isLoading
                ? <TextLoader />
                : new Intl.NumberFormat().format(
                    Number(GetAccountBalance.data?.data)
                  )}
            </h2>
          </div>
          <Link to="/app/deposit">
            <Button className="dark text-light">Deposit</Button>
          </Link>
        </Card>
      </div>
      <div>
        <Card>
          <h3>Investment Amount</h3>
          <form className="mt-20" onSubmit={handleSubmit}>
            <div className={styles.invest}>
              <div className="form-group">
                <CustomInput
                  name="amount"
                  label="Enter Amount to invest"
                  id="investAmount"
                  name_of_input="NGN"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <CustomInput
                  defaultValue={
                    selectedInvestment &&
                    getInvestmentPlanPercent(investmentPlan) !== 100 ? 
                    new Intl.NumberFormat().format(
                      Number(checkInput(inputs.amount)) *
                      (getInvestmentPlanPercent(investmentPlan)/100) *
                        selectedInvestment?.duration
                    ):
                    Number(checkInput(inputs.amount))
                  }
                  label={`Total Interest ${
                    investmentPlan &&
                    'Based on ' + getInvestmentPlanPercent(investmentPlan) + '%'
                  } `}
                  name_of_input="NGN"
                  id="investInterest"
                  disable={true}
                />
              </div>

              <div className={[styles.customDrop, 'form-group'].join(' ')}>
                <CustomDropdown
                  dropdownOption={InvestmentSelectList}
                  placeHolderText="Select an investment option"
                  selectedOption={investmentPlan}
                  handleChange={(e: string) => setInvestmentPlan(e)}
                />
              </div>
            </div>
            <Button className="mt-40" disabled={isLoading ? true : false}>
              {isLoading ? <Loading /> : 'Invest'}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Invest;
