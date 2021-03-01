import axios from 'axios';
import { getDefaultAuth } from 'context/auth';


//TODO: use env for baseURL
const Axios = axios.create({
  baseURL: 'https://rabbi-capital-api.herokuapp.com/api/v1'
});
Axios.interceptors.request.use(
  (config) => {
    const token = getDefaultAuth();
    if (token) config.headers['Authorization'] = getDefaultAuth();
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;
