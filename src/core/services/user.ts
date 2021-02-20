import Axios from './axios';

export const LoginApiService = (credentials: object) => {
  return Axios.post('/auth/login', credentials);
};
