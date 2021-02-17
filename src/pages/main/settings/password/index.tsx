import { Button, CustomInput } from "components";
import React from "react";
import styles from "./password.module.scss";

const Password = () => {
  return (
    <div className={styles.password}>
      <div className="form-group">
        <label htmlFor="change_password" className={styles.mb_20}>
          Change Password
        </label>
        <input
          type="password"
          name="old_password"
          id=""
          placeholder="Old Password"
          className={styles.mb_20}
        />
        <input
          type="password"
          name="new_password"
          id=""
          placeholder="New Password"
          className={styles.mb_20}
        />
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Password;
