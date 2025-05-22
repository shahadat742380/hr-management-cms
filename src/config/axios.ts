import axios from "axios";

// Create a custom axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Keep interceptor registration isolated to client-side only
// This ensures the code is never executed during build time
if (typeof window !== "undefined") {
  // Only executed in browser environment
  axiosInstance.interceptors.request.use(
    (config) => {
      try {
        const organizationId = localStorage.getItem("currentOrgID");
        if (organizationId) {
          config.headers.organizationId = organizationId;
        }
      } catch (error) {
        // Silently handle any localStorage errors
        console.error("Error accessing localStorage:", error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

export default axiosInstance;
