import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
          discountedPrice: action.payload.price,
        });
      }
    },
    applyDiscount: (state, action) => {
      // action.payload should contain discount percentage or amount
      const discount = action.payload;
      state.forEach((item) => {
        item.discountedPrice = item.price - (item.price * discount) / 100;
      });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, applyDiscount, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
