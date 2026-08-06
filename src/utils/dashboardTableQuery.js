const createTableConfig = (defaultSortBy, defaultSortOrder, sortOptions) => ({
  defaultSortBy,
  defaultSortOrder,
  sortOptions,
});

export const dashboardTableConfigs = {
  products: createTableConfig("productId", "asc", [
    { value: "productId", label: "Product ID" },
    { value: "productName", label: "Product name" },
    { value: "price", label: "Price" },
    { value: "quantity", label: "Quantity" },
    { value: "specialPrice", label: "Special price" },
  ]),
  orders: createTableConfig("orderId", "desc", [
    { value: "orderId", label: "Order ID" },
    { value: "totalAmount", label: "Total amount" },
    { value: "orderDate", label: "Order date" },
    { value: "orderStatus", label: "Status" },
  ]),
  categories: createTableConfig("categoryId", "asc", [
    { value: "categoryId", label: "Category ID" },
    { value: "categoryName", label: "Category name" },
  ]),
  sellers: createTableConfig("userId", "desc", [
    { value: "userId", label: "Seller ID" },
    { value: "userName", label: "Username" },
    { value: "email", label: "Email" },
  ]),
};

const getSearchParams = (searchParams) =>
  searchParams instanceof URLSearchParams
    ? searchParams
    : new URLSearchParams(searchParams);

export const getDashboardTableQuery = (searchParams, config) => {
  const params = getSearchParams(searchParams);
  const requestedPage = Number(params.get("page"));
  const requestedSortBy = params.get("sortBy");
  const requestedSortOrder = params.get("sortOrder");
  const allowedSortFields = config.sortOptions.map(({ value }) => value);

  return {
    page:
      Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    sortBy: allowedSortFields.includes(requestedSortBy)
      ? requestedSortBy
      : config.defaultSortBy,
    sortOrder:
      requestedSortOrder === "asc" || requestedSortOrder === "desc"
        ? requestedSortOrder
        : config.defaultSortOrder,
  };
};

export const buildDashboardApiQuery = (searchParams, config) => {
  const { page, sortBy, sortOrder } = getDashboardTableQuery(
    searchParams,
    config,
  );
  const apiParams = new URLSearchParams();

  apiParams.set("pageNumber", String(page - 1));
  apiParams.set("sortBy", sortBy);
  apiParams.set("sortOrder", sortOrder);

  return apiParams.toString();
};
