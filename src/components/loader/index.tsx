import { CrossRemitLogo, Loading } from "assets/svg";
import React from "react";
import loadingIcon from "../../assets/img/loading-icon.png";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loadingScreen}>
      <div>
        <div>
          <CrossRemitLogo />
        </div>
        <div className={styles.loading}>
          <Loading className="dark-loader" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
