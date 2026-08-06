import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useDashboardTableQuery from "../../../hooks/useDashboardTableQuery";
import { dashboardTableConfigs } from "../../../utils/dashboardTableQuery";
import { adminOrderTableColumns } from "../../helper/tableColumn";
import Modal from "../../shared/Modal";
import TableSortControls from "../../shared/TableSortControls";
import UpdateOrderForm from "./UpdateOrderForm";

const OrderTable = ({ adminOrders, pagination }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const {
    page,
    sortBy,
    sortOrder,
    changePage,
    changeSortBy,
    changeSortOrder,
  } = useDashboardTableQuery(dashboardTableConfigs.orders);

  const tableRecords = adminOrders?.map((order) => ({
    id: order.orderId,
    email: order.email,
    totalAmount: order.totalAmount,
    status: order.orderStatus,
    date: order.orderDate,
  }));

  const handlePaginationChange = (paginationModel) => {
    changePage(paginationModel.page + 1);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  };

  return (
    <div>
      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        All Orders
      </h1>

      <div>
        <TableSortControls
          tableName="orders"
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortOptions={dashboardTableConfigs.orders.sortOptions}
          onSortByChange={changeSortBy}
          onSortOrderChange={changeSortOrder}
        />
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={adminOrderTableColumns(handleEdit)}
          paginationMode="server"
          rowCount={pagination?.totalElements ?? 0}
          paginationModel={{
            pageSize: pagination?.pageSize || 10,
            page: page - 1,
          }}
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnSorting
          pageSizeOptions={[pagination?.pageSize || 10]}
        />
      </div>

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Update Order Status"
      >
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          open={updateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;
