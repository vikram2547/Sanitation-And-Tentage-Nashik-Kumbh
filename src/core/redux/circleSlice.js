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
   REQUEST INTERCEPTOR (TOKEN)
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

      // redirect to signin
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET Circles ================= */
export const getCircles = createAsyncThunk(
  "circles/getCircles",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("circles", {
        params: {
          page,
          per_page,
          keywords: "",
          status: "",
          order_by_col: "circle_id",
          order_by: "DESC",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch circles"
      );
    }
  }
);

/* ================= ADD ================= */
export const addCircle = createAsyncThunk(
  "circles/addCircle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("circles/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add circle"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updateCircle = createAsyncThunk(
  "circles/updateCircle",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`circles/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update circle"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deleteCircle = createAsyncThunk(
  "circles/deleteCircle",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`circles/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete circle"
      );
    }
  }
);

/* ================= SLICE ================= */
const circleSlice = createSlice({
  name: "circles",
  initialState: {
    circles: [],
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
      .addCase(getCircles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCircles.fulfilled, (state, action) => {
        state.loading = false;

        state.circles = Array.isArray(action.payload?.data?.circles)
          ? action.payload.data.circles
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getCircles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addCircle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCircle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Circle created successfully";

        if (action.payload?.data) {
          state.circles.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addCircle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateCircle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCircle.fulfilled, (state, action) => {
        state.loading = false;

        state.success =
          action.payload?.message || "Circle updated successfully";

        const updatedCircle = action.payload?.data;

        if (updatedCircle) {
          state.circles = state.circles.map((circle) =>
            Number(circle.circle_id) === Number(updatedCircle.circle_id)
              ? updatedCircle
              : circle
          );
        }
      })
      .addCase(updateCircle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteCircle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCircle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Circle deleted successfully";

        const deletedId = action.meta.arg;

        state.circles = state.circles.filter(
          (circle) => Number(circle.circle_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteCircle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = circleSlice.actions;
export default circleSlice.reducer;