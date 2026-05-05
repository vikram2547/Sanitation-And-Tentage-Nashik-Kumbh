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

            window.location.href = all_routes.signin;
        }

        return Promise.reject(error);
    }
);

/* ================= GET SANITATION REGISTRATION REPORT ================= */
export const getSanitationRegistrationSectorWise = createAsyncThunk(
    "sanitationregistrationrsectorwise/getSanitationRegistrationSectorWise",
    async ({ page, per_page }, { rejectWithValue }) => {
        try {
            const response = await api.get("sanitation-report/sector-registrations", {
                params: {
                    page,
                    per_page,
                    keywords: "",
                    status: "",
                    order_by_col: "sanitation_asset_id",
                    order_by: "DESC",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch reports"
            );
        }
    }
);

/* ================= SLICE ================= */
const sanitationRegistrationSectorWiseSlice = createSlice({
    name: "sanitationRegistrationSectorWise",
    initialState: {
        sanitationRegistrationSectorWise: [],
        totalRecords: 0,
        loading: false,
        success: null,
        error: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            /* ===== GET ===== */
            .addCase(getSanitationRegistrationSectorWise.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSanitationRegistrationSectorWise.fulfilled, (state, action) => {
                state.loading = false;

                state.sanitationRegistrationSectorWise = Array.isArray(action.payload?.data?.assets)
                    ? action.payload.data.assets
                    : [];

                state.totalRecords =
                    action.payload?.data?.paging?.totalrecords || 0;
            })
            .addCase(getSanitationRegistrationSectorWise.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearMessages } = sanitationRegistrationSectorWiseSlice.actions;

export default sanitationRegistrationSectorWiseSlice.reducer;