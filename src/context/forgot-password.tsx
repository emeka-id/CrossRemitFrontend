import React, {
  createContext,
  useState,
  useEffect,
  ReactChild,
  FC,
} from 'react';
const initState = {
  emailAddress: '',
  storeEmail: (value: string) => {},
};

export const ForgotPasswordContext = createContext(initState);

type Props = {
  children?: ReactChild | ReactChild[];
};

const ForgotPasswordProvider: FC<Props> = ({ children }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const storeEmail = (email: string) => {
    setEmailAddress(email);
  };
  return (
    <ForgotPasswordContext.Provider value={{ emailAddress, storeEmail }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};
export default ForgotPasswordProvider;
