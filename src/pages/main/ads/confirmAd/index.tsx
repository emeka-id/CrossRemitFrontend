import { BackArrow } from "assets/svg";
import { Button, Card } from "components";
import React from "react";
import { useHistory } from "react-router";
import styles from "./confrimAd.module.scss";

const ConfirmAd = () => {
  const history = useHistory();
  const goBack = () => {
    history.go(-1);
  };

  const proceed = () => {
    history.push("/app/ads/completeAd");
  };

  return (
    <div>
      <div className={[styles.arrowContainer, "flex"].join(" ")}>
        <BackArrow onClick={goBack} className={styles.backArrow} />
        <div className={[styles.back, "ml-10"].join(" ")}>Back</div>
      </div>
      <div className={[styles.topTextContainer].join(" ")}>
        <div className={styles.confirmAd}>Confirm</div>
        <div className={styles.transactionText}>
          You are about to post an AD with these details. <br />
          Confirm the details below before posting
        </div>
        <div className="flex justify-content-center">
          <Card className={styles.cardContainer}>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>I want to sell</div>
              <div className={styles.cardText2}>CAD</div>
            </div>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>Amount to sell</div>
              <div className={styles.cardText2}>2000</div>
            </div>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>For</div>
              <div className={styles.cardText2}>NGN</div>
            </div>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>Exchange Rate</div>
              <div className={styles.cardText2}>1 CAD = N450</div>
            </div>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>Date</div>
              <div className={styles.cardText2}>12/1/20</div>
            </div>
            <div className="flex justify-content-between">
              <div className={styles.cardText}>Response Time</div>
              <div className={styles.cardText2}>2 Hours</div>
            </div>
          </Card>
        </div>
        <div className="flex justify-content-center">
          <Button className={styles.confirmButton} onClick={proceed}>
            Yes, Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAd;
