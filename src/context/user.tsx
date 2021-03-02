import { Constants } from 'core/utils/constants';
import { Role } from 'core/utils/enum';
import { SecureStorage } from 'core/utils/storage';
import React, { createContext, FC, ReactChild, useState } from 'react';
import { ISignup, IUser } from 'types/user';

const initState = {
  signUpState: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: Role.Individual,
  },
  updateSignupState: (value: object) => {},
  currentUser: {} || null,
  updateCurrentUser: (value: IUser) => {},
};

const secureStorage = new SecureStorage();
const UserContext = createContext(initState);
export const UserProvider = UserContext.Provider;

type Props = {
  children?: ReactChild | ReactChild[];
};

export const UserProviderContainer: FC<Props> = ({ children }) => {
  const [signUpState, setSignUpState] = useState<ISignup>(
    initState.signUpState
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const updateSignupState = (value: object) =>
    setSignUpState((signUpState) => ({ ...signUpState, ...value }));

  const updateCurrentUser = (value: IUser) => {
    if (value) secureStorage.storeItem(Constants.currentUser, JSON.stringify(value));
    setCurrentUser((currentUser) => ({ ...currentUser, ...value }));
  };

  return (
    <UserProvider
      value={{ signUpState, updateSignupState, currentUser, updateCurrentUser }}
    >
      {children}
    </UserProvider>
  );
};

export default UserContext;
