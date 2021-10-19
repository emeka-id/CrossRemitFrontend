import {
  Analytics,
  Close,
  CrossRemitLogo,
  DepositRouteIcon,
  InvestRouteIcon,
  LogoutRouteIcon,
  TransactionsRouteIcon,
  WithdrawRouteIcon,
} from "assets/svg";
import Button from "components/button";
import Card from "components/card";
import UserContext from "context/user";
import { Constants } from "core/utils/constants";
import { SecureStorage } from "core/utils/storage";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import Navigation from "../../navigation";
import styles from "./main.module.scss";

type Props = {
  title?: string;
  children?: JSX.Element | JSX.Element[];
};

const AppLayout = ({ children }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { bank, idCard } = currentUser;

  const useGetIsActive = (url: string) => {
    const match = useRouteMatch(url);
    console.log("check url", match);
    return match ? true : false;
  };

  const data = [
    {
      icon: <Analytics />,
      name: "Dashboard",
      link: "/app/home",
      isActive: useGetIsActive("/app/home"),
    },
    {
      icon: <InvestRouteIcon />,
      name: "Ads",
      link: "/app/ads",
      isActive: useGetIsActive("/app/ads"),
    },
    {
      icon: <DepositRouteIcon />,
      name: "Transactions",
      link: "/app/transaction",
      isActive: useGetIsActive("/app/transaction"),
    },
    {
      icon: <WithdrawRouteIcon />,
      name: "Chat",
      link: "/app/withdraw",
      isActive: useGetIsActive("/app/withdraw"),
    },
    {
      icon: <TransactionsRouteIcon />,
      name: "Profile",
      link: "/app/deposit",
      isActive: useGetIsActive("/app/deposit"),
    },
  ];

  const handleLogOut = () => {
    const secureStorage = new SecureStorage();
    secureStorage.removeItem(Constants.token);
    secureStorage.removeItem(Constants.currentUser);
    history.push("/auth/login");
  };

  return (
    <div className={styles.layout}>
      <div className={[styles.main].join(" ")}>
        <aside className={toggle ? "showMobileNav" : "hideMobileNav"}>
          <>
            <i onClick={() => setToggle(!toggle)}>
              <Close style={{ fill: "#fff" }} />
            </i>
            <div className="mt-20">
              <a href={"/app/home"}>
                <CrossRemitLogo />
              </a>
            </div>

            <hr style={{ opacity: "0.1" }} />
            <ul>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={item.isActive ? styles.linkContainer : ""}
                >
                  <Link
                    className={item.isActive ? styles.activeLink : ""}
                    to={item.link}
                    onClick={() => setToggle(false)}
                  >
                    {item.icon} <span className="ml-15">{item.name}</span>
                  </Link>
                </li>
              ))}
              <div className="ml-15 mt-100 mr-15">
                <Link to="" onClick={handleLogOut}>
                  <Button variant="logout">
                    <LogoutRouteIcon /> <span className="ml-15">Logout</span>
                  </Button>
                </Link>
              </div>
            </ul>
          </>
        </aside>
        <main>
          <Navigation onClick={() => setToggle(!toggle)} />
          <div className={[styles.mainContainer].join(" ")}>
            {idCard ? (
              idCard.status === "Not Verified" ? (
                <Card
                  className={[
                    styles.verify,
                    "flex justify-content-between primary-color-light",
                  ].join(" ")}
                >
                  <div>
                    <h3 className="m-0">Verify Your Identity</h3>
                    <small style={{ width: "80%" }}>
                      Please provide your identity as this will enable us to
                      verify your identity and provide you quality service.
                    </small>
                  </div>
                  <Link to="/app/settings">
                    <Button>Verify Now</Button>
                  </Link>
                </Card>
              ) : null
            ) : null}

            {bank ? (
              !bank.accountNumber ? (
                <Card
                  className={[
                    styles.verify,
                    "flex justify-content-between primary-color-light",
                  ].join(" ")}
                >
                  <div>
                    <h3 className="m-0">Add Bank Details</h3>
                    <small style={{ width: "80%" }}>
                      Please provide your bank details as this will enable us to
                      provide payout
                    </small>
                  </div>
                  <Link to="/app/settings">
                    <Button>Add Bank Account</Button>
                  </Link>
                </Card>
              ) : null
            ) : null}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
