import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, expect, it, vi } from "vitest";
import api from "../../api/api";
import { rootReducer, sessionThunk } from "../../store/reducers/rootReducer";
import Checkout from "./Checkout";

vi.mock("../../api/api", () => ({ default: { get: vi.fn(), post: vi.fn() }, changeApiSession: vi.fn() }));
vi.mock("./StripePayment", () => ({ default: () => <p>Live Stripe widget</p> }));
vi.mock("./PaypalPayment", () => ({ default: () => <p>Live PayPal widget</p> }));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

it("previews checkout without creating a cart, order or payment", async () => {
  api.get.mockResolvedValue({ data: [{ addressId: 1, buildingName: "Demo House", street: "Example Street", city: "Dublin", country: "Ireland", eirCode: "DEMO1" }] });
  const state = rootReducer(undefined, { type: "LOGIN_USER", payload: { id: 3, demo: true, roles: ["ROLE_USER"] } });
  state.carts.cart = [{ productId: 1, productName: "Demo Headphones", specialPrice: 10, quantity: 2 }];
  const store = configureStore({ reducer: rootReducer, preloadedState: state, middleware: (g) => g({ thunk: false }).concat(sessionThunk) });
  render(<Provider store={store}><Checkout /></Provider>);
  fireEvent.click(await screen.findByText("Demo House"));
  fireEvent.click(screen.getByRole("button", { name: "Proceed" }));
  fireEvent.click(screen.getByRole("radio", { name: "Stripe" }));
  fireEvent.click(screen.getByRole("button", { name: "Proceed" }));
  expect(await screen.findByText("Demo Headphones")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Proceed" }));
  expect(await screen.findByRole("heading", { name: "Payment preview" })).toBeInTheDocument();
  expect(screen.queryByText("Live Stripe widget")).not.toBeInTheDocument();
  expect(api.post).not.toHaveBeenCalled();
});
