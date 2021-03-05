import { Button } from 'components';
import React, { useContext, useState } from 'react';
import styles from './bank-details.module.scss';

import useForm from '../../../../core/utils/use-form';
import { IBank, IUser } from 'types/user';
import UserContext from 'context/user';
import { useMutation, useQuery } from 'react-query';
import { UpdateUserApiService } from '../../../../core/services/user';
import { AxiosResponse } from 'axios';
import Axios from 'core/services/axios';
import { IResponse } from 'types/response';
import { handleError } from 'core/utils/error-handler';
import { Loading } from 'assets/svg';
import { BankListApiService } from 'core/services/bank';

const BankDetails = () => {
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  const updateBank = useMutation(UpdateUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUser>>) => {
      const { data } = res.data;
      if (data) {
        updateCurrentUser(data);
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
    },
  });

  const submit = () =>
    updateBank.mutate({ ...currentUser, bank: { ...inputs } });

  const { bankName, accountNumber, sortCode }: IBank = currentUser.bank;
  let initBank = {
    bankName,
    accountNumber,
    sortCode,
  };

  const { inputs, handleChange, handleSubmit } = useForm<IBank>(
    initBank,
    submit
  );

  const bankList = useQuery('getBankList', BankListApiService);

  const verifyAcc = useQuery(
    'accName',
    async () => {
      const baseURL = 'https://rabbi-capital-api.herokuapp.com/api/v1';
      const { accountNumber, sortCode } = inputs;
      const { data } = await Axios.get(
        `${baseURL}/bank/resolve/${accountNumber}/${sortCode}`
      );
      return data;
    },
    { enabled: inputs.accountNumber?.length == 10 }
  );

  return (
    <div className={styles.bankDetails}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Beneficiary Bank</label>
            <select
              onChange={handleChange}
              value={inputs.sortCode}
              name="sortCode"
            >
              {bankList.isLoading
                ? ''
                : bankList.data.data.map((el: Object | any, index: number) => (
                    <option key={index} value={el.code}>
                      {el.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="form-group">
            <label>Account Number</label>
            <input
              defaultValue={inputs.accountNumber}
              name="accountNumber"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Account name</label>
            <input
              type="text"
              defaultValue={
                verifyAcc.isSuccess ? verifyAcc.data.data.account_name : null
              }
              name="account_name"
              disabled
            />
          </div>
          <Button className="mt-20">
            {updateBank.isLoading ? <Loading /> : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;
