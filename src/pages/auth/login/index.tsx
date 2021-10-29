import { EyeIcon, Loading } from "assets/svg";
import { AxiosResponse } from "axios";
import { Button } from "components";
import AuthContext from "context/auth";
import UserContext from "context/user";
import { LoginApiService } from "core/services/user";
import { Page } from "core/utils/constants";
import { handleError } from "core/utils/error-handler";
import useForm from "core/utils/use-form";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { IResponse } from "types/response";
import { IAuth, ILogin } from "types/user";
import CrossRemit from "../../../assets/img/crossremit-photo.png";
import Photo from "../../../assets/img/portrait-photo.png";
import BlueRectangle from "../../../assets/img/blue rectangle.png";
import styles from "./login.module.scss";

const Login = () => {
  const { setAuthAndCache } = useContext(AuthContext);
  const { updateCurrentUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation(LoginApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IAuth>>) => {
      const { success, data } = res.data;
      if (success && !data.user.suspend && !data.user.ban) {
        setAuthAndCache(`${data?.type} ${data?.token}`);
        updateCurrentUser(data?.user);
        history.push(Page.dashboard);
        return;
      } else if (success && data.user.suspend) {
        history.push(Page.login);
        toast.error(
          `${data.user.firstName} ${data.user.lastName} — your account has been suspended !`
        );
      } else if (success && data.user.ban) {
        history.push(Page.login);
        toast.error(
          `${data.user.firstName} ${data.user.lastName} — your account has been banned !`
        );
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response?.message);
    },
  });
  let history = useHistory();

  const submit = () => mutate(inputs);
  const initState = { email: "", password: "" };
  const { inputs, handleChange, handleSubmit } = useForm<ILogin>(
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
            <h2>Sign in</h2>
            <div className={[styles.createAccount, "mb-50"].join(" ")}>
              Sign in your details as merchant to continue.
            </div>
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
          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              className={styles.action}
            >
              {isLoading ? <Loading /> : "Login"}
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

export default Login;
