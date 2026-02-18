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
export const getVehicleRoutePoints = createAsyncThunk(
  "vehicleRoutePoints/getVehicleRoutePoints",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/vehicle-route-points", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleRoutePoint = createAsyncThunk(
  "vehicleRoutePoints/addVehicleRoutePoint",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/vehicle-route-points/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleRoutePoint = createAsyncThunk(
  "vehicleRoutePoints/updateVehicleRoutePoint",
  async ({ route_point_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/vehicle-route-points/edit/${route_point_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleRoutePoint = createAsyncThunk(
  "vehicleRoutePoints/deleteVehicleRoutePoint",
  async (route_point_id, { rejectWithValue }) => {
    try {
      await api.post(
        `/api/vehicle-route-points/delete/${route_point_id}`
      );
      return route_point_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleRoutePointsSlice = createSlice({
  name: "vehicleRoutePoints",
  initialState: {
    routePoints: [],
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
      .addCase(getVehicleRoutePoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleRoutePoints.fulfilled, (state, action) => {
        state.loading = false;
        state.routePoints =
          action.payload?.data?.route_points || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleRoutePoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleRoutePoint.fulfilled, (state, action) => {
        state.success = "Vehicle route point created successfully";
        state.routePoints.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleRoutePoint.fulfilled, (state, action) => {
        state.success = "Vehicle route point updated successfully";
        const updated = action.payload?.data;

        state.routePoints = state.routePoints.map((rp) =>
          rp.route_point_id === updated.route_point_id
            ? updated
            : rp
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleRoutePoint.fulfilled, (state, action) => {
        state.success = "Vehicle route point deleted successfully";
        const deletedId = action.meta.arg;

        state.routePoints = state.routePoints.filter(
          (rp) =>
            Number(rp.route_point_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } =
  vehicleRoutePointsSlice.actions;

export default vehicleRoutePointsSlice.reducer;
