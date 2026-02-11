import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, POST_API } from "../baseUrl/http";

export const forgotPassword = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}api/auth/forgot-password`,
        data,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY":
            "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Something went wrong"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Request failed"
      );
    }
  }
);

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
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearForgotPasswordState } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
