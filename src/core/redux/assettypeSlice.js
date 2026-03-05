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

/* ================= RESPONSE INTERCEPTOR (401 LOGOUT) ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // remove token
      localStorage.removeItem("token");

      // redirect to signin
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET ================= */
export const getAssetTypes = createAsyncThunk(
  "assetTypes/getAssetTypes",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("asset-types", {
        params: { page, per_page },
      });

      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch asset types"
      );
    }
  }
);

/* ================= ADD ================= */
export const addAssetType = createAsyncThunk(
  "assetTypes/addAssetType",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("asset-types/new", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to create asset type"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateAssetType = createAsyncThunk(
  "assetTypes/updateAssetType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`asset-types/edit/${id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update asset type"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteAssetType = createAsyncThunk(
  "assetTypes/deleteAssetType",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`asset-types/delete/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete asset type"
      );
    }
  }
);

/* ================= SLICE ================= */
const assettypeSlice = createSlice({
  name: "assetTypes",
  initialState: {
    assetTypes: [],
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
      .addCase(getAssetTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssetTypes.fulfilled, (state, action) => {
        state.loading = false;

        state.assetTypes = action.payload?.data?.asset_types || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getAssetTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addAssetType.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAssetType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Asset Type created successfully";

        if (action.payload?.data) {
          state.assetTypes.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addAssetType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateAssetType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssetType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Asset Type updated successfully";

        const updated = action.payload?.data;

        state.assetTypes = state.assetTypes.map((item) =>
          item.asset_type_id === updated?.asset_type_id ? updated : item
        );
      })
      .addCase(updateAssetType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteAssetType.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAssetType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Asset type deleted successfully";

        const deletedId = action.meta.arg;

        state.assetTypes = state.assetTypes.filter(
          (item) => Number(item.asset_type_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteAssetType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = assettypeSlice.actions;
export default assettypeSlice.reducer;