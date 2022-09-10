import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    info: {},
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserInfo: (state, action) => {
      state.info = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, getUserInfo, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
