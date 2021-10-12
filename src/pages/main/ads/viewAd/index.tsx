import { Arrow, BackArrow } from "assets/svg";
import { Button, Card } from "components";
import profile from "../../../../assets/img/profile-avatar.png";
import React from "react";
import { useHistory } from "react-router";
import styles from "./viewAd.module.scss";
import Badge from "components/badge";

const ViewAd = () => {
  const history = useHistory();

  const goBack = () => {
    history.go(-1);
  };

  const nextPage = () => {
    history.push("/app/ads/createOffer");
  };

  return (
    <div>
      <div className={[styles.arrowContainer, "flex"].join(" ")}>
        <BackArrow onClick={goBack} className={styles.backArrow} />
        <div className="ml-10">Back</div>
      </div>
      <div className="text-center">
        <div className={styles.confirmAd}>AD details</div>
      </div>
      <div className="flex justify-content-center">
        <Card className={styles.cardContainer}>
          <div className={styles.cardContentContainer}>
            <div className="flex justify-content-center">
              <img src={profile} className="profile-img mb-40" />
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Username</div>
              <div>Cat Williams</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Date Posted</div>
              <div>12/01/21</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Looking for</div>
              <div>NGN</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Amount</div>
              <div>200, 000</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>In exchange for</div>
              <div>CAD</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Exchange Rate</div>
              <div>1CAD = N450</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Response Time</div>
              <div>2 Hours</div>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Current Status</div>
              <Badge type="Completed">Completed</Badge>
            </div>
            <div className="flex justify-content-between mb-20">
              <div>Interested Buyers</div>
              <div>TunOG & 2others</div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-content-center mb-50">
        <Button className={styles.buyButton}>Buy</Button>
        <Button
          variant="outline"
          className={[styles.buyButton, "ml-20"].join(" ")}
          onClick={nextPage}
        >
          Create Offer
        </Button>
      </div>
      <div className={styles.text}>OR</div>
      <div className="flex justify-content-center">
        <div className={styles.contactText}>Contact Seller</div>
        <Arrow />
      </div>
    </div>
  );
};

export default ViewAd;
