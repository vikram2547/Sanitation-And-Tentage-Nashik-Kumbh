// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, POST_API } from "../baseUrl/http";

// // ------------------ ASYNC THUNK ------------------

// export const signupUser = createAsyncThunk(
//   "signup/signupUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios({
//         method: POST_API,
//         url: `${API_HOST}api/auth/register`,
//         data,
//         headers: {
//           "Content-Type": "application/json",
//           "X-API-KEY": "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
//         },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Registration failed");
//     }
//   }
// );

// // ------------------ INITIAL STATE ------------------

// const initialState = {
//   registrationStatus: false,
//   token: null,
//   user: null,
//   registrationError: null,
//   loading: false,
// };

// // ------------------ SLICE ------------------

// const signupSlice = createSlice({
//   name: "signup",
//   initialState,
//   reducers: {
//     clearSignupState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.registrationError = null;
//         state.registrationStatus = false;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.registrationStatus = true;
//         state.registrationError = null;
//         state.token = action.payload.token;
//         state.user = action.payload.user || null;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.registrationError = action.payload;
//       });
//   },
// });

// // ------------------ EXPORTS ------------------

// export const { clearSignupState } = signupSlice.actions;
// export default signupSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------ ASYNC THUNK ------------------

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_HOST}api/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "fx4ni3n75wtxywa9wlu70fycp2e0ajxkh7o6adjshiifmvaukq57jyrs15e3d55u",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message || "Request failed"
      );
    }
  }
);

// ------------------ INITIAL STATE ------------------

const initialState = {
  data: null,
  error: null,
  loading: false,
};

// ------------------ SLICE ------------------

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ------------------ EXPORTS ------------------

export const { clearSignupState } = signupSlice.actions;
export default signupSlice.reducer;
