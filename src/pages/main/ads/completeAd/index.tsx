import { CompleteAdLogo } from "assets/svg";
import { Button, Card } from "components";
import React from "react";
import { useHistory } from "react-router";
import styles from "./completeAd.module.scss";

const CompleteAd = () => {
  const history = useHistory();

  const viewAd = () => {
    history.push("/app/ads/viewAd");
  };

  const goHome = () => {
    history.push("/app/home");
  };

  return (
    <>
      <div className="flex justify-content-center mt-100">
        <Card className={styles.cardContainer}>
          <div className="text-center mt-100 mb-50">
            <CompleteAdLogo />
          </div>
          <div className={styles.textContainer}>
            <div className="text-center">Your ad has been posted</div>
            <div className="text-center">successfully!</div>
          </div>
        </Card>
      </div>
      <div className="flex justify-content-center">
        <Button className={styles.homeButton} onClick={goHome}>
          Go Back Home
        </Button>
      </div>
      <div className="flex justify-content-center mt-20 mb-50">
        <Button
          className={styles.homeButton}
          variant="outline"
          onClick={viewAd}
        >
          View AD
        </Button>
      </div>
    </>
  );
};

export default CompleteAd;
