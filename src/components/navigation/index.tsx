import React, { FC, useContext } from 'react';
import { Bell, Hamburger, Logo } from '../../assets/svg';
import profile from '../../assets/img/profile-avatar.png';
import styles from './navigation.module.scss';
import Button from 'components/button';
import { Link, useRouteMatch } from 'react-router-dom';
import UserContext from 'context/user';
import { SecureStorage } from 'core/utils/storage';
import { Constants } from 'core/utils/constants';

type Props = {
  onClick?: () => void;
};

type routing = {
  path: string;
};

const Navigation: FC<Props> = ({ onClick }) => {
  const secureStorage = new SecureStorage();
  const isLoggedIn = secureStorage.getItem(Constants.token);
  const { currentUser } = useContext(UserContext);

  let { path }: routing = useRouteMatch();

  return (
    <nav
      className={
        isLoggedIn ? [styles.navbar, 'light nav-75'].join(' ') : styles.navbar
      }
    >
      <div
        className={
          !isLoggedIn
            ? ['container', 'flex justify-content-between pr-30'].join(' ')
            : 'flex justify-content-between pr-30'
        }
      >
        <div className={[styles.menu, 'pl-20'].join(' ')}>
          {!path.includes('/auth') && (
            <Hamburger
              className={styles.hamburger}
              onClick={onClick}
              style={{ fill: '#000 !important' }}
            />
          )}
          <a href={isLoggedIn ? '/app/home' : 'https://rabbicapitals.com'}>
            {isLoggedIn ? null : <Logo className={styles.logo} />}
          </a>
        </div>
        {!isLoggedIn ? (
          <div className="flex">
            <div className="">
              <Link to="/auth/login">
                <Button variant="stripped">Login</Button>
              </Link>
            </div>
            <div>
              <Link to="/auth/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div style={{ display: 'none' }}>
              <div className={styles.notification}>
                <Bell />
                <div className={styles.badge}>0</div>
              </div>
            </div>

            <img
              src={currentUser.pic || profile}
              alt=""
              className="profile-img small"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
