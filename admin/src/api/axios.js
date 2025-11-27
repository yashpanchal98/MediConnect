import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosFormInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {

    const fullUrl = config.baseURL + config.url;

    if (fullUrl.includes("/api/v1/admin")) {
      const aToken = localStorage.getItem("aToken");
      if (aToken) config.headers.Authorization = `Bearer ${aToken}`;
    }

    if (fullUrl.includes("/api/v1/doctor")) {
      const dToken = localStorage.getItem("dToken");
      if (dToken) config.headers.Authorization = `Bearer ${dToken}`;
    }

    return config;
  });
};

addAuthInterceptor(axiosInstance);
addAuthInterceptor(axiosFormInstance);