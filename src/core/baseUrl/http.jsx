// export const API_HOST = " https://tsmonitoring.kashitsolution.com/api/v1/";
// export const defaultHeaders = {
//   "Content-Type": "application/json",
// };

// export const defaultHeadersForSuggestion = {
//   "Content-Type": "multipart/form-data",
// };

// export const GET_API = "GET";
// export const POST_API = "POST";
// export const PUT_API = "PUT";
// export const DELETE_API = "DELETE";
// export const PATCH_API = "PATCH";
import axios from "axios";

export const API_HOST = "https://tsmonitoring.kashitsolution.com/api/v1/";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export const defaultHeadersForSuggestion = {
  "Content-Type": "multipart/form-data",
};

export const GET_API = "GET";
export const POST_API = "POST";
export const PUT_API = "PUT";
export const DELETE_API = "DELETE";
export const PATCH_API = "PATCH";

// ========================================
// AXIOS INSTANCE
// ========================================
const api = axios.create({
  baseURL: API_HOST,
  headers: defaultHeaders,
});

// ========================================
// REQUEST INTERCEPTOR (Attach Token)
// ========================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================================
// RESPONSE INTERCEPTOR (Handle 401)
// ========================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      // remove token
      localStorage.removeItem("token");

      // redirect to signin
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default api;