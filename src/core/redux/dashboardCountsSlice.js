import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";
import { all_routes } from "../../routes/all_routes";

// ===============================
// AXIOS INSTANCE
// ===============================
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

// ===============================
// TOKEN ATTACH
// ===============================
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

// ===============================
// GLOBAL 401 HANDLER
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized - Redirecting to login");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

// ========================
// GET COUNTS
// ========================
export const getCounts = createAsyncThunk(
  "counts/getCounts",
  async ({ date }, { rejectWithValue }) => {
    try {
      const response = await api.get("/sanitation-dashboard", {
        params: { date },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch counts"
      );
    }
  }
);

// ========================
// SLICE
// ========================
const dashboardCountsSlice = createSlice({
  name: "counts",
  initialState: {
    counts: [],        // by_asset_type
    data: {},          // summary counts
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== GET COUNTS =====
      .addCase(getCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCounts.fulfilled, (state, action) => {
        state.loading = false;

        // STORE SUMMARY DATA
        state.data = action.payload?.data || {};

        // STORE ASSET TYPE DATA
        state.counts = action.payload?.data?.by_asset_type || [];

        state.success = action.payload?.message;
      })

      .addCase(getCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = dashboardCountsSlice.actions;
export default dashboardCountsSlice.reducer;