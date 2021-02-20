import { Constants } from 'core/utils/constants'
import { SecureStorage } from 'core/utils/storage'
import React, { createContext, FC, ReactChild, useState } from 'react'

const secureStorage = new SecureStorage();

const initState = {
    auth: secureStorage.getItem(Constants.token),
    setAuthAndCache: (v: string) => {},
    setLogout: () => {}
}
const AuthContext = createContext(initState);
export const AuthProvider = AuthContext.Provider;

export const getDefaultAuth = () => {
  try {
    const token = secureStorage.getItem(Constants.token);
    return token;
  } catch (e) {
    return null
  }
}

//On user logout remove token from localstorage
export const setLogout = () => {
  secureStorage.removeItem(Constants.token)
  window.location.href = '/'
}

interface Props {
    children?: ReactChild | ReactChild[]
}

export const AuthProviderContainer: FC<Props> = ({ children }) => {
  const defaultAuth = getDefaultAuth()
  const [auth, setAuth] = useState<string | null>(defaultAuth)

  const setAuthAndCache = (value: string) => {
    value
      ? secureStorage.storeItem(Constants.token, value)
      : secureStorage.removeItem(Constants.token)

    setAuth(value)
  }

  return (
    <AuthProvider value={{ auth, setAuthAndCache, setLogout }}>
      {children}
    </AuthProvider>
  )
}
export default AuthContext