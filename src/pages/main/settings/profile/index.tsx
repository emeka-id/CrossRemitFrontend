import { Button, Card, CustomInput } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import styles from './profile.module.scss';
import placeholder from '../../../../assets/img/profile-avatar.png';

import { useMutation } from 'react-query';
import { Loading } from 'assets/svg';
import { States, Gender, Country } from './defaults';
import { IUser } from '../../../../types/user';

import UserContext from '../../../../context/user';
import useForm from 'core/utils/use-form';
import { UpdateUserApiService } from 'core/services/user';
import { IResponse } from '../../../../types/response';
import { AxiosResponse } from 'axios';
import { handleError } from 'core/utils/error-handler';
import toast from 'react-hot-toast';
import CustomUpload from 'components/custom-upload';
import CustomDropdown from 'components/custom-dropdown';
import { Iselect } from 'types/inputs';

const Profile = () => {
  const { mutate, isLoading } = useMutation(UpdateUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUser>>) => {
      const { data } = res.data;
      if (data) {
        updateCurrentUser(data);
        toast.success('Profile updated');
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response.message);
    },
  });

  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const submit = () =>
    mutate({ ...inputs, gender: gender, country: country, state: state });
  const { inputs, handleChange, handleSubmit } = useForm<IUser>(
    currentUser,
    submit
  );

  const StateArr: Array<Iselect> = [];
  const CountryArr: Array<Iselect> = [];
  const GenderArr: Array<Iselect> = [];

  const [gender, setGender] = useState(currentUser.gender);
  const [country, setCountry] = useState(currentUser.country);
  const [state, setState] = useState(currentUser.state);

  States.forEach((State: string) => {
    StateArr.push({ name: State, value: State });
  });

  Country.forEach((Country: string) => {
    CountryArr.push({ name: Country, value: Country });
  });

  Gender.forEach((Gender: string) => {
    GenderArr.push({ name: Gender, value: Gender });
  });

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
                id="firstName"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                defaultValue={currentUser.lastName}
                onChange={handleChange}
                id="lastName"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
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
              id="phone"
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <CustomDropdown
              dropdownOption={GenderArr}
              selectedOption={gender ? gender : ''}
              handleChange={(e: string) => setGender(e)}
              placeHolderText="Select gender"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <CustomDropdown
              dropdownOption={CountryArr}
              selectedOption={country ? country : ''}
              handleChange={(e: string) => setCountry(e)}
              placeHolderText="Select country"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <CustomDropdown
              dropdownOption={StateArr}
              selectedOption={state ? state : ''}
              handleChange={(e: string) => setState(e)}
              placeHolderText="Select state"
            />
          </div>
          <div className="form-group">
            <label htmlFor="town">Town</label>
            <input
              defaultValue={currentUser.town}
              onChange={handleChange}
              name="town"
              id="town"
              placeholder="Enter town"
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              defaultValue={currentUser.street}
              id="street"
              onChange={handleChange}
              placeholder="Enter street address"
            />
          </div>

          <Button type="submit" disabled={isLoading ? true : false}>
            {isLoading ? <Loading /> : 'Save Settings'}
          </Button>
        </div>
        <div className="right-column">
          <div className="form-group">
            <label htmlFor="profile_pic">Profile Picture</label>
            <Card variant="outline">
              <div className="flex">
                <img
                  src={inputs.pic ? inputs.pic : currentUser.pic || placeholder}
                  alt="Rabbi profile"
                  className="profile-img medium mr-10"
                />
                <CustomUpload
                  name="pic"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                  label="Add Image"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
