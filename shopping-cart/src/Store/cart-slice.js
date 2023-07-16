import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cItems: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cItems.find(
        (item) => String(item.id) === String(newItem.id)
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cItems = [
          ...state.cItems,
          {
            id: newItem.id,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            name: newItem.title,
          },
        ];
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    addExistingItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.cItems.find(
        (item) => String(item.id) === String(id)
      );
      state.totalQuantity++;
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.cItems.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cItems = state.cItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
