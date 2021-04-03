import axios from 'axios';
import { getDefaultAuth } from 'context/auth';

//TODO: use env for baseURL
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});
Axios.interceptors.request.use(
  (config) => {
    const token = getDefaultAuth();
    if (token) config.headers['Authorization'] = token;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;
