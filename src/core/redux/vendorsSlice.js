import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";


const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
    "X-ACCESS-TOKEN":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTc3MDkyNzkyOSwiaWF0IjoxNzcwODkxOTI5fQ.H0LBlalyNTcvSbqVZ54IE0suYjA6zr7xGgHaTFJubAM",
    "Content-Type": "application/json",
  },
});

// ================= GET VENDORS =================
export const getVendors = createAsyncThunk(
  "vendors/getVendors",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/vendors", {
        params: { page, per_page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ================= ADD VENDOR =================
export const addVendor = createAsyncThunk(
  "vendors/addVendor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vendors", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ================= UPDATE VENDOR =================
export const updateVendor = createAsyncThunk(
  "vendors/updateVendor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/vendors/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ================= DELETE VENDOR =================
export const deleteVendor = createAsyncThunk(
  "vendors/deleteVendor",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/vendors/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

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

      // GET
      .addCase(getVendors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload?.data || [];
        state.totalRecords = action.payload?.total || 0;
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch vendors";
      })

      // ADD
      .addCase(addVendor.fulfilled, (state, action) => {
        state.success = "Vendor created successfully";
        state.vendors.unshift(action.payload?.data);
      })

      // UPDATE
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.success = "Vendor updated successfully";
        const updated = action.payload?.data;

        state.vendors = state.vendors.map((vendor) =>
          vendor.id === updated.id ? updated : vendor
        );
      })

      // DELETE
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.success = "Vendor deleted successfully";
        state.vendors = state.vendors.filter(
          (vendor) => vendor.id !== action.payload
        );
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Something went wrong";
        }
      );
  },
});

export const { clearMessages } = vendorsSlice.actions;
export default vendorsSlice.reducer;
