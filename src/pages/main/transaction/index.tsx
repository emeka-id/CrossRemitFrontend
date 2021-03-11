import { DepositSvg } from 'assets/svg';
import { InvestWidthdraw } from 'assets/svg';
import { Widthdrawal } from 'assets/svg';
import { Pending } from 'assets/svg';
import { Card } from 'components';
import UserContext from 'context/user';
import { GetTransactionsApiService } from 'core/services/user';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { IUserTransactions } from 'types/user';
import styles from './transaction.module.scss';

const Transaction = () => {
  const { currentUser } = useContext(UserContext);
  const Transactions = useQuery('getTransactions', GetTransactionsApiService);
  let date = new Date();

  return (
    <>
      Transaction
      <Card>
        {Transactions.isLoading ? (
          <div>Loading transactions...</div>
        ) : (
          <div>
            {Transactions.data?.response.map(
              (Transaction: IUserTransactions, index: number) => (
                <div
                  key={index}
                  className={[
                    styles.txn,
                    'flex justify-content-between pb-15 mb-15',
                  ].join(' ')}
                >
                  <div className="flex">
                    {Transaction.purpose === 'Invest' ? (
                      <InvestWidthdraw />
                    ) : Transaction.type === 'Deposit' ? (
                      <DepositSvg />
                    ) : Transaction.purpose === 'Cashout' ? (
                      <Widthdrawal />
                    ) : Transaction.type === 'Pending' ? (
                      <Pending />
                    ) : null}
                    <div className="ml-10">
                      <b>
                        {Transaction.purpose} - {Transaction.investmentName}{' '}
                        Plan
                      </b>
                      <br />
                      <small>
                        {new Date(Transaction.createdAt).toDateString()}
                      </small>
                    </div>
                  </div>
                  <div className={styles.ref}>
                    <b>&#8358; {Transaction.amount}</b>
                    <br />
                    <small>{Transaction.ref}</small>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default Transaction;
