import { useEffect } from "react";
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../../store/actions";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../shared/Loader";
import ErrorPage from "../shared/ErrorPage";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const { userOrders, userOrdersLoading, userOrdersError } = useSelector(
    (state) => state.order,
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (userOrdersLoading) {
    return <Loader />;
  }

  if (userOrdersError) {
    return <ErrorPage message={userOrdersError} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <FaShoppingCart className="text-slate-700" />
          My Orders
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Orders placed with your account
        </p>
      </div>

      <div className="mb-6">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-custom-blue font-semibold hover:underline"
        >
          <MdArrowBack size={20} />
          Back to profile
        </Link>
      </div>

      {!userOrders || userOrders.length === 0 ? (
        <div className="max-w-lg mx-auto border border-slate-200 rounded-lg bg-white shadow-sm p-10 text-center">
          <FaBoxOpen className="mx-auto text-5xl text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            When you complete a checkout, your orders will show up here.
          </p>
          <Link
            to="/products"
            className="inline-block bg-custom-blue text-white font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.orderId}
              className="border border-slate-200 rounded-lg bg-white shadow-sm p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.orderId}</p>
                  <p className="text-slate-800 font-bold text-lg">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString("en-IE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-custom-blue border border-blue-100">
                  {order.orderStatus || "Unknown"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-slate-700 border-t border-slate-100 pt-4">
                <p>
                  <span className="text-gray-500">Items: </span>
                  <span className="font-semibold">
                    {order.orderItems?.length || 0}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Total: </span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(Number(order.totalAmount || 0))}
                  </span>
                </p>
              </div>

              {order.payment?.paymentMethod && (
                <p className="text-sm text-gray-500 mt-3">
                  Paid with {order.payment.paymentMethod}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
