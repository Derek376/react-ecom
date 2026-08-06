import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { getDashboardTableQuery } from "../utils/dashboardTableQuery";

const useDashboardTableQuery = (config) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tableQuery = getDashboardTableQuery(searchParams, config);

  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        Object.entries(updates).forEach(([key, value]) => {
          nextParams.set(key, String(value));
        });

        return nextParams;
      });
    },
    [setSearchParams],
  );

  const changePage = useCallback(
    (page) => {
      if (page === tableQuery.page) return;

      updateSearchParams({
        page,
        sortBy: tableQuery.sortBy,
        sortOrder: tableQuery.sortOrder,
      });
    },
    [tableQuery.page, tableQuery.sortBy, tableQuery.sortOrder, updateSearchParams],
  );

  const changeSortBy = useCallback(
    (sortBy) => {
      if (sortBy === tableQuery.sortBy) return;

      updateSearchParams({
        page: 1,
        sortBy,
        sortOrder: tableQuery.sortOrder,
      });
    },
    [tableQuery.sortBy, tableQuery.sortOrder, updateSearchParams],
  );

  const changeSortOrder = useCallback(
    (sortOrder) => {
      if (sortOrder === tableQuery.sortOrder) return;

      updateSearchParams({
        page: 1,
        sortBy: tableQuery.sortBy,
        sortOrder,
      });
    },
    [tableQuery.sortBy, tableQuery.sortOrder, updateSearchParams],
  );

  return {
    ...tableQuery,
    changePage,
    changeSortBy,
    changeSortOrder,
  };
};

export default useDashboardTableQuery;
