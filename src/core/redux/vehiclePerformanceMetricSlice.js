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

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["X-ACCESS-TOKEN"] = token;
  return config;
});

/* ================= RESPONSE INTERCEPTOR (401 FIX) ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("401 Unauthorized - Session expired");

      // remove token
      localStorage.removeItem("token");

      // redirect to login
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getVehiclePerformanceMetrics = createAsyncThunk(
  "vehiclePerformanceMetrics/getVehiclePerformanceMetrics",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-performance-metrics", {
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
        "vehicle-performance-metrics/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add performance metrics"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehiclePerformanceMetric = createAsyncThunk(
  "vehiclePerformanceMetrics/updateVehiclePerformanceMetric",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-performance-metrics/edit/${id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update performance metrics"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehiclePerformanceMetric = createAsyncThunk(
  "vehiclePerformanceMetrics/deleteVehiclePerformanceMetric",
  async (metric_id, { rejectWithValue }) => {
    try {
      await api.post(
        `vehicle-performance-metrics/delete/${metric_id}`
      );
      return metric_id;
    } catch (e) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete performance metrics"
      );
    }
  }
);

/* ================= SLICE ================= */
const vehiclePerformanceMetricSlice = createSlice({
  name: "vehiclePerformanceMetrics",
  initialState: {
    metrics: [],
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
        state.error = null;
      })
      .addCase(getVehiclePerformanceMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = Array.isArray(action.payload?.data?.metrics)
          ? action.payload.data.metrics
          : [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehiclePerformanceMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehiclePerformanceMetric.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          "Vehicle performance metric created successfully";

        if (action.payload?.data) {
          state.metrics.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addVehiclePerformanceMetric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ===== UPDATE ===== */
      .addCase(updateVehiclePerformanceMetric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "Vehicle performance metric updated successfully";

        const updated = action.payload?.data;

        if (updated) {
          const index = state.metrics.findIndex(
            (v) => v.metric_id === updated.metric_id
          );
          if (index !== -1) {
            state.metrics[index] = updated;
          }
        }
      })
      .addCase(updateVehiclePerformanceMetric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      /* ===== DELETE ===== */
      .addCase(deleteVehiclePerformanceMetric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehiclePerformanceMetric.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          "Vehicle performance metric deleted successfully";

        const deletedId = action.meta.arg;

        state.metrics = state.metrics.filter(
          (v) =>
            Number(v.performance_metric_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      })
      .addCase(deleteVehiclePerformanceMetric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearMessages } =
  vehiclePerformanceMetricSlice.actions;
export default vehiclePerformanceMetricSlice.reducer;