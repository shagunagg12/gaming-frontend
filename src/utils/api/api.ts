import Cookies from "js-cookie"
import axios from 'axios';

  
const  BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
