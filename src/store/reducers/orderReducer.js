const initialState = {
  adminOrders: null,
  pagination: {},
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADMIN_ORDERS":
      return {
        ...state,
        adminOrders: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
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
