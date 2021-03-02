import { Button, Card, CustomInput } from "components";
import React, { useContext, useState } from "react";
import styles from "./profile.module.scss";
import profile from "../../../../assets/img/profile.png";

import { useQuery, useMutation } from "react-query";
import Axios from "../../../../core/services/axios";
import { Loading } from "assets/svg";
import { UserDetails, States } from "./defaults";

import UserContext from "../../../../context/user";

const Profile = () => {
  const baseUrl = "https://rabbi-capital-api.herokuapp.com/api/v1/user/me";

  const mutation = useMutation((updateUser) =>
    Axios.patch(baseUrl, updateUser)
  );

  const user: any = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [imageString, setImageString] = useState<File | string>("");

  const update = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    gender: gender,
    country: country,
    state: state,
    town: town,
    pic: imageString,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReader.bind(this);
      reader.readAsBinaryString(file[0]);
    }
  };

  const _handleReader = (readerEvent: any) => {
    let binaryString = readerEvent.target.result;
    setImageString(btoa(binaryString));
  };

  const handleSubmit = () => {
    console.log(update);
  };

  const { currentUser } = user;

  return (
    <div className={styles.profile}>
      <div className="left-column">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className={styles.name_grid}>
            <input
              type="text"
              placeholder="First name"
              defaultValue={user.currentUser.firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              defaultValue={user.currentUser.lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            id=""
            onChange={(e) => setDob(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
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
        {mutation.isError ? <label>An error occured...</label> : null}
        {mutation.isSuccess ? <label>Saved...</label> : null}
      </div>
      <div className="right-column">
        <div className="form-group">
          <label htmlFor="profile_pic">Profile Picture</label>
          <Card variant="outline">
            <div className="flex">
              <div className={styles.image_box}>
                <img
                  src={
                    user.currentUser.pic
                      ? `data:image/png;base64,${imageString}`
                      : profile
                  }
                  alt=""
                />
              </div>
              <input
                name="profile-pic"
                type="file"
                accept=".png, .jpeg, .jpg"
                className="ml-30"
                onChange={handleImageUpload}
              />
              {/*<Button variant="outline" className="ml-30">
                Add New
              </Button>*/}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
