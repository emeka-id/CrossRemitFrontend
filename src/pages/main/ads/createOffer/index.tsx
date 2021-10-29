import { BackArrow } from "assets/svg";
import { Button } from "components";
import { IModalRef } from "components/modal";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import styles from "./createOffer.module.scss";
import SuccessModal from "./successModal";

const CreateOffer = () => {
  const modal = useRef<IModalRef>(null);
  const history = useHistory();

  const goBack = () => {
    history.go(-1);
  };

  const confirmation = () => {
    modal.current?.open();
  };

  return (
    <div>
      <div className={[styles.arrowContainer, "flex"].join(" ")}>
        <BackArrow onClick={goBack} className={styles.backArrow} />
        <div className={[styles.back, "ml-10"].join(" ")}>Back</div>
      </div>
      <div className={[styles.topTextContainer].join(" ")}>
        <div className={styles.confirmAd}>Create Offer</div>
        <div className={styles.transactionText}>
          Please enter the desired rate you would like to purchase
        </div>
      </div>
      <div className="flex justify-content-center">
        <div className={styles.innerContainer}>
          <div className={styles.topText}>Looking For</div>
          <input />
          <div className={styles.topText}>Amount</div>
          <input />
          <div className={styles.topText}>In exchange for</div>
          <input />
          <div className={styles.topText}>Rate</div>
          <input />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Button className={styles.sendButton} onClick={confirmation}>
          Send Request
        </Button>
      </div>
      <SuccessModal modal={modal} />
    </div>
  );
};

export default CreateOffer;
