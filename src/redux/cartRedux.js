import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const checkDuplicate = state.products.filter(
        (product) => product.title === action.payload.title
      );
      if (checkDuplicate.length > 0) {
        const index = state.products.findIndex(
          (product) => product.title === checkDuplicate[0].title
        );
        checkDuplicate[0].quantity += action.payload.quantity;
        state.products[index] = checkDuplicate[0];
        state.products[index].total += (action.payload.quantity * +checkDuplicate[0].price.slice(1));

      } else {
        state.quantity += 1;
        action.payload['total'] =  action.payload.quantity * +action.payload.price.slice(1)
        state.products.push(action.payload);
      }
      state.total = state.products.reduce((prev, cur)=> {
        return cur.total += prev.total
      },{total: 0});
    },
    resetCart: (state) => {
      state.quantity = 0
      state.total = 0
      state.products = []
    }
  },
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
