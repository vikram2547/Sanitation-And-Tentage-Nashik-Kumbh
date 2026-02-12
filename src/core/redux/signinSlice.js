import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, POST_API } from "../baseUrl/http";

/* ================= LOGIN ================= */

export const signinUser = createAsyncThunk(
  "signin/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: POST_API,
        url: `${API_HOST}api/auth/login`,
        data,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed"
      );
    }
  }
);

/* ================= INITIAL STATE ================= */

const initialState = {
  loading: false,
  loginSuccess: false,
  twoFactorRequired: false,
  user: null,
  token: null,
  loginError: null,
};

/* ================= SLICE ================= */

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    clearSigninState: (state) => {
      state.loading = false;
      state.loginSuccess = false;
      state.twoFactorRequired = false;
      state.loginError = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginSuccess = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== LOGIN ===== */
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          const data = action.payload.data;

          if (data.two_factor_required) {
            state.twoFactorRequired = true;
            state.user = data.user;
          } else {
            state.loginSuccess = true;
            state.token = data.access_token;
            state.user = data.user;

            // Store token
            localStorage.setItem("token", data.access_token);
          }
        } else {
          state.loginError = action.payload.message;
        }
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      });
  },
});

export const { clearSigninState, logout } = signinSlice.actions;
export default signinSlice.reducer;
