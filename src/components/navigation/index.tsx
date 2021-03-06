import React, { FC, useContext } from 'react';
import { Bell, Hamburger, Logo } from '../../assets/svg';
import profile from '../../assets/img/profile-avatar.png';
import styles from './navigation.module.scss';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import UserContext from 'context/user';

type Props = {
  onClick?: () => void;
};

const Navigation: FC<Props> = ({ onClick }) => {
  const local = localStorage.getItem('currentUser') ? true : false;
  const { currentUser } = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <div className="container flex justify-content-between">
        <div className={styles.menu}>
          <Hamburger onClick={onClick} />
          <Logo />
        </div>
        {!local ? (
          <div className="flex">
            <div className="mr-10">
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
            <div className={styles.notification}>
              <Bell />
              <div className={styles.badge}>0</div>
            </div>
            <img src={profile} alt="" className={styles.profileImg} />
            <div className="ml-30 text-light">
              {currentUser
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
