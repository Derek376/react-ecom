import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";

const orderColBase = {
  disableColumnMenu: true,
  editable: false,
  sortable: false,
  headerAlign: "center",
  align: "center",
  headerClassName: "text-black font-semibold text-center border",
  cellClassName: "text-slate-700 font-normal border text-center",
};

const productColBase = {
  disableColumnMenu: true,
  editable: false,
  sortable: false,
  headerAlign: "center",
  align: "center",
  headerClassName: "text-black font-semibold text-center border",
  cellClassName: "text-slate-700 font-normal border text-center",
};

export const adminOrderTableColumns = (handleEdit) => [
  {
    ...orderColBase,
    field: "id",
    headerName: "orderId",
    minWidth: 100,
    renderHeader: () => <span>Order ID</span>,
  },
  {
    ...orderColBase,
    field: "email",
    headerName: "Email",
    minWidth: 180,
    flex: 1,
    renderHeader: () => <span>Email</span>,
  },
  {
    ...orderColBase,
    field: "totalAmount",
    headerName: "Total Amount",
    minWidth: 120,
    sortable: true,
    renderHeader: () => <span>Total Amount</span>,
  },
  {
    ...orderColBase,
    field: "status",
    headerName: "Status",
    width: 140,
    renderHeader: () => <span>Status</span>,
  },
  {
    ...orderColBase,
    field: "date",
    headerName: "Order Date",
    width: 130,
    renderHeader: () => <span>Order Date</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    align: "center",
    width: 110,
    editable: false,
    sortable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      );
    },
  },
];

export const adminProductTableColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView,
) => [
  {
    ...productColBase,
    field: "id",
    headerName: "productId",
    minWidth: 90,
    renderHeader: () => <span>Product ID</span>,
  },
  {
    ...productColBase,
    field: "productName",
    headerName: "Product Name",
    minWidth: 160,
    flex: 1,
    renderHeader: () => <span>Product Name</span>,
    renderCell: (params) => (
      <span title={params.value} className="truncate block w-full">
        {params.value}
      </span>
    ),
  },
  {
    ...productColBase,
    field: "price",
    headerName: "Price",
    width: 100,
    sortable: true,
    renderHeader: () => <span>Price</span>,
    renderCell: (params) => formatPrice(params.value),
  },
  {
    ...productColBase,
    field: "quantity",
    headerName: "Quantity",
    width: 90,
    renderHeader: () => <span>Qty</span>,
  },
  {
    ...productColBase,
    field: "specialPrice",
    headerName: "Special Price",
    width: 110,
    renderHeader: () => <span>Special</span>,
    renderCell: (params) => formatPrice(params.value),
  },
  {
    ...productColBase,
    field: "description",
    headerName: "Description",
    minWidth: 180,
    flex: 1,
    renderHeader: () => <span>Description</span>,
    renderCell: (params) => (
      <span title={params.value} className="truncate block w-full">
        {params.value}
      </span>
    ),
  },
  {
    ...productColBase,
    field: "image",
    headerName: "Image",
    width: 90,
    renderHeader: () => <span>Image</span>,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt=""
          className="w-12 h-12 object-cover rounded mx-auto"
        />
      ) : null,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    align: "center",
    width: 220,
    editable: false,
    sortable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-1.5 h-full py-1">
          <button
            type="button"
            title="Upload Image"
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-2.5 h-9 rounded-md"
          >
            <FaImage />
          </button>
          <button
            type="button"
            title="Edit"
            onClick={() => handleEdit(params.row)}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-2.5 h-9 rounded-md"
          >
            <FaEdit />
          </button>
          <button
            type="button"
            title="Delete"
            onClick={() => handleDelete(params.row)}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2.5 h-9 rounded-md"
          >
            <FaTrashAlt />
          </button>
          <button
            type="button"
            title="View"
            onClick={() => handleProductView(params.row)}
            className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-2.5 h-9 rounded-md"
          >
            <FaEye />
          </button>
        </div>
      );
    },
  },
];
