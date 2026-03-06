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

/* ================= ATTACH TOKEN ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["X-ACCESS-TOKEN"] = token;
    } else {
      delete config.headers["X-ACCESS-TOKEN"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= HANDLE 401 ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized - Redirecting to login");

      localStorage.removeItem("token");
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getVehicleCollectionPoints = createAsyncThunk(
  "vehicleCollectionPoints/getVehicleCollectionPoints",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("vehicle-collection-points", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch collection points"
      );
    }
  }
);

/* ================= ADD ================= */
export const addVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/addVehicleCollectionPoint",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("vehicle-collection-points/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to create collection point"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/updateVehicleCollectionPoint",
  async ({ collection_point_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `vehicle-collection-points/edit/${collection_point_id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update collection point"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteVehicleCollectionPoint = createAsyncThunk(
  "vehicleCollectionPoints/deleteVehicleCollectionPoint",
  async (collection_point_id, { rejectWithValue }) => {
    try {
      await api.post(
        `vehicle-collection-points/delete/${collection_point_id}`
      );
      return collection_point_id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete collection point"
      );
    }
  }
);

/* ================= SLICE ================= */
const vehicleCollectionPointSlice = createSlice({
  name: "vehicleCollectionPoints",
  initialState: {
    collectionPoints: [],
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
        state.collectionPoints = action.payload?.data?.vehicles || [];
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
        state.collectionPoints.unshift(action.payload?.data);
        state.totalRecords += 1;
      })

      .addCase(addVehicleCollectionPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVehicleCollectionPoint.fulfilled, (state, action) => {
        state.success = "Vehicle collection point updated successfully";

        const updated = action.payload?.data;

        state.collectionPoints = state.collectionPoints.map((v) =>
          Number(v.collection_point_id) === Number(updated.collection_point_id)
            ? updated
            : v
        );
      })

      .addCase(updateVehicleCollectionPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteVehicleCollectionPoint.fulfilled, (state, action) => {
        state.success = "Vehicle collection point deleted successfully";

        const deletedId = action.meta.arg;

        state.collectionPoints = state.collectionPoints.filter(
          (v) => Number(v.collection_point_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteVehicleCollectionPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearMessages } = vehicleCollectionPointSlice.actions;
export default vehicleCollectionPointSlice.reducer;