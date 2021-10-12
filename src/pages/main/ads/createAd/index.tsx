import { BackArrow, FowardArrow, PostAdLogo, ShipLogo } from "assets/svg";
import { Card } from "components";
import React from "react";
import { useHistory } from "react-router";
import styles from "./createAd.module.scss";

const CreateAds = () => {
  const history = useHistory();
  const goBack = () => {
    history.go(-1);
  };

  const postads = () => {
    history.push("/app/ads/postAd");
  };

  return (
    <>
      <div>
        <div className={[styles.arrowContainer, "flex"].join(" ")}>
          <BackArrow onClick={goBack} className={styles.backArrow} />
          <div className="ml-10">Back</div>
        </div>
        <div className="text-center">
          <div className={styles.createadText}>Create an AD</div>
          <div className={styles.transactionText}>
            What transaction would you like to make today
          </div>
          <div className={styles.cardContainer}>
            <Card className={styles.card}>
              <div className={styles.logoContainer}>
                <PostAdLogo />
              </div>
              <div className={styles.adText}>Post AD</div>
              <div className={styles.tradeText}>
                Choose to trade with other
                <br />
                users on the platform at an
                <br /> agreed rate between parties
              </div>
              <FowardArrow className={styles.arrowLogo} onClick={postads} />
            </Card>
            <Card className={styles.card}>
              <div className={styles.logoContainer}>
                <ShipLogo />
              </div>
              <div className={styles.adText}>Instant Settlement</div>
              <div className={styles.tradeText}>
                An instant settlement guarantees
                <br /> a faster process as you would be
                <br />
                trading directly with CrossRemit
                <br /> at the current rate
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAds;
