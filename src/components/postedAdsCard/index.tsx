import { Button, Card } from "components";
import React from "react";
import styles from "./postedAds.module.scss";

const PostedAds = () => {
  return (
    <Card className={styles.chart}>
      <div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between mt-15",
          ].join(" ")}
        >
          <div>Looking for</div>
          <div>CAD</div>
        </div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between",
          ].join(" ")}
        >
          <div>Amount available to sell</div>
          <div>2000</div>
        </div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between",
          ].join(" ")}
        >
          <div>Rate user is selling</div>
          <div>400 per CAD</div>
        </div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between",
          ].join(" ")}
        >
          <div>Location of seller</div>
          <div>Lagos</div>
        </div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between",
          ].join(" ")}
        >
          <div>Ad created</div>
          <div>12/01/21</div>
        </div>
        <div
          className={[
            styles.chartContainer,
            "flex justify-content-between",
          ].join(" ")}
        >
          <div>Name of seller</div>
          <div>@Michael81</div>
        </div>
        <Button className={styles.chartButton}>Sell</Button>
      </div>
    </Card>
  );
};

export default PostedAds;
