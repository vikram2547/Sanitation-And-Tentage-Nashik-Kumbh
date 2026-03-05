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

/* ================= GET INCIDENTS ================= */
export const getIncidents = createAsyncThunk(
  "incidents/getIncidents",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("sanitation-incidents", {
        params: {
          page,
          per_page,
          order_by_col: "incident_id",
          order_by: "DESC",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch incidents"
      );
    }
  }
);

/* ================= ADD INCIDENT ================= */
export const addIncidents = createAsyncThunk(
  "incidents/addIncidents",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("sanitation-incidents/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add incident"
      );
    }
  }
);

/* ================= UPDATE INCIDENT ================= */
export const updateIncidents = createAsyncThunk(
  "incidents/updateIncidents",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `sanitation-incidents/edit/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update incident"
      );
    }
  }
);

/* ================= DELETE INCIDENT ================= */
export const deleteIncidents = createAsyncThunk(
  "incidents/deleteIncidents",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`sanitation-incidents/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete incident"
      );
    }
  }
);

/* ================= SLICE ================= */
const incidentsSlice = createSlice({
  name: "incidents",
  initialState: {
    incidents: [],
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
      .addCase(getIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncidents.fulfilled, (state, action) => {
        state.loading = false;

        state.incidents = Array.isArray(action.payload?.data?.incidents)
          ? action.payload.data.incidents
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addIncidents.pending, (state) => {
        state.loading = true;
      })
      .addCase(addIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Incident created successfully";

        if (action.payload?.data) {
          state.incidents.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "Incident updated successfully";

        const updatedIncident = action.payload?.data;

        if (updatedIncident) {
          state.incidents = state.incidents.map((incident) =>
            Number(incident.incident_id) ===
            Number(updatedIncident.incident_id)
              ? updatedIncident
              : incident
          );
        }
      })
      .addCase(updateIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Incident deleted successfully";

        const deletedId = action.meta.arg;

        state.incidents = state.incidents.filter(
          (incident) =>
            Number(incident.incident_id) !== Number(deletedId)
        );

        if (state.totalRecords > 0) {
          state.totalRecords -= 1;
        }
      })
      .addCase(deleteIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = incidentsSlice.actions;
export default incidentsSlice.reducer;