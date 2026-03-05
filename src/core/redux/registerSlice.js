import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";
import { all_routes } from "../../routes/all_routes";

/* ===============================
   AXIOS INSTANCE
================================ */
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

/* ===============================
   REQUEST INTERCEPTOR (TOKEN)
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["X-ACCESS-TOKEN"] = token;
    } else {
      delete config.headers["X-ACCESS-TOKEN"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR (401 FIX)
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - Token expired");

      localStorage.removeItem("token");

      // optional redirect
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ===============================
   SIGNUP USER
================================ */
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* ===============================
   INITIAL STATE
================================ */
const initialState = {
  registrationStatus: false,
  token: null,
  user: null,
  registrationError: null,
  loading: false,
};

/* ===============================
   SLICE
================================ */
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.registrationError = null;
        state.registrationStatus = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationStatus = true;
        state.registrationError = null;

        state.token = action.payload?.token || null;
        state.user = action.payload?.user || null;

        // store token for future API calls
        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationError = action.payload;
      });
  },
});

/* ===============================
   EXPORTS
================================ */
export const { clearSignupState } = signupSlice.actions;
export default signupSlice.reducer;