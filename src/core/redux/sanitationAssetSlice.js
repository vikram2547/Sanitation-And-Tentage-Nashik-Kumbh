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

/* ================= RESPONSE INTERCEPTOR (401 FIX) ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - Token expired");

      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getSanitationAssets = createAsyncThunk(
  "sanitationAssets/getSanitationAssets",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("sanitation-assets", {
        params: { page, per_page },
      });

      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch sanitation assets"
      );
    }
  }
);

/* ================= ADD ================= */
export const addSanitationAsset = createAsyncThunk(
  "sanitationAssets/addSanitationAsset",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("sanitation-assets/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to add sanitation asset"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateSanitationAsset = createAsyncThunk(
  "sanitationAssets/updateSanitationAsset",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`sanitation-assets/edit/${id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update sanitation asset"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteSanitationAsset = createAsyncThunk(
  "sanitationAssets/deleteSanitationAsset",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`sanitation-assets/delete/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete sanitation asset"
      );
    }
  }
);

/* ================= SLICE ================= */
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
        state.error = null;
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
      .addCase(addSanitationAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSanitationAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset created successfully";

        if (action.payload?.data) {
          state.sanitationAssets.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addSanitationAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateSanitationAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSanitationAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset updated successfully";

        const updated = action.payload?.data;

        if (updated) {
          state.sanitationAssets = state.sanitationAssets.map((item) =>
            Number(item.sanitation_asset_id) ===
            Number(updated.sanitation_asset_id)
              ? updated
              : item
          );
        }
      })
      .addCase(updateSanitationAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteSanitationAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSanitationAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sanitation Asset deleted successfully";

        const deletedId = action.meta.arg;

        state.sanitationAssets = state.sanitationAssets.filter(
          (item) =>
            Number(item.sanitation_asset_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteSanitationAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = sanitationAssetSlice.actions;
export default sanitationAssetSlice.reducer;