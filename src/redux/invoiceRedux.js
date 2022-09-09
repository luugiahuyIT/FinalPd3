import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoiceWaitingList: [],
    invoiceApproveList: [],
    invoiceShippingList: [],
    invoiceShippedList: [],
    invoiceAllList: [],
  },
  reducers: {
    // addInvoice: (state, action) => {
    //     state.invoiceList.push(action.payload)
    // },
    getInvoice: (state, action) => {
      state.invoiceWaitingList = action.payload.waiting;
      state.invoiceApproveList = action.payload.approve;
      state.invoiceShippingList = action.payload.shipping;
      state.invoiceShippedList = action.payload.shipped;
      state.invoiceAllList = action.payload.all;
    },
  },
});

export const { addInvoice, getInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
