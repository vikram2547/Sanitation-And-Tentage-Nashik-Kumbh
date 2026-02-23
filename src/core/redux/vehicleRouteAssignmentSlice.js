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
export const getVehicleRouteAssignments = createAsyncThunk(
  "vehicleRouteAssignments/getVehicleRouteAssignments",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-route-assignments", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addVehicleRouteAssignment = createAsyncThunk(
  "vehicleRouteAssignments/addVehicleRouteAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "vehicle-route-assignments/new",
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleRouteAssignment = createAsyncThunk(
  "vehicleRouteAssignments/updateVehicleRouteAssignment",
  async ({ route_assignment_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-route-assignments/edit/${route_assignment_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleRouteAssignment = createAsyncThunk(
  "vehicleRouteAssignments/deleteVehicleRouteAssignment",
  async (route_assignment_id, { rejectWithValue }) => {
    try {
      await api.post(
        `vehicle-route-assignments/delete/${route_assignment_id}`
      );
      return route_assignment_id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const vehicleRouteAssignmentSlice = createSlice({
  name: "vehicleRouteAssignments",
  initialState: {
    assignments: [],
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
      .addCase(getVehicleRouteAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleRouteAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments  = action.payload?.data?.assignments  || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVehicleRouteAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVehicleRouteAssignment.fulfilled, (state, action) => {
        state.success =
          "Vehicle route assignment created successfully";
        state.assignments.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleRouteAssignment.fulfilled, (state, action) => {
        state.success =
          "Vehicle route assignment updated successfully";
        const updated = action.payload?.data;
        state.assignments = state.assignments.map((v) =>
          v.route_assignment_id === updated.route_assignment_id
            ? updated
            : v
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleRouteAssignment.fulfilled, (state, action) => {
        state.success =
          "Vehicle route assignment deleted successfully";
        const deletedId = action.meta.arg;
        state.assignments = state.assignments.filter(
          (v) =>
            Number(v.route_assignment_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } =
  vehicleRouteAssignmentSlice.actions;
export default vehicleRouteAssignmentSlice.reducer;
