import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});