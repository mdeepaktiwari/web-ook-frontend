import axios from "axios";
import { getItemFromLocalStorage } from "./src/utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    let token = getItemFromLocalStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
