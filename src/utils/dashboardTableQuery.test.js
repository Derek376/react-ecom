import { describe, expect, it } from "vitest";
import {
  buildDashboardApiQuery,
  dashboardTableConfigs,
  getDashboardTableQuery,
} from "./dashboardTableQuery";

describe("dashboardTableQuery", () => {
  it("uses safe defaults when the URL has no table state", () => {
    expect(
      getDashboardTableQuery("", dashboardTableConfigs.products),
    ).toEqual({
      page: 1,
      sortBy: "productId",
      sortOrder: "asc",
    });
  });

  it("accepts a valid page, sort field, and direction", () => {
    expect(
      getDashboardTableQuery(
        "page=3&sortBy=price&sortOrder=desc",
        dashboardTableConfigs.products,
      ),
    ).toEqual({ page: 3, sortBy: "price", sortOrder: "desc" });
  });

  it("rejects invalid URL values instead of sending them to the API", () => {
    expect(
      getDashboardTableQuery(
        "page=-2&sortBy=password&sortOrder=random",
        dashboardTableConfigs.sellers,
      ),
    ).toEqual({ page: 1, sortBy: "userId", sortOrder: "desc" });
  });

  it("converts the one-based UI page to the zero-based API page", () => {
    const queryString = buildDashboardApiQuery(
      "page=2&sortBy=orderDate&sortOrder=asc",
      dashboardTableConfigs.orders,
    );

    expect(Object.fromEntries(new URLSearchParams(queryString))).toEqual({
      pageNumber: "1",
      sortBy: "orderDate",
      sortOrder: "asc",
    });
  });
});
