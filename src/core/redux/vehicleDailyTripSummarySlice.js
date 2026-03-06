import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";
import { all_routes } from "../../routes/all_routes";

/* ================= AXIOS ================= */
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

/* ================= TOKEN INTERCEPTOR ================= */
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

/* ================= 401 HANDLER ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized - Logging out");

      localStorage.removeItem("token");
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getVehicleDailyTripSummaries = createAsyncThunk(
  "vehicleDailyTripSummaries/getVehicleDailyTripSummaries",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-daily-trip-summaries", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to fetch vehicle daily trip summaries"
      );
    }
  }
);

/* ================= ADD ================= */
export const addVehicleDailyTripSummary = createAsyncThunk(
  "vehicleDailyTripSummaries/addVehicleDailyTripSummary",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "vehicle-daily-trip-summaries/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to create vehicle daily trip summary"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleDailyTripSummary = createAsyncThunk(
  "vehicleDailyTripSummaries/updateVehicleDailyTripSummary",
  async ({ daily_trip_summary_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-daily-trip-summaries/edit/${daily_trip_summary_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to update vehicle daily trip summary"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleDailyTripSummary = createAsyncThunk(
  "vehicleDailyTripSummaries/deleteVehicleDailyTripSummary",
  async (daily_trip_summary_id, { rejectWithValue }) => {
    try {
      await api.post(
        `vehicle-daily-trip-summaries/delete/${daily_trip_summary_id}`
      );
      return daily_trip_summary_id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to delete vehicle daily trip summary"
      );
    }
  }
);

/* ================= SLICE ================= */
const vehicleDailyTripSummarySlice = createSlice({
  name: "vehicleDailyTripSummaries",
  initialState: {
    trips: [],
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
      .addCase(getVehicleDailyTripSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleDailyTripSummaries.fulfilled, (state, action) => {
        state.loading = false;

        state.trips = action.payload?.data?.trips || [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleDailyTripSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleDailyTripSummary.fulfilled, (state, action) => {
        state.success = "Vehicle daily trip summary created successfully";

        if (action.payload?.data) {
          state.trips.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })

      .addCase(addVehicleDailyTripSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ===== UPDATE ===== */
      .addCase(updateVehicleDailyTripSummary.fulfilled, (state, action) => {
        state.success = "Vehicle daily trip summary updated successfully";

        const updated = action.payload?.data;

        if (updated) {
          state.trips = state.trips.map((v) =>
            Number(v.daily_trip_summary_id) ===
              Number(updated.daily_trip_summary_id)
              ? updated
              : v
          );
        }
      })

      .addCase(updateVehicleDailyTripSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleDailyTripSummary.fulfilled, (state, action) => {
        state.success = "Vehicle daily trip summary deleted successfully";

        const deletedId = action.meta.arg;

        state.trips = state.trips.filter(
          (v) =>
            Number(v.daily_trip_summary_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })

      .addCase(deleteVehicleDailyTripSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { clearMessages } =
  vehicleDailyTripSummarySlice.actions;

export default vehicleDailyTripSummarySlice.reducer;