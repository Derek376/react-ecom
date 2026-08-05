const initialState = {
  adminOrders: null,
  pagination: {},
  dashboardOrdersLoading: false,
  dashboardOrdersError: null,
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DASHBOARD_ORDERS_LOADING":
      return {
        ...state,
        dashboardOrdersLoading: true,
        dashboardOrdersError: null,
      };
    case "GET_ADMIN_ORDERS":
      return {
        ...state,
        adminOrders: action.payload,
        dashboardOrdersLoading: false,
        dashboardOrdersError: null,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };
    case "DASHBOARD_ORDERS_ERROR":
      return {
        ...state,
        dashboardOrdersLoading: false,
        dashboardOrdersError: action.payload,
      };
    case "USER_ORDERS_LOADING":
      return {
        ...state,
        userOrdersLoading: true,
        userOrdersError: null,
      };
    case "GET_USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
        userOrdersLoading: false,
        userOrdersError: null,
      };
    case "USER_ORDERS_ERROR":
      return {
        ...state,
        userOrdersLoading: false,
        userOrdersError: action.payload,
      };
    default:
      return state;
  }
};
