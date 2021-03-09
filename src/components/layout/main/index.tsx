import { Analytics, Close } from 'assets/svg';
import Button from 'components/button';
import Card from 'components/card';
import { Constants, Page } from 'core/utils/constants';
import { SecureStorage } from 'core/utils/storage';
import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
      icon: <Analytics />,
      name: 'Invest',
      link: '/app/invest',
    },
    {
      icon: <Analytics />,
      name: 'Deposit',
      link: '/app/deposit',
    },
    {
      icon: <Analytics />,
      name: 'My Investment',
      link: '/app/my-investment',
    },
    {
      icon: <Analytics />,
      name: 'Transaction',
      link: '/app/transaction',
    },
    {
      icon: <Analytics />,
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

      <div className={[styles.main, 'container'].join(' ')}>
        <aside className={toggle ? 'showMobileNav' : 'hideMobileNav'}>
          <Card>
            <>
              <i onClick={() => setToggle(!toggle)}>
                <Close />
              </i>
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
              </ul>
              <Button onClick={handleLogOut}>Logout</Button>
            </>
          </Card>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
