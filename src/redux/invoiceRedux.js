import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoiceWaitingList: [],
    invoiceApproveList: [],
    invoiceDeliveredList: [],
    invoiceAllList: [],
    invoiceNotApproveList: [],
  },
  reducers: {
    deleteInvoice: (state, action) => {
      state.invoiceWaitingList = state.invoiceWaitingList.filter(
        (item) => item._id !== action.payload
      );
      state.invoiceAllList = state.invoiceAllList.filter(
        (item) => item._id !== action.payload
      );
    },
    getInvoice: (state, action) => {
      state.invoiceWaitingList = action.payload.waiting;
      state.invoiceApproveList = action.payload.approve;
      state.invoiceDeliveredList = action.payload.delivered;
      state.invoiceAllList = action.payload.all;
      state.invoiceNotApproveList = action.payload.notApprove;
    },
  },
});

export const { deleteInvoice, getInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
