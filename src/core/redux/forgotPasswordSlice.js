import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, POST_API } from "../baseUrl/http";
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
   RESPONSE INTERCEPTOR (401 LOGOUT)
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = all_routes.signin;
    }
    return Promise.reject(error);
  }
);

/* ================= SEND OTP ================= */
export const forgotPassword = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        method: POST_API,
        url: "auth/forgot-password",
        data,
      });

      if (response?.data?.success) {
        return response.data;
      }

      return rejectWithValue(
        response?.data?.message || "Something went wrong"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Request failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    success: false,
    message: null,
    error: null,
  },

  reducers: {
    clearForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== PENDING ===== */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      /* ===== SUCCESS ===== */
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "OTP sent successfully";
      })

      /* ===== ERROR ===== */
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearForgotPasswordState } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;