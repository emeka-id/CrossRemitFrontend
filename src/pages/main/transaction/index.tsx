import { DepositSvg, Loading } from 'assets/svg';
import { InvestWidthdraw } from 'assets/svg';
import { Widthdrawal } from 'assets/svg';
import { Pending } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card } from 'components';
import UserContext from 'context/user';
import { GetTransactionsApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { IList, IResponse } from 'types/response';
import { ITransactions } from 'types/user';
import Withdrawal from '../home/withdrawal';
import styles from './transaction.module.scss';

const size = 20;
const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ITransactions[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const Transactions = async () => {
    setLoading(true);
    try {
      const res = await GetTransactionsApiService({ currentPage, size });
      setData([...data, ...res.data.data.response]);
      setCurrentPage(currentPage + 1);
      setShowMore(
        Math.ceil(res.data.data.pagination.total / size) > currentPage
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const { message = null } = handleError(error);
      toast.error(message);
    }
  };

  useEffect(() => {
    Transactions();
  }, []);

  return (
    <>
      <h3 className="mt-5 mb-5 font-weight-normal">Transaction</h3>
      <Card className="mt-15">
        {loading && !data.length ? (
          <div>Loading transactions...</div>
        ) : !data.length ? (
          <div>No transactions yet...</div>
        ) : (
          <div>
            {data.map((Transaction: ITransactions, index: number) => (
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
                    <small className="grey-text">
                      {new Date(Transaction.createdAt).toUTCString()}
                    </small>
                  </div>
                </div>
                <div className={styles.ref}>
                  <b>
                    &#8358;{' '}
                    {new Intl.NumberFormat().format(Number(Transaction.amount))}
                  </b>
                  <br />
                  <small className="grey-text">{Transaction.ref}</small>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-content-center">
          {showMore && (
            <Button variant="outline" onClick={() => Transactions()}>
              {loading ? <Loading /> : 'Load more'}
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default Transaction;
