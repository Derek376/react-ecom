import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import ErrorPage from "../shared/ErrorPage";
import Skeleton from "../shared/Skeleton";
import AddressInfo from "./AddressInfo";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import PaypalPayment from "./PaypalPayment";
import StripePayment from "./StripePayment";

const Checkout = () => {
  const demo = useSelector((state) => state.auth.user?.demo);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );
  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const hasCheckoutAddress = Boolean(selectedUserCheckoutAddress?.addressId);

  const handleNext = () => {
    if (activeStep === 0 && !hasCheckoutAddress) {
      toast.error("Please select an address to proceed.");
      return;
    }
    if (activeStep === 1 && (!hasCheckoutAddress || !paymentMethod)) {
      toast.error("Please select a payment method to proceed.");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)] mb-7">
      {demo && <p className="max-w-3xl mx-auto mb-6 px-4 text-blue-800">Checkout preview: select the fictional address and a payment method to explore the steps. No order or payment will be submitted.</p>}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading && activeStep !== steps.length - 1 ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Skeleton />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && (
            <OrderSummary
              totalPrice={demo ? cart.reduce((sum, item) => sum + Number(item.specialPrice) * Number(item.quantity), 0) : totalPrice}
              cart={cart}
              address={selectedUserCheckoutAddress}
              paymentMethod={paymentMethod}
            />
          )}
          {activeStep === 3 && (
            <>
              {demo ? (
                <div className="max-w-xl mx-auto p-8 text-center rounded-xl bg-blue-50">
                  <h2 className="text-2xl font-bold text-slate-900">Payment preview</h2>
                  <p className="mt-4 text-slate-600">You have reached the end of the checkout demo. Payments and order submission are disabled.</p>
                </div>
              ) : paymentMethod === "Stripe" ? (
                <StripePayment />
              ) : (
                <PaypalPayment />
              )}
            </>
          )}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !hasCheckoutAddress
                : activeStep === 1
                  ? !paymentMethod
                  : false)
            }
            className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white
              ${
                errorMessage ||
                (activeStep === 0 && !hasCheckoutAddress) ||
                (activeStep === 1 && !paymentMethod)
                  ? "opacity-60"
                  : ""
              }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>

      {errorMessage && activeStep !== steps.length - 1 && (
        <ErrorPage message={errorMessage} />
      )}
    </div>
  );
};

export default Checkout;
