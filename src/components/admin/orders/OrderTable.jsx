import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { adminOrderTableColumns } from "../../helper/tableColumn";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

const OrderTable = ({ adminOrders, pagination }) => {
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrders?.map((order) => ({
    id: order.orderId,
    email: order.email,
    totalAmount: order.totalAmount,
    status: order.orderStatus,
    date: order.orderDate,
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    Navigate(`${pathname}?${params}`);
  };

  return (
    <div>
      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        All Orders
      </h1>

      <div>
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={adminOrderTableColumns}
          paginationMode="server"
          rowCount={pagination?.totalElements || 0}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pagination?.pageSize || 10,
                page: currentPage - 1,
              },
            },
          }}
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnClick
          disableColumnResize
          pageSizeOptions={[pagination?.pageSize || 10]}
          paginationOption={{
            showFirstButton: true,
            showLastButton: true,
            hideNextButton: currentPage === pagination?.totalPages,
            hidePrevButton: currentPage === 1,
          }}
        />
      </div>
    </div>
  );
};

export default OrderTable;
