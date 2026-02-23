import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";

/* ================= AXIOS ================= */
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["X-ACCESS-TOKEN"] = token;
  return config;
});

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
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
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
        state.trips.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleDailyTripSummary.fulfilled, (state, action) => {
        state.success = "Vehicle daily trip summary updated successfully";
        const updated = action.payload?.data;
        state.trips = state.trips.map((v) =>
          v.daily_trip_summary_id === updated.daily_trip_summary_id
            ? updated
            : v
        );
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
      });
  },
});

export const { clearMessages } =
  vehicleDailyTripSummarySlice.actions;
export default vehicleDailyTripSummarySlice.reducer;
