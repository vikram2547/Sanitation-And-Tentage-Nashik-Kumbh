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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["X-ACCESS-TOKEN"] = token;
    else delete config.headers["X-ACCESS-TOKEN"];
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - Token expired");
      localStorage.removeItem("token");
      window.location.href = "/signin"; // change this if using route constant
    }
    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getSanitationAssetsAllocation = createAsyncThunk(
  "sanitationAssetsAllocation/getSanitationAssetsAllocation",
  async ({ page = 1, per_page = 25 }, { rejectWithValue }) => {
    try {
      // NOTE: API expects singular 'sanitation-asset-allocations' not plural
      const res = await api.get("sanitation-asset-allocations", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          "Failed to fetch sanitation assets allocation"
      );
    }
  }
);

/* ================= ADD ================= */
export const addSanitationAssetAllocation = createAsyncThunk(
  "sanitationAssetsAllocation/addSanitationAssetAllocation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("sanitation-asset-allocations/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          "Failed to add sanitation asset allocation"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateSanitationAssetAllocation = createAsyncThunk(
  "sanitationAssetsAllocation/updateSanitationAssetAllocation",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `sanitation-asset-allocations/edit/${id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          "Failed to update sanitation asset allocation"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteSanitationAssetAllocation = createAsyncThunk(
  "sanitationAssetsAllocation/deleteSanitationAssetAllocation",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.post(`sanitation-asset-allocations/delete/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          "Failed to delete sanitation asset allocation"
      );
    }
  }
);

/* ================= SLICE ================= */
const sanitationAssetAllocationSlice = createSlice({
  name: "sanitationAssetsAllocation",
  initialState: {
    sanitationAssetsAllocation: [],
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
      .addCase(getSanitationAssetsAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSanitationAssetsAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.sanitationAssetsAllocation =
          action.payload?.data?.sanitation_asset_allocations || [];
        state.totalRecords = action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getSanitationAssetsAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addSanitationAssetAllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSanitationAssetAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Allocation created successfully";

        if (action.payload?.data) {
          state.sanitationAssetsAllocation.unshift(
            action.payload.data
          );
          state.totalRecords += 1;
        }
      })
      .addCase(addSanitationAssetAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateSanitationAssetAllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSanitationAssetAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Allocation updated successfully";

        const updated = action.payload?.data;
        if (updated) {
          state.sanitationAssetsAllocation = state.sanitationAssetsAllocation.map(
            (item) =>
              Number(item.allocation_id) === Number(updated.allocation_id)
                ? updated
                : item
          );
        }
      })
      .addCase(updateSanitationAssetAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteSanitationAssetAllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSanitationAssetAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Allocation deleted successfully";

        const deletedId = action.meta.arg;
        state.sanitationAssetsAllocation = state.sanitationAssetsAllocation.filter(
          (item) => Number(item.allocation_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      })
      .addCase(deleteSanitationAssetAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = sanitationAssetAllocationSlice.actions;
export default sanitationAssetAllocationSlice.reducer;