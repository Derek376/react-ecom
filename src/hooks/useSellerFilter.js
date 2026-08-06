import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { getAllSellersDashboard } from "../store/actions";
import {
  buildDashboardApiQuery,
  dashboardTableConfigs,
} from "../utils/dashboardTableQuery";

const useSellerFilter = () => {
  const [searchParams] = useSearchParams(); // Access search params from the URL
  const dispatch = useDispatch(); // Get the dispatch function to call actions

  useEffect(() => {
    const queryString = buildDashboardApiQuery(
      searchParams,
      dashboardTableConfigs.sellers,
    );

    dispatch(getAllSellersDashboard(queryString));
  }, [dispatch, searchParams]);
};

export default useSellerFilter;
