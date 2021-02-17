import React from 'react';
import styles from './profile.module.scss';

const Profile = () => {
  return (
    <div>
      <div className={styles.profile}>
        <div>
          Name
                <div>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
                Date of Birth
                <input type="date" name="date-of-birth" id="" />
                Gender
                <select name="select-gender" id="">
            <option value="select-gender">Select your gender</option>
            <option value="gender-male">Male</option>
            <option value="gender-female">Female</option>
          </select>
                Country
                <select name="select-country" id="">
            <option value="select-country">Select your country</option>
          </select>
                State
                <select name="select-state" id="">
            <option value="select-state">Select your state</option>
          </select>
                Town
                <select name="select-town" id="">
            <option value="select-town">Enter your town/city</option>
          </select>
        </div>
        <div>
          Profile Picture
                <input type="file" name="Add-New" id="" placeholder="Add New" />
        </div>
      </div>
    </div>
  )
}

export default Profile
