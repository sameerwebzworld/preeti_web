import axios from "axios";


const createApiClient = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // REQUEST INTERCEPTOR
  // Attach JWT before every request
  api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // RESPONSE INTERCEPTOR
  // Handle expired JWT
  api.interceptors.response.use(
    (response) => {
      return response;
    },(error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          // remove invalid token
          localStorage.removeItem("token");
          // optional: remove user data
          localStorage.removeItem("user");
          // redirect to login
          window.location.href = "/signin";
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
};


export default createApiClient;