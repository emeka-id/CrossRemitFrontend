import { EyeIcon, Loading } from "assets/svg";
import { AxiosResponse } from "axios";
import { Button } from "components";
import UserContext from "context/user";
import { CheckUserApiService } from "core/services/user";
import { Page } from "core/utils/constants";
import { handleError } from "core/utils/error-handler";
import useForm from "core/utils/use-form";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { IResponse } from "types/response";
import { ISignup } from "types/user";
import BlueRectangle from "../../../assets/img/lightBlue Rectangle.png";
import CrossRemit from "../../../assets/img/crossremit-photo.png";
import FemalePhoto from "../../../assets/img/female Potrait.png";
import BigRectangle from "../../../assets/img/Big Rectangle.png";
import styles from "./signup.module.scss";

const Signup = () => {
  const { signUpState, updateSignupState } = useContext(UserContext);
  let history = useHistory();
  const { mutate, isLoading } = useMutation(CheckUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<null>>) => {
      const { success } = res.data;
      if (success) {
        updateSignupState(inputs);
        history.push(Page.verify);
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response.message);
    },
  });

  const submit = () => mutate(inputs);
  const { inputs, handleChange, handleSubmit } = useForm<ISignup>(
    signUpState,
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
            <div className={styles.bigRectangle}>
              <img src={BigRectangle} alt="big rectangle" />
            </div>
            <div>
              <img
                src={FemalePhoto}
                alt="portrait avatar"
                className={styles.femalePotrait}
              />
            </div>
            <div className={styles.rectangle}>
              <img src={BlueRectangle} alt="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <form className="mt-40" onSubmit={handleSubmit}>
          <div className="text-center">
            <h2>Sign up</h2>
            <div className={[styles.createAccount, "mb-50"].join(" ")}>
              Sign up your details as merchant to continue.
            </div>
          </div>
          <div>
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="lastName"
              type="email"
              required
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="phone"
              type="text"
              required
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>
          <div className={styles.passwordContainer}>
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="pr-100"
              onChange={handleChange}
            />
            <div className={styles.eyeIconContainer}>
              <EyeIcon />
            </div>
          </div>
          <div className={styles.checkBoxTextContainer}>
            <input type="checkbox" className={styles.checkboxContainer} />
            <div className={styles.forgotPassword}>
              I have read the{" "}
              <Link to="/auth/forgot-password">user agreement</Link> and i
              accept it
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              className={styles.action}
            >
              {isLoading ? <Loading /> : "Create an Account"}
            </Button>
          </div>
          <div
            className={[styles.createAccount, "mt-20 text-center"].join(" ")}
          >
            Already have an account?{" "}
            <Link to="/auth/login" className={styles.link}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
