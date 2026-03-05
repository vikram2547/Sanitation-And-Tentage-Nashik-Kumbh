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
export const getVehicleRoutes = createAsyncThunk(
  "vehicleRoutes/getVehicleRoutes",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-routes", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleRoute = createAsyncThunk(
  "vehicleRoutes/addVehicleRoute",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("vehicle-routes/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleRoute = createAsyncThunk(
  "vehicleRoutes/updateVehicleRoute",
  async ({ route_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`vehicle-routes/edit/${route_id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleRoute = createAsyncThunk(
  "vehicleRoutes/deleteVehicleRoute",
  async (route_id, { rejectWithValue }) => {
    try {
      await api.post(`vehicle-routes/delete/${route_id}`);
      return route_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleRouteSlice = createSlice({
  name: "vehicleRoutes",
  initialState: {
    vehicleRoutes: [],
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
      .addCase(getVehicleRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleRoutes = action.payload?.data?.routes || [];
        state.totalRecords = action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleRoute.fulfilled, (state, action) => {
        state.success = "Vehicle route created successfully";
        state.vehicleRoutes.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleRoute.fulfilled, (state, action) => {
        state.success = "Vehicle route updated successfully";

        const updated = action.payload?.data;

        state.vehicleRoutes = state.vehicleRoutes.map((v) =>
          v.route_id === updated.route_id ? updated : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleRoute.fulfilled, (state, action) => {
        state.success = "Vehicle route deleted successfully";

        const deletedId = action.meta.arg;

        state.vehicleRoutes = state.vehicleRoutes.filter(
          (v) => Number(v.route_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = vehicleRouteSlice.actions;

export default vehicleRouteSlice.reducer;