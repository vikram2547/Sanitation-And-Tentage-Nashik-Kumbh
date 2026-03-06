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
   RESPONSE INTERCEPTOR (401 LOGOUT)
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = all_routes.signin;
    }
    return Promise.reject(error);
  }
);

/* ================= GET INSPECTIONS ================= */
export const getInspections = createAsyncThunk(
  "inspections/getInspections",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("sanitation-inspections", {
        params: {
          page,
          per_page,
          order_by_col: "inspection_id",
          order_by: "DESC",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inspections"
      );
    }
  }
);

/* ================= ADD INSPECTIONS ================= */
export const addInspections = createAsyncThunk(
  "inspections/addInspections",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("sanitation-inspections/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add inspection"
      );
    }
  }
);

/* ================= UPDATE INSPECTIONS ================= */
export const updateInspections = createAsyncThunk(
  "inspections/updateInspections",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `sanitation-inspections/edit/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update inspection"
      );
    }
  }
);

/* ================= DELETE INSPECTIONS ================= */
export const deleteInspections = createAsyncThunk(
  "inspections/deleteInspections",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`sanitation-inspections/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete inspection"
      );
    }
  }
);

/* ================= SLICE ================= */
const inspectionsSlice = createSlice({
  name: "inspections",
  initialState: {
    inspections: [],
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
      .addCase(getInspections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspections.fulfilled, (state, action) => {
        state.loading = false;

        state.inspections = Array.isArray(action.payload?.data?.inspections)
          ? action.payload.data.inspections
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getInspections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addInspections.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInspections.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Inspection created successfully";

        if (action.payload?.data) {
          state.inspections.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addInspections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateInspections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInspections.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "Inspection updated successfully";

        const updateInspection = action.payload?.data;

        if (updateInspection) {
          state.inspections = state.inspections.map((inspection) =>
            Number(inspection.inspection_id) ===
            Number(updateInspection.inspection_id)
              ? updateInspection
              : inspection
          );
        }
      })
      .addCase(updateInspections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteInspections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInspections.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Inspection deleted successfully";

        const deletedId = action.meta.arg;

        state.inspections = state.inspections.filter(
          (inspection) =>
            Number(inspection.inspection_id) !== Number(deletedId)
        );

        if (state.totalRecords > 0) {
          state.totalRecords -= 1;
        }
      })
      .addCase(deleteInspections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = inspectionsSlice.actions;
export default inspectionsSlice.reducer;