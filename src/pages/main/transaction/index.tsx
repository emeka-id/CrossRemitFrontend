import { DepositSvg, Loading } from 'assets/svg';
import { InvestWidthdraw } from 'assets/svg';
import { Widthdrawal } from 'assets/svg';
import { Pending } from 'assets/svg';
import { Button, Card } from 'components';
import UserContext from 'context/user';
import { GetTransactionsApiService } from 'core/services/user';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { IUserTransactions } from 'types/user';
import Withdrawal from '../home/withdrawal';
import styles from './transaction.module.scss';

const Transaction = () => {
  const { currentUser } = useContext(UserContext);
  let date = new Date();

  const [size, setSize] = useState(5);
  const Transactions = useQuery(['getTransactions', size], () =>
    GetTransactionsApiService(size)
  );

  const handlePagination = () => {
    setSize(size + 5);
    Transactions.refetch();
  };

  return (
    <>
      Transaction
      <Card>
        {Transactions.isLoading ? (
          <div>Loading transactions...</div>
        ) : Transactions.data?.response.length === 0 ? (
          <div>No transactions yet...</div>
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
                    ) : Transaction.purpose === 'Cashout' ||
                      Transaction.type === 'Pending' ? (
                      <Pending />
                    ) : Transaction.purpose === 'Cashout' ||
                      Transaction.type !== 'Pending' ? (
                      <Withdrawal />
                    ) : null}
                    <div className="ml-10">
                      <b>
                        {Transaction.purpose} {Transaction.investmentName}
                      </b>
                      <br />
                      <small>
                        {new Date(Transaction.createdAt).toUTCString()}
                      </small>
                    </div>
                  </div>
                  <div className={styles.ref}>
                    <b>
                      &#8358;{' '}
                      {new Intl.NumberFormat().format(
                        Number(Transaction.amount)
                      )}
                    </b>
                    <br />
                    <small>{Transaction.ref}</small>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        <div>
          {Number(Transactions.data?.pagination.total) > size ? (
            <Button onClick={handlePagination}>
              {Transactions.isLoading ? <Loading /> : 'Load more'}
            </Button>
          ) : Number(Transactions.data?.pagination.total) < size ? (
            ''
          ) : null}
        </div>
      </Card>
    </>
  );
};

export default Transaction;
