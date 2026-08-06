import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { getOrdersForDashboard } from "../store/actions";
import {
  buildDashboardApiQuery,
  dashboardTableConfigs,
} from "../utils/dashboardTableQuery";

const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    const queryString = buildDashboardApiQuery(
      searchParams,
      dashboardTableConfigs.orders,
    );

    dispatch(getOrdersForDashboard(queryString, isAdmin));
  }, [dispatch, isAdmin, searchParams]);
};

export default useOrderFilter;
