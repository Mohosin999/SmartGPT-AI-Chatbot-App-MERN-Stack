import axios from "axios";
import { store } from "@/store/store";
import { refreshAccessToken } from "@/features/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor — attach access token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh thunk directly
        await store.dispatch(refreshAccessToken());

        // Retry original request with new access token
        const newAccessToken = localStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh failed — logout user
        console.error(err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        store.dispatch({ type: "auth/logoutUser" });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
