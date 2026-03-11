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
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - Token expired");

      localStorage.removeItem("token");

      // optional redirect
      window.location.href = all_routes.signin;
    }

    return Promise.reject(error);
  }
);

/* ================= GET QUESTIONS ================= */
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("questions", {
        params: {
          page,
          per_page,
          order_by_col: "question_id",
          order_by: "DESC",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch questions"
      );
    }
  }
);

/* ================= ADD QUESTION ================= */
export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("questions/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add question"
      );
    }
  }
);

/* ================= UPDATE QUESTION ================= */
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`questions/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update question"
      );
    }
  }
);

/* ================= DELETE QUESTION ================= */
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`questions/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete question"
      );
    }
  }
);

/* ================= SLICE ================= */
const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
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
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loading = false;

        state.questions = action.payload?.data?.questions || [];
        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestion.fulfilled, (state) => {
        state.loading = false;
        state.success = "Question created successfully";
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.loading = false;
        state.success = "Question updated successfully";
      })

      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Question deleted successfully";

        const deletedId = action.payload;

        state.questions = state.questions.filter(
          (q) => Number(q.question_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearMessages } = questionSlice.actions;
export default questionSlice.reducer;