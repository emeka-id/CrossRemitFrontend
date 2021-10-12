import { CrossCircle } from "assets/svg";
import { Tabs } from "components";
import PostedAds from "components/postedAdsCard";
import Tab from "components/tabs/tab";
import React from "react";
import { useHistory } from "react-router";
import styles from "./ads.module.scss";
import CreateAds from "./createAd";

const Ads = () => {
  const history = useHistory();

  const createAdPage = () => {
    history.push("/app/ads/createAd");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.adButton} onClick={createAdPage}>
          <CrossCircle />
          <div className={styles.adText}>Create an AD</div>
        </div>
      </div>
      <div className="mt-50">
        <Tabs>
          <Tab title="My Ads">
            <div className={styles.investment}>
              <PostedAds />
              <PostedAds />
              <PostedAds />
              <PostedAds />
            </div>
            <div className={styles.investment}>
              <PostedAds />
              <PostedAds />
              <PostedAds />
              <PostedAds />
            </div>
          </Tab>
          <Tab title="All Ads">
            <div className={styles.investment}>
              <PostedAds />
              <PostedAds />
              <PostedAds />
              <PostedAds />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Ads;
