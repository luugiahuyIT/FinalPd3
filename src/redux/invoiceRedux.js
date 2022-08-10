import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoiceList: [],
  },
  reducers: {
    addInvoice: (state, action) => {
        state.invoiceList.push(action.payload)
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
