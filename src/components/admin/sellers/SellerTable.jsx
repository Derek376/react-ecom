import { DataGrid } from "@mui/x-data-grid";
import useDashboardTableQuery from "../../../hooks/useDashboardTableQuery";
import { dashboardTableConfigs } from "../../../utils/dashboardTableQuery";
import { sellerTableColumns } from "../../helper/tableColumn";
import TableSortControls from "../../shared/TableSortControls";

const SellerTable = ({ sellers, pagination }) => {
  const {
    page,
    sortBy,
    sortOrder,
    changePage,
    changeSortBy,
    changeSortOrder,
  } = useDashboardTableQuery(dashboardTableConfigs.sellers);

  const tableRecords = sellers?.map((item) => {
    return {
      id: item.userId,
      username: item.userName,
      email: item.email,
    };
  });

  const handlePaginationChange = (paginationModel) => {
    changePage(paginationModel.page + 1);
  };

  return (
    <div>
      <div className="w-full mx-auto">
        <TableSortControls
          tableName="sellers"
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortOptions={dashboardTableConfigs.sellers.sortOptions}
          onSortByChange={changeSortBy}
          onSortOrderChange={changeSortOrder}
        />
        <DataGrid
          className="w-full"
          rows={tableRecords}
          paginationMode="server"
          rowCount={pagination?.totalElements ?? 0}
          columns={sellerTableColumns}
          paginationModel={{
            pageSize: pagination?.pageSize || 10,
            page: page - 1,
          }}
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnSorting
          pagination
          pageSizeOptions={[pagination?.pageSize || 10]}
        />
      </div>
    </div>
  );
};

export default SellerTable;
