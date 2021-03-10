import { Button, Card, CustomInput } from 'components';
import UserContext from 'context/user';
import { GetListOfInvestApiService } from 'core/services/user';
import useForm from 'core/utils/use-form';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { IInvest, IUserInvestment } from 'types/user';
import styles from './invest.module.scss';

const Invest = () => {
  //TODO To use settings for percentage calculation
  const InvestList = useQuery('investList', GetListOfInvestApiService);
  const submit = () => {
    return;
  };

  const initInvestment = {
    investment: '',
    amount: 0,
    percent: 0,
  };

  const { inputs, handleChange } = useForm(initInvestment, submit);

  const duration = InvestList.data?.data.find((data) => {
    return data._id === inputs.investment;
  });

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
        <div className={styles.invest}>
          <CustomInput
            name="amount"
            label="Enter Amount to invest"
            onChange={handleChange}
          />
          <CustomInput
            defaultValue={
              duration && Number(inputs.amount) * 0.2 * duration?.duration
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
        <Button className="mt-40">Deposit</Button>
      </Card>
    </>
  );
};

export default Invest;
