import { Button, Card, Tabs } from "components";
import Tab from "components/tabs/tab";
import React from "react";
import styles from "./transaction.module.scss";

const Transaction = () => {
  return (
    <>
      <Tabs>
        <Tab title="Pending">
          <div className={styles.table_container}>
            <table>
              <thead>
                <tr>
                  <th className={styles.inputCheckbox}>
                    <input type="checkbox" />
                  </th>
                  <th>Users</th>
                  <th>Transactions</th>
                  <th>Amount</th>
                  <th>
                    Expected
                    <br /> Currency
                  </th>
                  <th>
                    Remitted
                    <br /> Currency
                  </th>
                  <th>Rate</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {Array(10)
                  .fill("")
                  .map((item: any, index: number) => (
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Cameron Williamson</td>
                      <td>Buy</td>
                      <td>5000</td>
                      <td>Naira</td>
                      <td>CAD</td>
                      <td>1 CAD = 420</td>
                      <td>12/01/21</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab title="Completed"></Tab>
      </Tabs>
    </>
  );
};

export default Transaction;
