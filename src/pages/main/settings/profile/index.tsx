import { Button, Card, CustomInput } from "components";
import React, { useContext } from "react";
import styles from "./profile.module.scss";
import profile from "../../../../assets/img/profile.png";

import { useMutation } from "react-query";
import { Loading } from "assets/svg";
import { States } from "./defaults";
import { IUser } from "../../../../types/user";

import UserContext from "../../../../context/user";
import useForm from "core/utils/use-form";
import { UpdateUserApiService } from "core/services/user";
import { IResponse } from "../../../../types/response";
import { AxiosResponse } from "axios";
import { handleError } from "core/utils/error-handler";

const Profile = () => {
  const { mutate, isLoading } = useMutation(UpdateUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUser>>) => {
      const { data } = res.data;
      if (data) {
        updateCurrentUser(data);
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      console.log(response);
    },
  });

  const { currentUser, updateCurrentUser } = useContext(UserContext);

  const submit = () => mutate(inputs);
  const { inputs, handleChange, handleSubmit } = useForm<IUser>(
    currentUser,
    submit
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.profile}>
        <div className="left-column">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className={styles.name_grid}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                defaultValue={currentUser.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                defaultValue={currentUser.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id=""
              defaultValue={currentUser.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="text"
              name="phone"
              defaultValue={currentUser.phone}
              id=""
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              defaultValue={currentUser.gender}
              onChange={handleChange}
              name="gender"
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
              defaultValue={currentUser.country}
              onChange={handleChange}
              name="country"
              id=""
            >
              <option value="default">Select your country</option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              defaultValue={currentUser.state}
              onChange={handleChange}
              name="state"
              id=""
            >
              <option value="default">Select your state</option>
              <option value="Abia">Abia</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="town">Town</label>
            <select
              defaultValue={currentUser.town}
              onChange={handleChange}
              name="town"
              id=""
            >
              <option value="default">Enter your town/city</option>
              <option value="Aba">Aba</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              defaultValue={currentUser.street}
              id=""
              onChange={handleChange}
              placeholder="Enter street address"
            />
          </div>

          <Button type="submit">
            {isLoading ? <Loading /> : "Save Settings"}
          </Button>
        </div>
        <div className="right-column">
          <div className="form-group">
            <label htmlFor="profile_pic">Profile Picture</label>
            <Card variant="outline">
              <div className="flex">
                <div className={styles.image_box}>
                  <img
                    src={
                      currentUser.pic
                        ? `data:image/png;base64,${currentUser.pic}`
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
                />
                {/*<Button variant="outline" className="ml-30">
                Add New
              </Button>*/}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
