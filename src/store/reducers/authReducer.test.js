import { describe, expect, it } from "vitest";
import { authReducer } from "./authReducer";

describe("authReducer", () => {
  it("starts with no authenticated user or checkout data", () => {
    expect(authReducer(undefined, { type: "UNKNOWN" })).toEqual({
      user: null,
      address: [],
      clientSecret: null,
      selectedUserCheckoutAddress: null,
    });
  });

  it("stores the logged-in user and removes checkout data from a previous session", () => {
    const state = {
      user: null,
      address: [{ addressId: 1 }],
      clientSecret: "old-secret",
      selectedUserCheckoutAddress: { addressId: 1 },
    };
    const user = { id: 42, username: "derek", roles: ["ROLE_USER"] };

    expect(
      authReducer(state, { type: "LOGIN_USER", payload: user }),
    ).toEqual({
      user,
      address: [],
      clientSecret: null,
      selectedUserCheckoutAddress: null,
    });
  });

  it("selects an address and then clears payment-specific checkout data", () => {
    const selectedAddress = { addressId: 3, city: "Dublin" };
    const state = authReducer(undefined, {
      type: "SELECT_CHECKOUT_ADDRESS",
      payload: selectedAddress,
    });
    const stateWithSecret = authReducer(state, {
      type: "CLIENT_SECRET",
      payload: "payment-secret",
    });

    expect(
      authReducer(stateWithSecret, {
        type: "REMOVE_CLIENT_SECRET_ADDRESS",
      }),
    ).toEqual({
      user: null,
      address: [],
      clientSecret: null,
      selectedUserCheckoutAddress: null,
    });
  });

  it("removes all user and checkout data on logout", () => {
    const state = {
      user: { id: 42 },
      address: [{ addressId: 3 }],
      clientSecret: "payment-secret",
      selectedUserCheckoutAddress: { addressId: 3 },
    };

    expect(authReducer(state, { type: "LOG_OUT" })).toEqual({
      user: null,
      address: [],
      clientSecret: null,
      selectedUserCheckoutAddress: null,
    });
  });
});
