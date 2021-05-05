import {
  Analytics,
  Close,
  InvestRouteIcon,
  SettingsRouteIcon,
  TransactionsRouteIcon,
  DepositRouteIcon,
  MyInvestmentRouteIcon,
  LogoutRouteIcon,
  Logo,
} from 'assets/svg';
import Button from 'components/button';
import Card from 'components/card';
import { Constants, Page } from 'core/utils/constants';
import { SecureStorage } from 'core/utils/storage';
import React, { useState } from 'react';
import { Link, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import Navigation from '../../navigation';
import styles from './main.module.scss';

type Props = {
  title?: string;
  children?: JSX.Element | JSX.Element[];
};

const AppLayout = ({ children }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const data = [
    {
      icon: <Analytics />,
      name: 'Dashboard',
      link: '/app/home',
    },
    {
      icon: <InvestRouteIcon />,
      name: 'Invest',
      link: '/app/invest',
    },
    {
      icon: <DepositRouteIcon />,
      name: 'Deposit',
      link: '/app/deposit',
    },
    {
      icon: <MyInvestmentRouteIcon />,
      name: 'My Investment',
      link: '/app/my-investment',
    },
    {
      icon: <TransactionsRouteIcon />,
      name: 'Transaction',
      link: '/app/transaction',
    },
    {
      icon: <SettingsRouteIcon />,
      name: 'Settings',
      link: '/app/settings',
    },
  ];

  const handleLogOut = () => {
    const secureStorage = new SecureStorage();
    secureStorage.removeItem(Constants.token);
    secureStorage.removeItem(Constants.currentUser);
    history.push('/auth/login');
  };

  return (
    <div className={styles.layout}>
      <Navigation onClick={() => setToggle(!toggle)} />

      <div className={[styles.main].join(' ')}>
        <aside className={toggle ? 'showMobileNav' : 'hideMobileNav'}>
          <>
            <i onClick={() => setToggle(!toggle)}>
              <Close />
            </i>
            <div className="mt-20">
              <a href={'/app/home'}>
                <Logo />
              </a>
            </div>

            <hr style={{ opacity: '0.1' }} />
            <ul>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={`flex${
                    location.pathname === item.link ? ' activeLink' : ''
                  }`}
                >
                  <Link to={item.link} onClick={() => setToggle(false)}>
                    {item.icon} <span className="ml-15">{item.name}</span>
                  </Link>
                </li>
              ))}
              <div className="ml-15 mt-40 mr-15">
                <Link to="" onClick={handleLogOut}>
                  <Button variant="logout">
                    <LogoutRouteIcon /> <span className="ml-15">Logout</span>
                  </Button>
                </Link>
              </div>
            </ul>
          </>
        </aside>
        <main className={[styles.mainContainer].join(' ')}>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
