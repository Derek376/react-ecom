import { describe, expect, it } from "vitest";
import { cartReducer } from "./cartReducer";

describe("cartReducer", () => {
  it("returns the initial cart state", () => {
    expect(cartReducer(undefined, { type: "UNKNOWN" })).toEqual({
      cart: [],
      totalPrice: 0,
      cartId: null,
    });
  });

  it("adds a new product without mutating the previous state", () => {
    const state = { cart: [], totalPrice: 0, cartId: null };
    const product = { productId: 10, productName: "Keyboard", quantity: 1 };

    const nextState = cartReducer(state, {
      type: "ADD_CART",
      payload: product,
    });

    expect(nextState.cart).toEqual([product]);
    expect(nextState).not.toBe(state);
    expect(state.cart).toEqual([]);
  });

  it("replaces an existing product instead of creating a duplicate", () => {
    const originalProduct = {
      productId: 10,
      productName: "Keyboard",
      quantity: 1,
    };
    const state = {
      cart: [originalProduct],
      totalPrice: 50,
      cartId: 4,
    };
    const updatedProduct = { ...originalProduct, quantity: 2 };

    const nextState = cartReducer(state, {
      type: "ADD_CART",
      payload: updatedProduct,
    });

    expect(nextState.cart).toEqual([updatedProduct]);
    expect(state.cart).toEqual([originalProduct]);
  });

  it("removes the selected product", () => {
    const state = {
      cart: [{ productId: 10 }, { productId: 20 }],
      totalPrice: 75,
      cartId: 4,
    };

    const nextState = cartReducer(state, {
      type: "REMOVE_CART",
      payload: { productId: 10 },
    });

    expect(nextState.cart).toEqual([{ productId: 20 }]);
  });

  it("stores cart metadata returned by the backend", () => {
    const products = [{ productId: 10, quantity: 2 }];

    const nextState = cartReducer(undefined, {
      type: "GET_USER_CART_PRODUCTS",
      payload: products,
      totalPrice: 99.98,
      cartId: 7,
    });

    expect(nextState).toEqual({
      cart: products,
      totalPrice: 99.98,
      cartId: 7,
    });
  });

  it("clears all cart data", () => {
    const state = {
      cart: [{ productId: 10 }],
      totalPrice: 49.99,
      cartId: 7,
    };

    expect(cartReducer(state, { type: "CLEAR_CART" })).toEqual({
      cart: [],
      totalPrice: 0,
      cartId: null,
    });
  });
});
