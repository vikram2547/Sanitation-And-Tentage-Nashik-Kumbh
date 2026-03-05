import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";
import { all_routes } from "../../routes/all_routes";

/* ===============================
   AXIOS INSTANCE
================================ */
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

/* ===============================
   REQUEST INTERCEPTOR
   (ALWAYS PICK LATEST TOKEN)
================================ */
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

/* ===============================
   RESPONSE INTERCEPTOR (401 FIX)
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("401 Unauthorized - Token expired");

      localStorage.removeItem("token");

      // Redirect user to login
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET SECTORS ================= */
export const getSectors = createAsyncThunk(
  "sectors/getSectors",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("sectors", {
        params: {
          page,
          per_page,
          keywords: "",
          order_by_col: "sector_id",
          order_by: "DESC",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sectors"
      );
    }
  }
);

/* ================= ADD SECTOR ================= */
export const addSector = createAsyncThunk(
  "sectors/addSector",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("sectors/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add sector"
      );
    }
  }
);

/* ================= UPDATE SECTOR ================= */
export const updateSector = createAsyncThunk(
  "sectors/updateSector",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`sectors/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update sector"
      );
    }
  }
);

/* ================= DELETE SECTOR ================= */
export const deleteSector = createAsyncThunk(
  "sectors/deleteSector",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`sectors/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete sector"
      );
    }
  }
);

/* ================= SLICE ================= */
const sectorSlice = createSlice({
  name: "sectors",
  initialState: {
    sectors: [],
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
      .addCase(getSectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSectors.fulfilled, (state, action) => {
        state.loading = false;

        state.sectors = Array.isArray(action.payload?.data?.sectors)
          ? action.payload.data.sectors
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addSector.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSector.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sector created successfully";

        if (action.payload?.data) {
          state.sectors.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateSector.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSector.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "Sector updated successfully";

        const updatedSector = action.payload?.data;

        if (updatedSector) {
          state.sectors = state.sectors.map((sector) =>
            Number(sector.sector_id) === Number(updatedSector.sector_id)
              ? updatedSector
              : sector
          );
        }
      })
      .addCase(updateSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteSector.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSector.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Sector deleted successfully";

        const deletedId = action.meta.arg;

        state.sectors = state.sectors.filter(
          (sector) => Number(sector.sector_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = sectorSlice.actions;
export default sectorSlice.reducer;