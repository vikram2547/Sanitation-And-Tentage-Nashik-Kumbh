import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, POST_API } from "../baseUrl/http";

// ✅ Async Thunk for Verify OTP
export const verifyOtp = createAsyncThunk(
    "verifyOtp/verifyOtpUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: POST_API,
                url: `${API_HOST}api/auth/verify-otp`,
                data,
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

const verifyOtpSlice = createSlice({
    name: "verifyOtp",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        clearVerifyOtpState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearVerifyOtpState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
