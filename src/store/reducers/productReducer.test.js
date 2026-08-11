import { describe, expect, it } from "vitest";
import { productReducer } from "./productReducer";

describe("productReducer pagination", () => {
  it("keeps product and category pagination independent", () => {
    const productState = productReducer(undefined, {
      type: "FETCH_PRODUCTS",
      payload: [{ productId: 1 }],
      pageNumber: 1,
      pageSize: 6,
      totalElements: 20,
      totalPages: 4,
      lastPage: false,
    });

    const nextState = productReducer(productState, {
      type: "FETCH_CATEGORIES",
      payload: [{ categoryId: 1 }],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 3,
      totalPages: 1,
      lastPage: true,
    });

    expect(nextState.productPagination).toEqual({
      pageNumber: 1,
      pageSize: 6,
      totalElements: 20,
      totalPages: 4,
      lastPage: false,
    });
    expect(nextState.categoryPagination).toEqual({
      pageNumber: 0,
      pageSize: 10,
      totalElements: 3,
      totalPages: 1,
      lastPage: true,
    });
  });
});
