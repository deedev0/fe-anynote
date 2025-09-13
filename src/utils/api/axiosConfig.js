import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.10.10.12:8080/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
