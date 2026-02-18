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
export const getVehiclePerformanceMetrics = createAsyncThunk(
  "vehiclePerformanceMetrics/getVehiclePerformanceMetrics",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/vehicle-performance-metrics", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehiclePerformanceMetric = createAsyncThunk(
  "vehiclePerformanceMetrics/addVehiclePerformanceMetric",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/vehicle-performance-metrics/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehiclePerformanceMetric = createAsyncThunk(
  "vehiclePerformanceMetrics/updateVehiclePerformanceMetric",
  async ({ performance_metric_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/vehicle-performance-metrics/edit/${performance_metric_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehiclePerformanceMetric = createAsyncThunk(
  "vehiclePerformanceMetrics/deleteVehiclePerformanceMetric",
  async (performance_metric_id, { rejectWithValue }) => {
    try {
      await api.post(
        `/api/vehicle-performance-metrics/delete/${performance_metric_id}`
      );
      return performance_metric_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehiclePerformanceMetricSlice = createSlice({
  name: "vehiclePerformanceMetrics",
  initialState: {
    vehicles: [],
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
      .addCase(getVehiclePerformanceMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehiclePerformanceMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data?.vehicles || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehiclePerformanceMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.success =
          "Vehicle performance metric created successfully";
        state.vehicles.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.success =
          "Vehicle performance metric updated successfully";
        const updated = action.payload?.data;
        state.vehicles = state.vehicles.map((v) =>
          v.performance_metric_id === updated.performance_metric_id
            ? updated
            : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.success =
          "Vehicle performance metric deleted successfully";
        const deletedId = action.meta.arg;
        state.vehicles = state.vehicles.filter(
          (v) =>
            Number(v.performance_metric_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } =
  vehiclePerformanceMetricSlice.actions;
export default vehiclePerformanceMetricSlice.reducer;
