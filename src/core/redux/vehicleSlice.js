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

  if (token) {
    config.headers["X-ACCESS-TOKEN"] = token;
  }

  return config;
});

/* ================= RESPONSE INTERCEPTOR (401 FIX) ================= */
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

/* ================= GET ================= */
export const getVehicles = createAsyncThunk(
  "vehicles/getVehicles",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicles", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicle = createAsyncThunk(
  "vehicles/addVehicle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("vehicles/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicle = createAsyncThunk(
  "vehicles/updateVehicle",
  async ({ vehicle_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`vehicles/edit/${vehicle_id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (vehicle_id, { rejectWithValue }) => {
    try {
      await api.post(`vehicles/delete/${vehicle_id}`);
      return vehicle_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleSlice = createSlice({
  name: "vehicles",
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
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data?.vehicles || [];
        state.totalRecords = action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.success = "Vehicle created successfully";
        state.vehicles.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.success = "Vehicle updated successfully";

        const updated = action.payload?.data;

        state.vehicles = state.vehicles.map((v) =>
          v.vehicle_id === updated.vehicle_id ? updated : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.success = "Vehicle deleted successfully";

        const deletedId = action.meta.arg;

        state.vehicles = state.vehicles.filter(
          (v) => Number(v.vehicle_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleSlice.actions;

export default vehicleSlice.reducer;