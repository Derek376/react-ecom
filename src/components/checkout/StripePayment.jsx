import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStripePaymentSecret } from "../../store/actions";
import Skeleton from "../shared/Skeleton";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const addressId = selectedUserCheckoutAddress?.addressId;
  const attemptedAddressId = useRef(null);
  const [isCreatingSecret, setIsCreatingSecret] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const requestClientSecret = useCallback(async () => {
    if (!addressId || isCreatingSecret) return;

    setIsCreatingSecret(true);
    setRequestError(null);

    const result = await dispatch(
      createStripePaymentSecret({
        addressId,
      }),
    );

    if (!result.ok) {
      setRequestError(result.error);
    }
    setIsCreatingSecret(false);
  }, [addressId, dispatch, isCreatingSecret]);

  useEffect(() => {
    if (
      !clientSecret &&
      addressId &&
      attemptedAddressId.current !== addressId
    ) {
      attemptedAddressId.current = addressId;
      requestClientSecret();
    }
  }, [addressId, clientSecret, requestClientSecret]);

  if (isCreatingSecret) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton />
      </div>
    );
  }

  if (requestError) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-center" role="alert">
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          Payment could not be started
        </h2>
        <p className="mb-6 text-slate-600">{requestError}</p>
        <button
          className="rounded-md bg-custom-blue px-5 py-2 font-semibold text-white disabled:opacity-60"
          disabled={isCreatingSecret}
          onClick={requestClientSecret}
          type="button"
        >
          Retry payment
        </button>
      </div>
    );
  }

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      ) : (
        <p className="py-12 text-center text-slate-600" role="status">
          Preparing payment...
        </p>
      )}
    </>
  );
};

export default StripePayment;
