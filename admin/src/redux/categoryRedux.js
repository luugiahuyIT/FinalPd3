import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    // addorder: (state, action) => {
    //     state.orderList.push(action.payload)
    // },
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { getCategories, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
