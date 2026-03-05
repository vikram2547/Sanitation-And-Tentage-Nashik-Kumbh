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

      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getVehicleGpsTracking = createAsyncThunk(
  "vehicleGpsTracking/getVehicleGpsTracking",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-gps-tracking", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleGpsTracking = createAsyncThunk(
  "vehicleGpsTracking/addVehicleGpsTracking",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("vehicle-gps-tracking/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleGpsTracking = createAsyncThunk(
  "vehicleGpsTracking/updateVehicleGpsTracking",
  async ({ gps_tracking_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-gps-tracking/edit/${gps_tracking_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleGpsTracking = createAsyncThunk(
  "vehicleGpsTracking/deleteVehicleGpsTracking",
  async (gps_tracking_id, { rejectWithValue }) => {
    try {
      await api.post(`vehicle-gps-tracking/delete/${gps_tracking_id}`);
      return gps_tracking_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleGpsTrackingSlice = createSlice({
  name: "vehicleGpsTracking",
  initialState: {
    tracking: [],
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
      .addCase(getVehicleGpsTracking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleGpsTracking.fulfilled, (state, action) => {
        state.loading = false;

        state.tracking = action.payload?.data?.tracking || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;

        state.success = action.payload?.message || null;
      })
      .addCase(getVehicleGpsTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleGpsTracking.fulfilled, (state, action) => {
        state.success = "Vehicle GPS tracking created successfully";
        if (action.payload?.data) {
          state.tracking.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleGpsTracking.fulfilled, (state, action) => {
        state.success = "Vehicle GPS tracking updated successfully";
        const updated = action.payload?.data;

        if (updated) {
          state.tracking = state.tracking.map((v) =>
            v.gps_tracking_id === updated.gps_tracking_id ? updated : v
          );
        }
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleGpsTracking.fulfilled, (state, action) => {
        state.success = "Vehicle GPS tracking deleted successfully";
        const deletedId = action.payload;

        state.tracking = state.tracking.filter(
          (v) => String(v.gps_tracking_id) !== String(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleGpsTrackingSlice.actions;
export default vehicleGpsTrackingSlice.reducer;