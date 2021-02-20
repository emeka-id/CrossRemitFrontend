import { Invest, Investment, Wallet } from "assets/svg";
import { AccountCard, Button, Card, InvestmentCard, Modal } from "components";
import { IModalRef } from "components/modal";
import React, { useRef } from "react";
import styles from "./home.module.scss";
import Withdrawal from "./withdrawal";

const Home = () => {
  const modal = useRef<IModalRef>(null);
  return (
    <>
      Dashboard
      <Card>
        <div className={styles.home}>
          <div className={styles.accounting}>
            <AccountCard
              icon={Wallet}
              amount="220,000.00"
              title="Available Balance"
            >
              <Button>Deposit</Button>
              <Button variant="outline" onClick={() => modal?.current?.open()}>
                Withdraw
              </Button>
            </AccountCard>
            <AccountCard
              icon={Invest}
              amount="220,000.00"
              title="Total Money Invested"
            >
              <Button>Invest More</Button>
            </AccountCard>
          </div>
          <div>
            <p>Active Investments</p>
          </div>
          <div>
            {[1, 2, 3].map((element, index) => (
              <InvestmentCard
                key={index}
                icon={Investment}
                name="Starter"
                duration="5 months"
              />
            ))}
          </div>
        </div>
      </Card>
      <Modal ref={modal}>
        <Withdrawal />
      </Modal>
    </>
  );
};

export default Home;
