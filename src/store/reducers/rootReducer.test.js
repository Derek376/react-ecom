import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";
import { rootReducer, sessionThunk } from "./rootReducer";

const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sessionThunk),
});

describe("identity changes", () => {
  it("clears products, orders, analytics, cart and checkout selection", () => {
    const store = makeStore();
    store.dispatch({ type: "FETCH_PRODUCTS", payload: [{ productId: 1 }] });
    store.dispatch({ type: "FETCH_ANALYTICS", payload: { totalRevenue: 100 } });
    store.dispatch({ type: "GET_USER_ORDERS", payload: [{ orderId: 1 }] });
    store.dispatch({ type: "ADD_PAYMENT_METHOD", payload: "Stripe" });
    store.dispatch({ type: "SELECT_CHECKOUT_ADDRESS", payload: { addressId: 1 } });
    const user = { id: 2, demo: true, roles: ["ROLE_SELLER"] };
    store.dispatch({ type: "SESSION_CHANGED", payload: user });
    expect(store.getState()).toEqual(rootReducer(undefined, { type: "LOGIN_USER", payload: user }));
  });

  it("ignores a previous role's late success and failure dispatches", async () => {
    const store = makeStore();
    let finish;
    const waiting = new Promise((resolve) => { finish = resolve; });
    const request = store.dispatch(async (dispatch) => {
      await waiting;
      dispatch({ type: "GET_ADMIN_ORDERS", payload: [{ orderId: 99 }] });
      dispatch({ type: "IS_ERROR", payload: "Previous role request failed" });
    });
    store.dispatch({ type: "SESSION_CHANGED", payload: { id: 3, roles: ["ROLE_USER"] } });
    finish();
    await request;
    expect(store.getState().order.adminOrders).toBeNull();
    expect(store.getState().errors.errorMessage).toBeNull();
  });
});
