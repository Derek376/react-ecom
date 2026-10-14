import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, sessionThunk } from "./rootReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const selectdUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
  ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
  : null;

const initialState = {
  auth: { user: user, selectedUserCheckoutAddress: selectdUserCheckoutAddress },
  carts: {
    cart: cartItems,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sessionThunk),
  preloadedState: initialState,
});

export default store;
