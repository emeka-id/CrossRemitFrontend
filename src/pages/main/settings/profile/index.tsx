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
  const [state, setState] = useState("");
  const [town, setTown] = useState("");

  const update = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    gender: gender,
    country: country,
    state: state,
    town: town,
  };

  const handleSubmit = () => {
    console.log(update);
  };

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
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <input
              type="text"
              defaultValue={res.lastName}
              placeholder="Last name"
              onChange={(e) => setLastName(e.currentTarget.value)}
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
            onChange={(e) => setDob(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            defaultValue={res.gender}
            onChange={(e) => setGender(e.currentTarget.value)}
            name="select_gender"
            id=""
          >
            <option value="default">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            defaultValue={res.country}
            onChange={(e) => setCountry(e.currentTarget.value)}
            name="select_country"
            id=""
          >
            <option value="default">Select your country</option>
            <option value="Nigeria">Nigeria</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            defaultValue={res.state}
            onChange={(e) => setState(e.currentTarget.value)}
            name="select_state"
            id=""
          >
            <option value="default">Select your state</option>
            <option value="Abia">Abia</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="town">Town</label>
          <select
            onChange={(e) => setTown(e.currentTarget.value)}
            name="select_town"
            id=""
          >
            <option value="default">Enter your town/city</option>
            <option value="Aba">Aba</option>
          </select>
        </div>

        <Button type="submit" onClick={handleSubmit}>
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
