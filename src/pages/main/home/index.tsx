import { CanadaFlag, CrossCircle } from "assets/svg";
import { Button, Card } from "components";
import PostedAds from "components/postedAdsCard";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./home.module.scss";

const Home = () => {
  const history = useHistory();

  const createAdPage = () => {
    history.push("/app/ads/createAd");
  };

  return (
    <>
      <div className={styles.lock}>
        <div>
          <div
            className={[
              styles.chartContainer,
              "flex justify-content-between",
            ].join(" ")}
          >
            <h2 className="mt-5 mb-5 font-weight-bold">Hi, Uju!</h2>
            <div className={styles.adButton} onClick={createAdPage}>
              <CrossCircle />
              <div className={styles.adText}>Create an AD</div>
            </div>
          </div>
          <div className={styles.text}>
            What transaction would you like to peform today?
          </div>

          <div className={styles.amounts}>
            <Card className={styles.cardContainer}>
              <div className="flex">
                <div className={styles.boxes}>I want to</div>
                <select className={styles.dropDown}>
                  <option>Buy</option>
                </select>
              </div>
              <div>
                <div className={styles.amountboxes}>
                  <select className={styles.dropDown}>
                    <option>CAD</option>
                  </select>
                  <div className={styles.amountBox}>Amount</div>
                </div>
              </div>
              <div>
                <div className={styles.boxes}>@</div>
              </div>
              <div>
                <div className={styles.rateBox}>
                  <div>Rate</div>
                  <div className={styles.text}>/CAD</div>
                </div>
              </div>
              <div>
                <Button className={styles.matchButton}>Find Match</Button>
              </div>
            </Card>
          </div>

          {/* Investment Information Section */}
          <div
            className={[
              styles.crossRemit,
              "flex justify-content-between mb-20",
            ].join(" ")}
          >
            <div>Posted Ads</div>
            <div>
              <div>See All</div>
              <hr className={styles.line} />
            </div>
          </div>
          <div className={styles.investment}>
            <PostedAds />
            <PostedAds />
            <PostedAds />
            <PostedAds />
          </div>

          {/* Balance Information Section */}
          <div>
            <div className={[styles.crossRemit, "mb-20"].join(" ")}>
              Buy from CrossRemit
            </div>
            <Card
              className={[
                styles.cardContainer,
                "flex justify-content-between",
              ].join(" ")}
            >
              <div>
                <div className={styles.crossRemit}>Currency</div>
                <div className="flex">
                  <div>CAD</div>
                  <CanadaFlag />
                </div>
              </div>
              <div
                className={[
                  styles.weBuyContainer,
                  "flex justify-content-between",
                ].join(" ")}
              >
                <div>
                  <div className={styles.crossRemit}>We Buy</div>
                  <div>500</div>
                </div>
                <div>
                  <div className={styles.crossRemit}>We Sell</div>
                  <div>490</div>
                </div>
              </div>
            </Card>
            <div className={[styles.crossRemit, "text-center mb-20"].join(" ")}>
              Other currencies will be available soon
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
