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
        state.products[index].total += (action.payload.quantity * checkDuplicate[0].price);

      } else {
        state.quantity += 1;
        action.payload['total'] =  action.payload.quantity * action.payload.price
        state.products.push(action.payload);
      }
      state.total = state.products.reduce((prev, cur)=> {
        return prev += cur.total
      },0);
    },
    resetCart: (state) => {
      state.quantity = 0
      state.total = 0
      state.products = []
    },
    incQuantityProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.title === action.payload.title)
        state.products[index].quantity += 1;
        state.products[index].total += action.payload.price;

        state.total = Math.round(Number(state.total) + Number(action.payload.price))
    },
    descQuantityProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.title === action.payload.title)
        if(state.products[index].quantity - 1 === 0) return 
        state.products[index].quantity -= 1;
        state.products[index].total -= action.payload.price;

        state.total = Math.round(Number(state.total) - Number(action.payload.price))
    },
    removeProduct: (state, action) => {
      state.quantity = Number(state.quantity) - 1
      state.total = Math.round(Number(state.total) - Number(action.payload.price))
      state.products = state.products.filter(product => product.title !== action.payload.title)
    },
  },
});

export const { addProduct, resetCart, incQuantityProduct, descQuantityProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
