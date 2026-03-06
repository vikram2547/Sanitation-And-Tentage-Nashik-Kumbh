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
      localStorage.removeItem("token");
      window.location.href = all_routes.signin;
    }
    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getSanitationAssetsTagging = createAsyncThunk(
  "sanitationAssetsTagging/getSanitationAssetsTagging",
  async ({ page = 1, per_page = 25 }, { rejectWithValue }) => {
    try {
      const res = await api.get("sanitation-asset-tagging", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to fetch sanitation assets tagging"
      );
    }
  }
);

/* ================= ADD ================= */
export const addSanitationAssetTagging = createAsyncThunk(
  "sanitationAssetsTagging/addSanitationAssetTagging",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("sanitation-asset-tagging/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to add sanitation asset tagging"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateSanitationAssetTagging = createAsyncThunk(
  "sanitationAssetsTagging/updateSanitationAssetTagging",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `sanitation-asset-tagging/edit/${id}`,
        data
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to update sanitation asset tagging"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteSanitationAssetTagging = createAsyncThunk(
  "sanitationAssetsTagging/deleteSanitationAssetTagging",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.post(`sanitation-asset-tagging/delete/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
        "Failed to delete sanitation asset tagging"
      );
    }
  }
);

/* ================= SLICE ================= */
const sanitationAssetTaggingSlice = createSlice({
  name: "sanitationAssetsTagging",
  initialState: {
    sanitationAssetsTagging: [],
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
      .addCase(getSanitationAssetsTagging.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSanitationAssetsTagging.fulfilled, (state, action) => {
        state.loading = false;
        state.sanitationAssetsTagging =
          action.payload?.data?.sanitation_asset_tagging || [];
        state.totalRecords = action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getSanitationAssetsTagging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addSanitationAssetTagging.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSanitationAssetTagging.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Tagging created successfully";

        if (action.payload?.data) {
          state.sanitationAssetsTagging.unshift(
            action.payload.data
          );
          state.totalRecords += 1;
        }
      })
      .addCase(addSanitationAssetTagging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateSanitationAssetTagging.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSanitationAssetTagging.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Tagging updated successfully";

        const updated = action.payload?.data;
        if (updated) {
          state.sanitationAssetsTagging = state.sanitationAssetsTagging.map(
            (item) =>
              Number(item.tagging_id) === Number(updated.tagging_id)
                ? updated
                : item
          );
        }
      })
      .addCase(updateSanitationAssetTagging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteSanitationAssetTagging.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSanitationAssetTagging.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset Tagging deleted successfully";

        const deletedId = action.meta.arg;
        state.sanitationAssetsTagging = state.sanitationAssetsTagging.filter(
          (item) => Number(item.tagging_id) !== Number(deletedId)
        );
        state.totalRecords -= 1;
      })
      .addCase(deleteSanitationAssetTagging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = sanitationAssetTaggingSlice.actions;
export default sanitationAssetTaggingSlice.reducer;