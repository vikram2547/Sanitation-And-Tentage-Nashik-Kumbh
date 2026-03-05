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

      // remove invalid token
      localStorage.removeItem("token");

      // redirect to login
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getVehicleMaintenanceLogs = createAsyncThunk(
  "vehicleMaintenanceLogs/getVehicleMaintenanceLogs",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-maintenance-logs", {
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
      const res = await api.post("vehicle-maintenance-logs/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleMaintenanceLog = createAsyncThunk(
  "vehicleMaintenanceLogs/updateVehicleMaintenanceLog",
  async ({ maintenance_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-maintenance-logs/edit/${maintenance_id}`,
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
  async (maintenance_id, { rejectWithValue }) => {
    try {
      await api.post(`vehicle-maintenance-logs/delete/${maintenance_id}`);
      return maintenance_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleMaintenanceLogSlice = createSlice({
  name: "vehicleMaintenanceLogs",
  initialState: {
    maintenanceLogs: [],
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
        state.maintenanceLogs =
          action.payload?.data?.maintenance_logs || [];
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
        if (action.payload?.data) {
          state.maintenanceLogs.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleMaintenanceLog.fulfilled, (state, action) => {
        state.success = "Vehicle maintenance log updated successfully";
        const updated = action.payload?.data;
        if (!updated) return;

        state.maintenanceLogs = state.maintenanceLogs.map((m) =>
          m.maintenance_id === updated.maintenance_id ? updated : m
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleMaintenanceLog.fulfilled, (state, action) => {
        state.success = "Vehicle maintenance log deleted successfully";
        const deletedId = action.meta.arg;

        state.maintenanceLogs = state.maintenanceLogs.filter(
          (m) => Number(m.maintenance_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleMaintenanceLogSlice.actions;
export default vehicleMaintenanceLogSlice.reducer;