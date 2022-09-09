import { createSlice } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: {
    authorList: [],
  },
  reducers: {
    // addorder: (state, action) => {
    //     state.orderList.push(action.payload)
    // },
    getAuthor: (state, action) => {
      state.authorList = action.payload;
    },
    deleteAuthor: (state, action) => {
      state.authorList = state.authorList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { getAuthor, deleteAuthor } = authorSlice.actions;
export default authorSlice.reducer;
