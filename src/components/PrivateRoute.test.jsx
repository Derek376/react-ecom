import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import PrivateRoute from "./PrivateRoute";

const regularUser = { id: 1, roles: ["ROLE_USER"] };
const seller = { id: 2, roles: ["ROLE_SELLER"] };
const admin = { id: 3, roles: ["ROLE_ADMIN"] };

function renderGuardedRoute({
  user = null,
  initialPath = "/profile",
  guardedPath = "/profile",
  publicPage = false,
  adminOnly = false,
} = {}) {
  const store = configureStore({
    reducer: {
      auth: (state = { user }) => state,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          {guardedPath === "/login" ? null : (
            <Route path="/login" element={<h1>Login page</h1>} />
          )}
          <Route element={<PrivateRoute {...{ publicPage, adminOnly }} />}>
            <Route path={guardedPath} element={<h1>Guarded page</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe("PrivateRoute", () => {
  it("redirects an anonymous user to login", async () => {
    renderGuardedRoute();

    expect(
      await screen.findByRole("heading", { name: "Login page" }),
    ).toBeInTheDocument();
  });

  it("allows an authenticated user to open a private page", () => {
    renderGuardedRoute({ user: regularUser });

    expect(
      screen.getByRole("heading", { name: "Guarded page" }),
    ).toBeInTheDocument();
  });

  it("redirects an authenticated user away from a public auth page", async () => {
    renderGuardedRoute({
      user: regularUser,
      initialPath: "/login",
      guardedPath: "/login",
      publicPage: true,
    });

    expect(
      await screen.findByRole("heading", { name: "Home page" }),
    ).toBeInTheDocument();
  });

  it("allows a seller to open seller-approved admin pages", () => {
    renderGuardedRoute({
      user: seller,
      initialPath: "/admin/orders",
      guardedPath: "/admin/*",
      adminOnly: true,
    });

    expect(
      screen.getByRole("heading", { name: "Guarded page" }),
    ).toBeInTheDocument();
  });

  it("blocks a seller from admin-only pages", async () => {
    renderGuardedRoute({
      user: seller,
      initialPath: "/admin/categories",
      guardedPath: "/admin/*",
      adminOnly: true,
    });

    expect(
      await screen.findByRole("heading", { name: "Home page" }),
    ).toBeInTheDocument();
  });

  it("blocks a regular user from every admin page", async () => {
    renderGuardedRoute({
      user: regularUser,
      initialPath: "/admin/orders",
      guardedPath: "/admin/*",
      adminOnly: true,
    });

    expect(
      await screen.findByRole("heading", { name: "Home page" }),
    ).toBeInTheDocument();
  });

  it("allows an administrator to open admin-only pages", () => {
    renderGuardedRoute({
      user: admin,
      initialPath: "/admin/categories",
      guardedPath: "/admin/*",
      adminOnly: true,
    });

    expect(
      screen.getByRole("heading", { name: "Guarded page" }),
    ).toBeInTheDocument();
  });
});
