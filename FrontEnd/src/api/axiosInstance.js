import axios from "axios";
import toast from "react-hot-toast";

const APIURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: APIURL, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
