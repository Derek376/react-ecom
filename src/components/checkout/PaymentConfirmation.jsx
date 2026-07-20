import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { stripePaymentConfirmation } from "../../store/actions";
import Skeleton from "../shared/Skeleton";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : null;

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus === "succeeded" &&
      selectedUserCheckoutAddress?.addressId &&
      cart &&
      cart?.length > 0
    ) {
      setLoading(true);
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast),
      );
    } else if (redirectStatus && redirectStatus !== "succeeded") {
      setErrorMessage("Payment was not completed. Please try again.");
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl mx-auto w-full px-4">
          <Skeleton />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-red-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        <div className="text-green-500 mb-4 flex justify-center">
          <FaCheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your payment was successful, and we are
          processing your order.
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
