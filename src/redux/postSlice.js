import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
  loading: false,
  value: 0,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentPost = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  postSlice.actions;

export default postSlice.reducer;
