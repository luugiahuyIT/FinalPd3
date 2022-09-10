import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderWaitingList: [],
    orderApproveList: [],
    orderNotApproveList: [],
    orderDeliveriedList: [],
    orderAllList: [],
    orderDetail: {},
  },
  reducers: {
    orderDetail: (state, action) => {
        state.orderDetail = action.payload
    },
    getOrder: (state, action) => {
      state.orderWaitingList = action.payload.waiting;
      state.orderApproveList = action.payload.approve;
      state.orderNotApproveList = action.payload.notApprove;
      state.orderDeliveriedList = action.payload.deliveried;
      state.orderAllList = action.payload.all;
    },
    deleteOrder: (state,action) => {
      if(action.payload.status === 'waiting') {
        state.orderWaitingList = state.orderWaitingList.filter(item => item._id !== action.payload.id);
        state.orderAllList = state.orderAllList.filter(item => item._id !== action.payload.id);
      }
      if(action.payload.status === 'approve') {
        state.orderApproveList = state.orderApproveList.filter(item => item._id !== action.payload.id);
        state.orderAllList = state.orderAllList.filter(item => item._id !== action.payload.id);
      }
      if(action.payload.status === 'not approve') {
        state.orderNotApproveList = state.orderNotApproveList.filter(item => item._id !== action.payload.id);
        state.orderAllList = state.orderAllList.filter(item => item._id !== action.payload.id);
      }

      if(action.payload.status === 'deliveried') {
        state.orderDeliveriedList = state.orderDeliveriedList.filter(item => item._id !== action.payload.id);
        state.orderAllList = state.orderAllList.filter(item => item._id !== action.payload.id);
      }

    }
  },
});

export const { getOrder, deleteOrder, orderDetail } = orderSlice.actions;
export default orderSlice.reducer;
