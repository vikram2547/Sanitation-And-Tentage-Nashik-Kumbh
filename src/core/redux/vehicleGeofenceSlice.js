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
export const getVehicleGeofences = createAsyncThunk(
  "vehicleGeofences/getVehicleGeofences",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/vehicle-geofences", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleGeofence = createAsyncThunk(
  "vehicleGeofences/addVehicleGeofence",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/vehicle-geofences/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleGeofence = createAsyncThunk(
  "vehicleGeofences/updateVehicleGeofence",
  async ({ geofence_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/vehicle-geofences/edit/${geofence_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleGeofence = createAsyncThunk(
  "vehicleGeofences/deleteVehicleGeofence",
  async (geofence_id, { rejectWithValue }) => {
    try {
      await api.post(`/api/vehicle-geofences/delete/${geofence_id}`);
      return geofence_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleGeofenceSlice = createSlice({
  name: "vehicleGeofences",
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
      .addCase(getVehicleGeofences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleGeofences.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data?.vehicles || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleGeofences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleGeofence.fulfilled, (state, action) => {
        state.success = "Vehicle geofence created successfully";
        state.vehicles.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleGeofence.fulfilled, (state, action) => {
        state.success = "Vehicle geofence updated successfully";
        const updated = action.payload?.data;
        state.vehicles = state.vehicles.map((v) =>
          v.geofence_id === updated.geofence_id ? updated : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleGeofence.fulfilled, (state, action) => {
        state.success = "Vehicle geofence deleted successfully";
        const deletedId = action.meta.arg;
        state.vehicles = state.vehicles.filter(
          (v) => Number(v.geofence_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleGeofenceSlice.actions;
export default vehicleGeofenceSlice.reducer;
