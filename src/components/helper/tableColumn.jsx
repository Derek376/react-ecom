import { FaEdit } from "react-icons/fa";

export const adminOrderTableColumns = [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "orderId",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">Order ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Email</span>,
  },
  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Total Amount</span>,
  },
  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Status</span>,
  },
  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Order Date</span>,
  },
  {
    field: "action",
    headerName: "Action",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center space-x-2 h-full pt-2">
          <button className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md">
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      );
    },
  },
];
