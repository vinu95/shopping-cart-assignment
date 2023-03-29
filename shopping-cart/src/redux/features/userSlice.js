import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isUserLoggedIn: false,
  userDetails: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.userDetails.push(action.payload);
    },
    login: (state) => {
      state.isUserLoggedIn = true;
    },
    logout: (state) => {
      state.isUserLoggedIn = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { signUp, login, logout } = userSlice.actions;
