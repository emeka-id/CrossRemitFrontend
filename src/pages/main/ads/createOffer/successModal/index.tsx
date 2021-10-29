import { CloseIcon, SuccessEmoji } from "assets/svg";
import React from "react";
import Button from "../../../../../components/button";
import ConfirmationModal from "../../../../../components/confirmationModal";
import successEmoji from "../../../../../assets/img/success.png";
import styles from "./successModal.module.scss";

interface successModal {
  modal: any;
}

const SuccessModal = ({ modal }: successModal) => {
  return (
    <ConfirmationModal ref={modal}>
      <div className={styles.modalContainer}>
        <div className={styles.closeIcon}>
          <CloseIcon onClick={() => modal.current?.close()} />
        </div>
        <div className="text-center">
          <img src={successEmoji} alt="success-avatar" />
          <h2>Success</h2>
          <div className={styles.successText}>
            Your request has been sent to <br />
            OG Zandy.
            <br /> You will get a response in your notification
          </div>
          <div className={styles.buttonContainer}>
            <Button className={styles.saveButton}>Done</Button>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default SuccessModal;
