import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";

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

/* ================= GET USER PERMISSIONS ================= */
export const getRolePermission = createAsyncThunk(
  "rolespermission/getRolePermission",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("user-permissions", {
        params: {
          page,
          per_page,
          keywords: "",
          status: "",
          order_by_col: "id",
          order_by: "DESC",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user permissions"
      );
    }
  }
);

/* ================= ADD USER PERMISSION ================= */
export const addRolePermission = createAsyncThunk(
  "rolespermission/addRolePermission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("user-permissions/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add user permission"
      );
    }
  }
);

/* ================= UPDATE USER PERMISSION ================= */
export const updateRolePermission = createAsyncThunk(
  "rolespermission/updateRolePermission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`user-permissions/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user permission"
      );
    }
  }
);

/* ================= DELETE USER PERMISSION ================= */
export const deleteRolePermission = createAsyncThunk(
  "rolespermission/deleteRolePermission",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`user-permissions/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user permission"
      );
    }
  }
);

/* ================= SLICE ================= */
const rolespermissionSlice = createSlice({
  name: "rolespermission",
  initialState: {
    permissions: [],
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
      .addCase(getRolePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRolePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = Array.isArray(action.payload?.data?.permissions)
          ? action.payload.data.permissions
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getRolePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addRolePermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRolePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "User permission created successfully";

        if (action.payload?.data) {
          state.permissions.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addRolePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateRolePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRolePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "User permission updated successfully";

        const updatedPermission = action.payload?.data;

        if (updatedPermission) {
          state.permissions = state.permissions.map((item) =>
            Number(item.id) === Number(updatedPermission.id)
              ? updatedPermission
              : item
          );
        }
      })
      .addCase(updateRolePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteRolePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRolePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "User permission deleted successfully";

        const deletedId = action.meta.arg;

        state.permissions = state.permissions.filter(
          (item) => Number(item.id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteRolePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = rolespermissionSlice.actions;
export default rolespermissionSlice.reducer;