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
export const getVehicleMaintenanceLogs = createAsyncThunk(
  "vehicleMaintenanceLogs/getVehicleMaintenanceLogs",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/vehicle-maintenance-logs", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleMaintenanceLog = createAsyncThunk(
  "vehicleMaintenanceLogs/addVehicleMaintenanceLog",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/vehicle-maintenance-logs/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleMaintenanceLog = createAsyncThunk(
  "vehicleMaintenanceLogs/updateVehicleMaintenanceLog",
  async ({ maintenance_log_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/vehicle-maintenance-logs/edit/${maintenance_log_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleMaintenanceLog = createAsyncThunk(
  "vehicleMaintenanceLogs/deleteVehicleMaintenanceLog",
  async (maintenance_log_id, { rejectWithValue }) => {
    try {
      await api.post(
        `/api/vehicle-maintenance-logs/delete/${maintenance_log_id}`
      );
      return maintenance_log_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleMaintenanceLogSlice = createSlice({
  name: "vehicleMaintenanceLogs",
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
      .addCase(getVehicleMaintenanceLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleMaintenanceLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data?.vehicles || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleMaintenanceLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleMaintenanceLog.fulfilled, (state, action) => {
        state.success = "Vehicle maintenance log created successfully";
        state.vehicles.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleMaintenanceLog.fulfilled, (state, action) => {
        state.success = "Vehicle maintenance log updated successfully";
        const updated = action.payload?.data;
        state.vehicles = state.vehicles.map((v) =>
          v.maintenance_log_id === updated.maintenance_log_id
            ? updated
            : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleMaintenanceLog.fulfilled, (state, action) => {
        state.success = "Vehicle maintenance log deleted successfully";
        const deletedId = action.meta.arg;
        state.vehicles = state.vehicles.filter(
          (v) =>
            Number(v.maintenance_log_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } =
  vehicleMaintenanceLogSlice.actions;
export default vehicleMaintenanceLogSlice.reducer;
