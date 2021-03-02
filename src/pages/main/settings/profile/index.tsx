import { Button, Card, CustomInput } from "components";
import React, { useState } from "react";
import styles from "./profile.module.scss";
import profile from "../../../../assets/img/profile.png";

import { useQuery, useMutation } from "react-query";
import Axios from "../../../../core/services/axios";
import { Loading } from "assets/svg";
import { UserDetails, States } from "./defaults";

const Profile = () => {
  const [res, setRes] = useState(UserDetails);

  const baseUrl = "https://rabbi-capital-api.herokuapp.com/api/v1/user/me";

  const mutation = useMutation((updateUser) =>
    Axios.patch(baseUrl, updateUser)
  );

  const { isLoading, isError, data, error } = useQuery(
    "getExistingUserInfo",
    async () => {
      const { data } = await Axios.get(`${baseUrl}`);
      setRes({ ...res, ...data.data });
    }
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  console.log(res);

  return (
    <div className={styles.profile}>
      <div className="left-column">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className={styles.name_grid}>
            <input
              type="text"
              defaultValue={res.firstName}
              placeholder="First name"
            />
            <input
              type="text"
              defaultValue={res.lastName}
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            defaultValue={res.dob}
            name="date_of_birth"
            id=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select defaultValue={res.gender} name="select_gender" id="">
            <option value="default">Select your gender</option>
            <option value="gender_male">Male</option>
            <option value="gender_female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select defaultValue={res.country} name="select_country" id="">
            <option value="default">Select your country</option>
            <option value="country_nigeria">Nigeria</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select defaultValue={res.state} name="select_state" id="">
            <option value="default">Select your state</option>
            <option value="state_abia">Abia</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="town">Town</label>
          <select defaultValue={res.town} name="select_town" id="">
            <option value="default">Enter your town/city</option>
            <option value="town">Aba</option>
          </select>
        </div>

        <Button type="submit">
          {mutation.isLoading ? <Loading /> : "Save Settings"}
        </Button>
        {mutation.isLoading ? <label>Saving...</label> : null}
        {mutation.isError ? <label>An error occured {error}...</label> : null}
        {mutation.isSuccess ? <label>Saved...</label> : null}
      </div>
      <div className="right-column">
        <div className="form-group">
          <label htmlFor="profile_pic">Profile Picture</label>
          <Card variant="outline">
            <div className="flex">
              <div className={styles.image_box}>
                <img src={profile} alt="" />
              </div>
              <Button variant="outline" className="ml-30">
                Add New
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
