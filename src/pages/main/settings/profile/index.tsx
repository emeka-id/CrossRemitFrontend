import { Button, CustomInput } from "components";
import React from "react";
import styles from "./profile.module.scss";
import profile from "../../../../assets/img/profile.png";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className="left-column">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className={styles.name_grid}>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input type="date" name="date_of_birth" id="" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select name="select_gender" id="">
            <option value="default">Select your gender</option>
            <option value="gender_male">Male</option>
            <option value="gender_female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select name="select_country" id="">
            <option value="default">Select your country</option>
            <option value="country_nigeria">Nigeria</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select name="select_state" id="">
            <option value="default">Select your state</option>
            <option value="state_abia">Abia</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="town">Town</label>
          <select name="select_town" id="">
            <option value="default">Enter your town/city</option>
            <option value="town">Aba</option>
          </select>
        </div>
      </div>
      <div className="right-column">
        <div className="form-group">
          <label htmlFor="profile_pic">Profile Picture</label>
          <div className={styles.image_input}>
            <div className={styles.image_box}>
              <img src={profile} alt="" />
            </div>
            <div className={styles.button_box}>
              <Button variant="outline">Add New</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
