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
api.interceptors.request.use((config) => {
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

/* ================= GET questions ================= */
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async ({ page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/questions", {
        params: { page, per_page, order_by_col: "question_id", order_by: "DESC", },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch questions"
      );
    }
  }
);

/* ================= ADD questions ================= */
export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/questions/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add question"
      );
    }
  }
);

/* ================= UPDATE questions ================= */
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/questions/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update question"
      );
    }
  }
);

/* ================= DELETE questions ================= */
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/questions/delete/${id}`);
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

      /* ===== GET ===== */
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = Array.isArray(action.payload?.data?.questions)
          ? action.payload.data.questions
          : [];

        state.totalRecords =
          action.payload?.data?.paging?.totalrecords || 0;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Question created successfully";
        if (action.payload?.data) {
          state.questions.unshift(action.payload.data);
          state.totalRecords += 1;
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Question updated successfully";
        const updatedQuestion = action.payload?.data;

        if (updatedQuestion) {
          state.questions = state.questions.map((question) =>
             Number(question.question_id) === Number(updatedQuestion.question_id)
              ? updatedQuestion
              : question
          );
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Questions deleted successfully";
         const deletedId = action.meta.arg;

          state.questions = state.questions.filter(
          (question) => Number(question.question_id) !== Number(deletedId)
        );

        state.totalRecords -= 1;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = questionSlice.actions;
export default questionSlice.reducer;
