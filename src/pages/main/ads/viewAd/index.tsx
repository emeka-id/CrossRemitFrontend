import {
  Arrow,
  BackArrow,
  CanadaRoundFlag,
  NigeriaRoundFlag,
} from "assets/svg";
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
        <div className={[styles.back, "ml-10"].join(" ")}>Back</div>
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
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Username</div>
              <div>Cat Williams</div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Date Posted</div>
              <div>12/01/21</div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Looking for</div>
              <div>
                <NigeriaRoundFlag className="mr-10" />
                <span>NGN</span>
              </div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Amount</div>
              <div>200, 000</div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>In exchange for</div>
              <div>
                <CanadaRoundFlag className="mr-10" />
                CAD
              </div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Exchange Rate</div>
              <div>
                <CanadaRoundFlag className="mr-10" />
                <span>1CAD = </span>
                <NigeriaRoundFlag className="mr-10 ml-5" />
                N450
              </div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Response Time</div>
              <div>2 Hours</div>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Current Status</div>
              <Badge type="Completed">Completed</Badge>
            </div>
            <div
              className={[
                styles.textContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>Interested Buyers</div>
              <div>TunOG & 2others</div>
            </div>
          </div>
        </Card>
      </div>
      <div
        className={[styles.buttonContainer, "flex justify-content-center"].join(
          " "
        )}
      >
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
      <div
        className={[
          styles.contactContainer,
          "flex justify-content-center",
        ].join(" ")}
      >
        <div className={styles.contactText}>Contact Seller</div>
        <Arrow />
      </div>
    </div>
  );
};

export default ViewAd;
