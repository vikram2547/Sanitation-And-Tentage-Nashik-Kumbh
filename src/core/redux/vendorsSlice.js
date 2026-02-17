import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";

/* ===============================
   AXIOS INSTANCE
   (TOKEN SET DYNAMICALLY)
================================ */
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

/* 🔑 ALWAYS PICK LATEST TOKEN */
api.interceptors.request.use((config) => {
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

/* ================= GET VENDORS ================= */
export const getVendors = createAsyncThunk(
  "vendors/getVendors",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/vendors", {
        params: { page, per_page, keywords: "", status: "", order_by_col: "vendor_id", order_by: "DESC", },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendors"
      );
    }
  }
);

/* ================= ADD VENDOR ================= */
export const addVendor = createAsyncThunk(
  "vendors/addVendor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vendors/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add vendor"
      );
    }
  }
);

/* ================= UPDATE VENDOR ================= */
export const updateVendor = createAsyncThunk(
  "vendors/updateVendor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/vendors/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update vendor"
      );
    }
  }
);

/* ================= DELETE VENDOR ================= */
export const deleteVendor = createAsyncThunk(
  "vendors/deleteVendor",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/vendors/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete vendor"
      );
    }
  }
);

/* ================= SLICE ================= */
const vendorsSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: [],
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
      .addCase(getVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = Array.isArray(action.payload?.data?.vendors)
          ? action.payload.data.vendors
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Vendor created successfully";
        if (action.payload?.data) {
          state.vendors.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Vendor updated successfully";
        const updatedVendor = action.payload?.data;

        if (updatedVendor) {
          state.vendors = state.vendors.map((vendor) =>
             Number(vendor.vendor_id) === Number(updatedVendor.vendor_id)
              ? updatedVendor
              : vendor
          );
        }
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Vendor deleted successfully";
         const deletedId = action.meta.arg;

          state.vendors = state.vendors.filter(
          (vendor) => Number(vendor.vendor_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = vendorsSlice.actions;
export default vendorsSlice.reducer;
