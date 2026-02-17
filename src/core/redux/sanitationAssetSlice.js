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
export const getSanitationAssets = createAsyncThunk(
  "sanitationAssets/getSanitationAssets",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/sanitation-assets", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= ADD ================= */
export const addSanitationAsset = createAsyncThunk(
  "sanitationAssets/addSanitationAsset",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/sanitation-assets/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateSanitationAsset = createAsyncThunk(
  "sanitationAssets/updateSanitationAsset",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/sanitation-assets/edit/${id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteSanitationAsset = createAsyncThunk(
  "sanitationAssets/deleteSanitationAsset",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/sanitation-assets/delete/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

const sanitationAssetSlice = createSlice({
  name: "sanitationAssets",
  initialState: {
    sanitationAssets: [],
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
      .addCase(getSanitationAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSanitationAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.sanitationAssets =
          action.payload?.data?.sanitation_assets || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getSanitationAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addSanitationAsset.fulfilled, (state, action) => {
        state.success = "Sanitation Asset created successfully";
        state.sanitationAssets.unshift(action.payload?.data);
      })

      /* ===== UPDATE ===== */
      .addCase(updateSanitationAsset.fulfilled, (state, action) => {
        state.success = "Sanitation Asset updated successfully";
        const updated = action.payload?.data;

        state.sanitationAssets = state.sanitationAssets.map((item) =>
          item.sanitation_asset_id === updated.sanitation_asset_id
            ? updated
            : item
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteSanitationAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset deleted successfully";

        const deletedId = action.meta.arg;

        state.sanitationAssets = state.sanitationAssets.filter(
          (item) =>
            Number(item.sanitation_asset_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      });
  },
});

export const { clearMessages } = sanitationAssetSlice.actions;
export default sanitationAssetSlice.reducer;
