import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cItems: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cItems = action.payload.cItems;
    },
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending",
          message: "sending cart data",
        })
      )
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-shopping-29fc1-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "sending cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    }
  };
};

export const loadCartData = () => {
  return async (dispatch) => {
    const loadData = async () => {
      const response = await fetch(
        "https://react-redux-shopping-29fc1-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetch data Failed");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await loadData();
      dispatch(
        cartSlice.actions.replaceCart({
          cItems: cartData.cItems || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "loading cart data failed",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
