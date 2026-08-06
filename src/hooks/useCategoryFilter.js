import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";

import { getAllCategoriesDashboard } from "../store/actions";
import {
  buildDashboardApiQuery,
  dashboardTableConfigs,
} from "../utils/dashboardTableQuery";

const useCategoryFilter = () => {
  const [searchParams] = useSearchParams(); // Access search params from the URL
  const dispatch = useDispatch(); // Get the dispatch function to call actions

  useEffect(() => {
    const queryString = buildDashboardApiQuery(
      searchParams,
      dashboardTableConfigs.categories,
    );

    dispatch(getAllCategoriesDashboard(queryString));
  }, [dispatch, searchParams]);
};

export default useCategoryFilter;
