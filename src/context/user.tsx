import { Role } from 'core/utils/enum';
import React, { createContext, FC, ReactChild, useState } from 'react';
import { ISignup } from 'types/user';

const initState = {
  signUpState: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: Role.Individual,
  },
  updateSignupState: (value: object) => {},
};

const UserContext = createContext(initState);
export const UserProvider = UserContext.Provider;

type Props = {
  children?: ReactChild | ReactChild[];
};

export const UserProviderContainer: FC<Props> = ({ children }) => {
  const [signUpState, setSignUpState] = useState<ISignup>(initState.signUpState);

  const updateSignupState = (value: object) =>
    setSignUpState((signUpState) => ({ ...signUpState, ...value }));

  return (
    <UserProvider value={{ signUpState, updateSignupState }}>
      {children}
    </UserProvider>
  );
};

export default UserContext;
