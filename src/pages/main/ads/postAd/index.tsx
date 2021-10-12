import { BackArrow, ToggleButton } from "assets/svg";
import { Button } from "components";
import React from "react";
import { useHistory } from "react-router";
import styles from "./postAd.module.scss";

const PostAd = () => {
  const history = useHistory();
  const goBack = () => {
    history.go(-1);
  };

  const nextPage = () => {
    history.push("/app/ads/confirmAd");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={[styles.arrowContainer, "flex"].join(" ")}>
        <BackArrow onClick={goBack} className={styles.backArrow} />
        <div className={[styles.postAd, "ml-10"].join(" ")}>Post AD</div>
      </div>
      <div className={[styles.postText, "ml-30"].join(" ")}>
        Please enter the details of your purchase and carefully confirm before
        you proceed
      </div>
      <div className={[styles.sellText, "mt-50"].join(" ")}>I want to sell</div>
      <div className={[styles.dropdownInputContainer, "flex"].join(" ")}>
        <select className={styles.dropDown}>
          <option>Currency</option>
        </select>
        <input className={styles.input} placeholder="Amount" />
      </div>
      <div className="flex justify-content-between mb-20">
        <div>
          <div className={styles.sellText}>For</div>
          <select className={styles.dropDown}>
            <option>Currency</option>
          </select>
        </div>
        <div>
          <div className={styles.sellText}>At</div>
          <div>
            <div className={styles.rateBox}>
              <div>Rate</div>
              <div>/Currency</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.referenceText}>Reference rate is 1 CAD= N480</div>
      <div className="flex mt-20 mb-20">
        <div className={[styles.sellText, "mt-15"].join(" ")}>
          Set Respose time
        </div>
        <ToggleButton className="ml-50" />
      </div>
      <div className={styles.timeContainer}>
        <input />
        <select>
          <option>Hours</option>
        </select>
      </div>
      <div className="flex justify-content-center mt-100">
        <Button className={styles.proceedButton} onClick={nextPage}>
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default PostAd;
