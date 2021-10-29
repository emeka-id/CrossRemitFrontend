import { Loading, YellowLineIcon } from "assets/svg";
import { AxiosResponse } from "axios";
import { Button } from "components";
import { ForgotPasswordContext } from "context/forgot-password";
import { SetNewPasswordApiService } from "core/services/user";
import { Page } from "core/utils/constants";
import { handleError } from "core/utils/error-handler";
import useForm from "core/utils/use-form";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { IResponse } from "types/response";
import { INewPassword } from "types/user";
import BlueRectangle from "../../../assets/img/blue rectangle.png";
import CrossRemit from "../../../assets/img/crossremit-photo.png";
import Photo from "../../../assets/img/portrait-photo.png";
import styles from "./set-new-password.module.scss";

const ChangePassword = () => {
  let [confirmPwd, setConfirmPwd] = useState("");
  let [otp, setOtp] = useState("");

  const { emailAddress } = useContext(ForgotPasswordContext);
  let history = useHistory();
  const { mutate, isLoading } = useMutation(SetNewPasswordApiService, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      toast.success(`${data?.message}`);
      history.push(Page.login);
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () => {
    if (inputs.password !== confirmPwd) {
      toast.error("Password does not match");
      return;
    }
    mutate({ ...inputs, ...{ email: emailAddress } });
  };

  const initState = { email: "", otp: 0, password: "" };
  const { inputs, handleChange, handleSubmit } = useForm<INewPassword>(
    initState,
    submit
  );

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <img src={CrossRemit} alt="crossremit avatar" />
        <h1>
          Save and Secure
          <br />
          Transaction
        </h1>
        <div className={styles.imageContainer}>
          <div className={styles.potrait}>
            <img src={Photo} alt="portrait avatar" />
          </div>
          <div className={styles.rectangle}>
            <img src={BlueRectangle} alt="rectangle" />
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <form className="mt-40" onSubmit={handleSubmit}>
          <div className="text-center">
            <h2>Email Verification</h2>
            <div className={[styles.createAccount, "mb-50"].join(" ")}>
              Please enter the 4 digit code sent to
              <br />
              oyewusimicheal61@gmail.com
            </div>
          </div>
          <div className={styles.otpInputContainer}>
            <OtpInput
              value={otp}
              className={styles.otp_input}
              onChange={handleOtpChange}
              numInputs={4}
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              className={styles.action}
            >
              {isLoading ? <Loading /> : "Proceed"}
            </Button>
          </div>
          <div
            className={[styles.createAccount, "mt-20 text-center"].join(" ")}
          >
            <Link to="/auth/signup" className={styles.link}>
              Resend Code
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
