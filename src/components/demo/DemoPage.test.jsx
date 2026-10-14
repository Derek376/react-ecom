import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api, { changeApiSession } from "../../api/api";
import { rootReducer, sessionThunk } from "../../store/reducers/rootReducer";
import DemoPage from "./DemoPage";
import { authenticateSignInUser, logOutUser } from "../../store/actions";

vi.mock("../../api/api", () => ({ default: { get: vi.fn(), post: vi.fn() }, changeApiSession: vi.fn() }));

function showDemo() {
  const store = configureStore({ reducer: rootReducer, middleware: (g) => g({ thunk: false }).concat(sessionThunk) });
  render(<Provider store={store}><MemoryRouter initialEntries={["/demo"]}><Routes>
    <Route path="/demo" element={<DemoPage />} />
    <Route path="/admin" element={<h1>Admin dashboard</h1>} />
    <Route path="/admin/products" element={<h1>Seller products</h1>} />
    <Route path="/profile" element={<h1>Customer profile</h1>} />
  </Routes></MemoryRouter></Provider>);
  return store;
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  api.get.mockResolvedValue({ data: { enabled: true } });
});

describe("demo entry", () => {
  it.each([["Admin", "admin", "Admin dashboard"], ["Seller", "seller", "Seller products"], ["Customer", "customer", "Customer profile"]])("enters as %s and clears old persistence", async (label, role, destination) => {
    const account = { id: 3, username: `demo-${role}`, demo: true, roles: ["ROLE_USER"] };
    api.post.mockResolvedValue({ data: account });
    localStorage.setItem("cartItems", "[{}]");
    localStorage.setItem("CHECKOUT_ADDRESS", "{}");
    const store = showDemo();
    const button = await screen.findByRole("button", { name: `Enter as ${label} →` });
    await vi.waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
    expect(await screen.findByRole("heading", { name: destination })).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith("/auth/demo-login", { role });
    expect(changeApiSession).toHaveBeenCalledWith(account);
    expect(store.getState().auth.user).toEqual(account);
    expect(localStorage.getItem("cartItems")).toBeNull();
    expect(localStorage.getItem("CHECKOUT_ADDRESS")).toBeNull();
  });

  it("shows a failure and permits retry without changing identity", async () => {
    api.post.mockRejectedValue({ response: { data: { message: "Demo temporarily unavailable" } } });
    const store = showDemo();
    const button = await screen.findByRole("button", { name: "Enter as Admin →" });
    await vi.waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
    expect(await screen.findByRole("alert")).toHaveTextContent("Demo temporarily unavailable");
    expect(button).toBeEnabled();
    expect(store.getState().auth.user).toBeNull();
  });

  it("disables entry when the backend disables the demo", async () => {
    api.get.mockResolvedValue({ data: { enabled: false } });
    showDemo();
    expect(await screen.findByRole("status")).toHaveTextContent("currently unavailable");
    expect(screen.getByRole("button", { name: "Enter as Admin →" })).toBeDisabled();
  });
});

it("preserves anonymous shopping through normal login", async () => {
  const store = configureStore({ reducer: rootReducer, middleware: (g) => g({ thunk: false }).concat(sessionThunk) });
  const item = { productId: 1, productName: "Headphones", quantity: 2, specialPrice: 10 };
  store.dispatch({ type: "ADD_CART", payload: item });
  api.post.mockResolvedValue({ data: { id: 4, demo: false, roles: ["ROLE_USER"] } });
  await store.dispatch(authenticateSignInUser({}, { success: vi.fn(), error: vi.fn() }, vi.fn(), vi.fn(), vi.fn()));
  expect(store.getState().carts.cart).toEqual([item]);
});

it("keeps the current identity when server sign-out fails", async () => {
  const store = configureStore({ reducer: rootReducer, middleware: (g) => g({ thunk: false }).concat(sessionThunk) });
  const account = { id: 3, demo: true, roles: ["ROLE_USER"] };
  store.dispatch({ type: "SESSION_CHANGED", payload: account });
  api.post.mockRejectedValue(new Error("Offline"));
  await expect(store.dispatch(logOutUser(vi.fn()))).rejects.toThrow("Offline");
  expect(store.getState().auth.user).toEqual(account);
});
