import { EyeIcon, Loading } from "assets/svg";
import { AxiosResponse } from "axios";
import { Button } from "components";
import { ForgotPasswordContext } from "context/forgot-password";
import { ForgotPasswordApiService } from "core/services/user";
import { Page } from "core/utils/constants";
import { handleError } from "core/utils/error-handler";
import useForm from "core/utils/use-form";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { IResponse } from "types/response";
import { IEmail } from "types/user";
import BlueRectangle from "../../../assets/img/blue rectangle.png";
import CrossRemit from "../../../assets/img/crossremit-photo.png";
import Photo from "../../../assets/img/portrait-photo.png";
import styles from "./forgot-password.module.scss";

const ForgotPassword = () => {
  const { storeEmail } = useContext(ForgotPasswordContext);
  let history = useHistory();

  const { mutate, isLoading } = useMutation(ForgotPasswordApiService, {
    onSuccess: (res: AxiosResponse<IResponse>) => {
      const { data } = res;
      toast.success(`${data?.message}`);
      history.push(Page.set_new_password);
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });

  const submit = () => {
    storeEmail(inputs.email);
    mutate(inputs);
  };

  const initState = { email: "" };
  const { inputs, handleChange, handleSubmit } = useForm<IEmail>(
    initState,
    submit
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <img src={CrossRemit} alt="crossremit avatar" />
        <h1>
          Buy and Sell <br />
          FX, Securely.
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
            <h2>Reset Password</h2>
            <div className={[styles.createAccount, "mb-50"].join(" ")}>
              Please enter your registered Email Address
              <br /> to receive a verification code
            </div>
          </div>
          <div className={styles.passwordContainer}>
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="pr-100"
              onChange={handleChange}
            />
            <div className={styles.eyeIconContainer}>
              <EyeIcon />
            </div>
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
            Don’t have an account?{" "}
            <Link to="/auth/signup" className={styles.link}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
