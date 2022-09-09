import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderWaitingList: [],
    orderApproveList: [],
    orderShippingList: [],
    orderShippedList: [],
    orderAllList: [],
  },
  reducers: {
    // addorder: (state, action) => {
    //     state.orderList.push(action.payload)
    // },
    getOrder: (state, action) => {
      state.orderWaitingList = action.payload.waiting;
      state.orderApproveList = action.payload.approve;
      state.orderShippingList = action.payload.shipping;
      state.orderShippedList = action.payload.shipped;
      state.orderAllList = action.payload.all;
    },
  },
});

export const { getOrder } = orderSlice.actions;
export default orderSlice.reducer;
