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

/* ================= GET SHIFTS ================= */
export const getShifts = createAsyncThunk(
  "shifts/getShifts",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/shifts", {
        params: {
          page,
          per_page,
          order_by_col: "shift_id",
          order_by: "DESC",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shifts"
      );
    }
  }
);

/* ================= ADD SHIFT ================= */
export const addShift = createAsyncThunk(
  "shifts/addShift",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/shifts/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add shift"
      );
    }
  }
);

/* ================= UPDATE SHIFT ================= */
export const updateShift = createAsyncThunk(
  "shifts/updateShift",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/shifts/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update shift"
      );
    }
  }
);

/* ================= DELETE SHIFT ================= */
export const deleteShift = createAsyncThunk(
  "shifts/deleteShift",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/shifts/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete shift"
      );
    }
  }
);

/* ================= SLICE ================= */
const shiftSlice = createSlice({
  name: "shifts",
  initialState: {
    shifts: [],
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
      .addCase(getShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShifts.fulfilled, (state, action) => {
        state.loading = false;

        state.shifts = Array.isArray(action.payload?.data?.shifts)
          ? action.payload.data.shifts
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addShift.pending, (state) => {
        state.loading = true;
      })
      .addCase(addShift.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Shift created successfully";

        if (action.payload?.data) {
          state.shifts.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShift.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "Shift updated successfully";

        const updatedShift = action.payload?.data;

        if (updatedShift) {
          state.shifts = state.shifts.map((shift) =>
            Number(shift.shift_id) === Number(updatedShift.shift_id)
              ? updatedShift
              : shift
          );
        }
      })
      .addCase(updateShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Shift deleted successfully";

        const deletedId = action.meta.arg;

        state.shifts = state.shifts.filter(
          (shift) => Number(shift.shift_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = shiftSlice.actions;
export default shiftSlice.reducer;
