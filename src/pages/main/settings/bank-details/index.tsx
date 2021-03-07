import { Button } from 'components';
import React, { useContext, useState } from 'react';
import styles from './bank-details.module.scss';

import useForm from '../../../../core/utils/use-form';
import { IBank, IUser } from 'types/user';
import { IBankDetails } from 'types/bank';
import UserContext from 'context/user';
import { useMutation, useQuery } from 'react-query';
import { UpdateUserApiService } from '../../../../core/services/user';
import { AxiosResponse } from 'axios';
import { IResponse } from 'types/response';
import { handleError } from 'core/utils/error-handler';
import { Loading } from 'assets/svg';
import {
  BankListApiService,
  VerifyAccountNameApiService,
} from 'core/services/bank';
import toast from 'react-hot-toast';

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
      toast.error(response?.message);
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
  const verifyAccountName = useQuery(
    ['bankResolve', inputs],
    () => VerifyAccountNameApiService(inputs),
    {
      enabled: inputs.accountNumber?.length === 10 && inputs.sortCode !== '',
    }
  );

  return (
    <div className={styles.bankDetails}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Beneficiary Bank</label>
            <select
              onChange={handleChange}
              defaultValue={inputs.sortCode}
              name="sortCode"
            >
              {bankList.isLoading
                ? ''
                : bankList?.data?.data.map(
                    (el: IBankDetails, index: number) => (
                      <option key={index} value={el.code}>
                        {el.name}
                      </option>
                    )
                  )}
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
            {!verifyAccountName.data?.success && (
              <small className="text-red">
                {verifyAccountName.data?.message}
              </small>
            )}
          </div>

          {verifyAccountName.isLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            verifyAccountName.isSuccess &&
            verifyAccountName.data?.success && (
              <div className="form-group">
                <label>Account name</label>
                <input
                  type="text"
                  defaultValue={verifyAccountName.data?.data?.account_name}
                  name="account_name"
                  disabled
                />
              </div>
            )
          )}
          <Button
            className="mt-20"
            disabled={!inputs.accountNumber || !inputs.sortCode ? true : false}
          >
            {updateBank.isLoading ? <Loading /> : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;
