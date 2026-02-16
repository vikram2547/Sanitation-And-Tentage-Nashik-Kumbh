import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";

// ===============================
// AXIOS INSTANCE
// ===============================
const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
  },
});

// ===============================
// ALWAYS ATTACH LATEST TOKEN
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ALWAYS fresh token
    if (token) {
      config.headers["X-ACCESS-TOKEN"] = token;
    } else {
      delete config.headers["X-ACCESS-TOKEN"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// GET USERS
// ========================
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users", {
        params: {
          page,
          per_page,
          keywords: "",
          order_by_col: "user_id",
          order_by: "DESC",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// ========================
// CREATE USER
// ========================
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// ========================
// UPDATE USER
// ========================
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// ========================
// DELETE USER
// ========================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// ========================
// SLICE
// ========================
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalRecords: 0,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== GET USERS =====
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = Array.isArray(action.payload?.data?.users)
          ? action.payload.data.users
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CREATE USER =====
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "User created successfully";

        if (action.payload?.data) {
          state.users.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE USER =====
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "User updated successfully";

        const updatedUser = action.payload?.data;

        if (updatedUser) {
          state.users = state.users.map((user) =>
            Number(user.user_id) === Number(updatedUser.user_id)
              ? updatedUser
              : user
          );
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== DELETE USER =====
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "User deleted successfully";

        const deletedId = action.meta.arg;

        state.users = state.users.filter(
          (user) => Number(user.user_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = usersSlice.actions;
export default usersSlice.reducer;
