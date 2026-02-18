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
export const getVehicleCollectionPoints = createAsyncThunk(
  "vehicleCollectionPoints/getVehicleCollectionPoints",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/vehicle-collection-points", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/addVehicleCollectionPoint",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/vehicle-collection-points/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/updateVehicleCollectionPoint",
  async ({ collection_point_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/vehicle-collection-points/edit/${collection_point_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/deleteVehicleCollectionPoint",
  async (collection_point_id, { rejectWithValue }) => {
    try {
      await api.post(
        `/api/vehicle-collection-points/delete/${collection_point_id}`
      );
      return collection_point_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleCollectionPointSlice = createSlice({
  name: "vehicleCollectionPoints",
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
      .addCase(getVehicleCollectionPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleCollectionPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data?.vehicles || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleCollectionPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleCollectionPoint.fulfilled, (state, action) => {
        state.success = "Vehicle collection point created successfully";
        state.vehicles.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleCollectionPoint.fulfilled, (state, action) => {
        state.success = "Vehicle collection point updated successfully";
        const updated = action.payload?.data;
        state.vehicles = state.vehicles.map((v) =>
          v.collection_point_id === updated.collection_point_id
            ? updated
            : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleCollectionPoint.fulfilled, (state, action) => {
        state.success = "Vehicle collection point deleted successfully";
        const deletedId = action.meta.arg;
        state.vehicles = state.vehicles.filter(
          (v) =>
            Number(v.collection_point_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleCollectionPointSlice.actions;
export default vehicleCollectionPointSlice.reducer;
