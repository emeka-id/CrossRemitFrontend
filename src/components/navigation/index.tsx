import Button from "components/button";
import UserContext from "context/user";
import { Constants } from "core/utils/constants";
import { SecureStorage } from "core/utils/storage";
import React, { FC, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import profile from "../../assets/img/profile-avatar.png";
import { BellLogo, CrossRemitLogo, Hamburger } from "../../assets/svg";
import styles from "./navigation.module.scss";

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
    <div>
      {isLoggedIn && (
        <nav className={[styles.navbar, "light nav-75"].join(" ")}>
          <div className={[styles.navbarContainer, "flex"].join(" ")}>
            <div className={styles.dashboardText}>Dashboard</div>
            <div className={styles.notificationContainer}>
              <div className={styles.notification}>
                <BellLogo />
                <div className={styles.badge}>0</div>
              </div>
              <img
                src={currentUser.pic || profile}
                alt=""
                className="profile-img small ml-20"
              />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
