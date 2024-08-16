import { createSlice } from "@reduxjs/toolkit";

// Define a slice of the Redux store called "cart" with initial state and reducers
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState: [], // Initial state is an empty array representing the cart items
  reducers: {
    // Reducer to handle adding items to the cart
    addToCart: (state, action) => {
      // Find if the item is already in the cart by matching the item ID
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the item is already in the cart, increase its quantity
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        state.push({
          ...action.payload,
          quantity: 1,
          discountedPrice: action.payload.price, // Initialize discountedPrice as the original price
        });
      }
    },
    
    // Reducer to apply a discount to all items in the cart
    applyDiscount: (state, action) => {
      const discount = action.payload; // action.payload contains the discount percentage or amount
      
      // Calculate and update the discounted price for each item
      state.forEach((item) => {
        item.discountedPrice = item.price - (item.price * discount) / 100;
      });
    },

    // Reducer to handle removing an item from the cart by its ID
    removeFromCart: (state, action) => {
      // Filter out the item with the matching ID from the cart
      return state.filter((item) => item.id !== action.payload);
    },

    // Reducer to clear the entire cart
    clearCart: (state) => {
      return []; // Return an empty array, representing an empty cart
    },
  },
});

// Export the actions so they can be dispatched in the application
export const { addToCart, applyDiscount, removeFromCart, clearCart } =
  cartSlice.actions;

// Export the reducer to be added to the Redux store
export default cartSlice.reducer;
