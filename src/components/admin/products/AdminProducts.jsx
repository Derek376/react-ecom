import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDashboardProductFilter } from "../../../hooks/useProductFilter";
import { deleteProductFromDashboard } from "../../../store/actions";
import { adminProductTableColumns } from "../../helper/tableColumn";
import DeleteModal from "../../shared/DeleteModal";
import Loader from "../../shared/Loader";
import Modal from "../../shared/Modal";
import ProductViewModal from "../../shared/ProductViewModal";
import AddProductForm from "./AddProductForm";
import ImageUploadForm from "./ImageUploadForm";

const AdminProducts = () => {
  // const products = [
  //   {
  //     productId: 4,
  //     productName: "Noise Cancelling Headphones",
  //     image:
  //       "http://localhost:8080/images/16dcb07c-4dc8-4fde-906a-63d87b187f5e.svg",
  //     description:
  //       "Wireless over-ear headphones with active noise cancellation and 40-hour battery life.",
  //     quantity: 30,
  //     price: 250.0,
  //     discount: 15.0,
  //     specialPrice: 212.5,
  //   },
  //   {
  //     productId: 5,
  //     productName: "Smartwatch Series X",
  //     image:
  //       "http://localhost:8080/images/467afed2-19d7-4adb-a5e9-b2a7a60fb941.svg",
  //     description:
  //       "Water-resistant fitness tracker with heart rate monitoring, GPS, and sleep analysis.",
  //     quantity: 52,
  //     price: 199.0,
  //     discount: 20.0,
  //     specialPrice: 159.2,
  //   },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 6,
  //   totalElements: 4,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const { products, pagination } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const emptyProducts = !products || products?.length === 0;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);

  useDashboardProductFilter();

  const tableRecords = products?.map((product) => ({
    id: product.productId,
    productName: product.productName,
    image: product.image,
    description: product.description,
    quantity: product.quantity,
    price: product.price,
    discount: product.discount,
    specialPrice: product.specialPrice,
  }));

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handleSortChange = (sortModel) => {
    if (sortModel.length > 0) {
      const { sort } = sortModel[0];
      params.set("sortby", sort);
    } else {
      params.delete("sortby");
    }

    params.set("page", "1");
    setCurrentPage(1);
    navigate(`${pathname}?${params}`);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteProductFromDashboard(
        setLoader,
        selectedProduct.id,
        toast,
        setOpenDeleteModal,
        isAdmin,
      ),
    );
  };

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
          onClick={() => setOpenAddModal(true)}
        >
          <MdAddShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>
      {!emptyProducts && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Products
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProducts ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No products created yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminProductTableColumns(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView,
                )}
                paginationMode="server"
                sortingMode="server"
                onSortModelChange={handleSortChange}
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 6,
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
          )}
        </>
      )}

      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="Update Product"
      >
        <AddProductForm
          setOpen={setOpenUpdateModal}
          product={selectedProduct}
          update={true}
        />
      </Modal>

      <Modal open={openAddModal} setOpen={setOpenAddModal} title="Add Product">
        <AddProductForm setOpen={setOpenAddModal} update={false} />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Upload Product Image"
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
        loader={loader}
      />

      {selectedProduct && (
        <ProductViewModal
          open={openProductViewModal}
          setOpen={setOpenProductViewModal}
          product={selectedProduct}
          isAvailable={
            selectedProduct?.quantity && Number(selectedProduct.quantity) > 0
          }
        />
      )}
    </div>
  );
};

export default AdminProducts;
