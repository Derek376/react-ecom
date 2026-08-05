import { describe, expect, it } from "vitest";
import { orderReducer } from "./orderReducer";

describe("orderReducer dashboard orders", () => {
  it("starts with dashboard orders not yet loaded", () => {
    expect(orderReducer(undefined, { type: "UNKNOWN" })).toMatchObject({
      adminOrders: null,
      pagination: {},
      dashboardOrdersLoading: false,
      dashboardOrdersError: null,
    });
  });

  it("tracks loading and clears an earlier dashboard error", () => {
    const state = {
      ...orderReducer(undefined, { type: "UNKNOWN" }),
      dashboardOrdersError: "Previous request failed",
    };

    const nextState = orderReducer(state, {
      type: "DASHBOARD_ORDERS_LOADING",
    });

    expect(nextState.dashboardOrdersLoading).toBe(true);
    expect(nextState.dashboardOrdersError).toBeNull();
  });

  it("stores a successful dashboard response and finishes loading", () => {
    const loadingState = orderReducer(undefined, {
      type: "DASHBOARD_ORDERS_LOADING",
    });
    const orders = [{ orderId: 7 }];

    const nextState = orderReducer(loadingState, {
      type: "GET_ADMIN_ORDERS",
      payload: orders,
      pageNumber: 0,
      pageSize: 6,
      totalElements: 1,
      totalPages: 1,
      lastPage: true,
    });

    expect(nextState.adminOrders).toEqual(orders);
    expect(nextState.dashboardOrdersLoading).toBe(false);
    expect(nextState.dashboardOrdersError).toBeNull();
    expect(nextState.pagination).toEqual({
      pageNumber: 0,
      pageSize: 6,
      totalElements: 1,
      totalPages: 1,
      lastPage: true,
    });
  });

  it("stores a dashboard request error and finishes loading", () => {
    const loadingState = orderReducer(undefined, {
      type: "DASHBOARD_ORDERS_LOADING",
    });

    const nextState = orderReducer(loadingState, {
      type: "DASHBOARD_ORDERS_ERROR",
      payload: "Failed to fetch orders data",
    });

    expect(nextState.dashboardOrdersLoading).toBe(false);
    expect(nextState.dashboardOrdersError).toBe(
      "Failed to fetch orders data",
    );
  });
});
