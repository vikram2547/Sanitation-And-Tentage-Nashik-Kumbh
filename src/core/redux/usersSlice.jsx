import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../baseUrl/http";


// Helper to build headers
const getHeaders = (token) => ({
  "X-API-KEY": "YOUR_API_KEY",
  "X-ACCESS-TOKEN": token,
  "Content-Type": "application/json"
});

// ========================
// 🔹 GET USERS LIST
// ========================
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, per_page }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await axios.get(
        `${API_HOST}/api/users`,
        {
          params: {
            page,
            per_page,
            keywords: "",
            order_by_col: "user_id",
            order_by: "DESC"
          },
          headers: getHeaders(token)
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// ========================
// 🔹 VIEW USER
// ========================
export const viewUser = createAsyncThunk(
  "users/viewUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await axios.get(
        `${API_HOST}/api/users/view/${id}`,
        {
          headers: getHeaders(token)
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

// ========================
// 🔹 CREATE USER
// ========================
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await axios.post(
        `${API_HOST}/api/users/new`,
        data,
        {
          headers: getHeaders(token)
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

// ========================
// 🔹 UPDATE USER
// ========================
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await axios.post(
        `${API_HOST}/api/users/edit/${id}`,
        data,
        {
          headers: getHeaders(token)
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

// ========================
// 🔹 DELETE USER
// ========================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await axios.delete(
        `${BASE_URL}/api/users/delete/${id}`,
        {
          headers: getHeaders(token)
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
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
    selectedUser: null
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.totalRecords = action.payload.total || 0;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createUser.fulfilled, (state) => {
        state.success = "User created successfully";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state) => {
        state.success = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state) => {
        state.success = "User deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearMessages } = usersSlice.actions;
export default usersSlice.reducer;
