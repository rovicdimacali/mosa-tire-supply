import axios from "axios";
import router from "../router";

// Instance for normal requests
export const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

instance.interceptors.request.use(
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

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error here (e.g., logout the user)
      // Example: You can call a function to perform logout
      localStorage.removeItem("userID");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("groups");
      router.push("/");
    }
    return Promise.reject(error);
  }
);
