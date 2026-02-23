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
export const getAssetTypes = createAsyncThunk(
  "assetTypes/getAssetTypes",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const res = await api.get("asset-types", {
        params: { page, per_page },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
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
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

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
      .addCase(getAssetTypes.pending, (s) => { s.loading = true; })
      .addCase(getAssetTypes.fulfilled, (s, a) => {
        s.loading = false;
        s.assetTypes = a.payload?.data?.asset_types || [];
        s.totalRecords = a.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getAssetTypes.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(addAssetType.fulfilled, (s, a) => {
        s.success = "Asset Type created successfully";
        s.assetTypes.unshift(a.payload?.data);
      })

      .addCase(updateAssetType.fulfilled, (s, a) => {
        s.success = "Asset Type updated successfully";
        const updated = a.payload?.data;
        s.assetTypes = s.assetTypes.map((i) =>
          i.asset_type_id === updated.asset_type_id ? updated : i
        );
      })

      .addCase(deleteAssetType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Asset type deleted successfully";

        const deletedId = action.meta.arg;

        state.assetTypes = state.assetTypes.filter(
          (item) => Number(item.asset_type_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      });

  },
});

export const { clearMessages } = assettypeSlice.actions;
export default assettypeSlice.reducer;
