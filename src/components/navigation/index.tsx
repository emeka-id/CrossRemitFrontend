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
    <nav
      className={
        isLoggedIn ? [styles.navbar, "light nav-75"].join(" ") : styles.navbar
      }
    >
      <div
        className={
          !isLoggedIn
            ? ["container", "flex justify-content-between pr-30"].join(" ")
            : "flex pr-30"
        }
      >
        <div className={[styles.menu, "pl-20"].join(" ")}>
          {!path.includes("/auth") && (
            <Hamburger
              className={styles.hamburger}
              onClick={onClick}
              style={{ fill: "#000 !important" }}
            />
          )}
          <a href={isLoggedIn ? "/app/home" : "https://crossremit.com"}>
            {isLoggedIn ? null : <CrossRemitLogo className={styles.logo} />}
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
        )}
      </div>
    </nav>
  );
};

export default Navigation;
