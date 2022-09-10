import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    authorList: [],
    categoryList: [],
  },
  reducers: {
    getData: (state, action) => {
      state.authorList = action.payload.authors;
      state.categoryList = action.payload.categories;

    },
  },
});

export const { getData } =
filterSlice.actions;
export default filterSlice.reducer;
