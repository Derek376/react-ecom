import { combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";
import { sellerReducer } from "./sellerReducer";

const reducers = combineReducers({
  products: productReducer, errors: errorReducer, carts: cartReducer,
  auth: authReducer, payment: paymentMethodReducer, admin: adminReducer,
  order: orderReducer, seller: sellerReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "SESSION_CHANGED") {
    return reducers(undefined, action.payload
      ? { type: "LOGIN_USER", payload: action.payload }
      : { type: "LOG_OUT" });
  }
  return reducers(state, action);
};

// Async responses from an earlier identity must not refill the new session's store.
export const sessionThunk = ({ dispatch, getState }) => {
  let generation = 0;
  return (next) => (action) => {
    if (typeof action !== "function") {
      if (action.type === "SESSION_CHANGED") generation += 1;
      return next(action);
    }
    let startedIn = generation;
    const scopedDispatch = (event) => {
      if (startedIn !== generation) return event;
      const result = dispatch(event);
      if (event.type === "SESSION_CHANGED") startedIn = generation;
      return result;
    };
    return action(scopedDispatch, getState);
  };
};
