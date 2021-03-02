import { Constants } from 'core/utils/constants';
import { Role } from 'core/utils/enum';
import { SecureStorage } from 'core/utils/storage';
import React, {
  createContext,
  FC,
  ReactChild,
  useEffect,
  useState,
} from 'react';
import { ISignup, IUser } from 'types/user';

const initState = {
  signUpState: {} as ISignup,
  updateSignupState: (value: object) => {},
  currentUser: {} as IUser,
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
  const [currentUser, setCurrentUser] = useState<IUser>(initState.currentUser);

  useEffect(() => {
    let storedUser = secureStorage.getItem(Constants.currentUser);
    if (typeof storedUser === 'string') setCurrentUser(JSON.parse(storedUser));
  }, []);

  const updateSignupState = (value: object) =>
    setSignUpState((signUpState) => ({ ...signUpState, ...value }));

  const updateCurrentUser = (value: IUser) => {
    if (value)
      secureStorage.storeItem(Constants.currentUser, JSON.stringify(value));
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
