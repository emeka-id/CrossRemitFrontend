import React, { FC } from 'react';
import { Bell, Hamburger, Logo } from '../../assets/svg';
import profile from '../../assets/img/profile.png';
import styles from './navigation.module.scss';

type Props = {
   onClick?: () => void;
}

const Navigation: FC<Props> = ({onClick}) => {
  return (
    <nav className={styles.navbar}>
      <div className="container flex justify-content-between">
        <div className={styles.menu}>
          <Hamburger onClick={onClick} />
          <Logo />
        </div>
        <div className="flex">
          <div className={styles.notification}>
            <Bell />
            <div className={styles.badge}>12</div>
          </div>
          <img src={profile} alt="" className={styles.profileImg} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
