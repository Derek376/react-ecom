import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const StripePayment = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Stripe Unavailable</AlertTitle>
        Stripe payment is unavailable at the moment. Please select another
        payment method to proceed with your order.
      </Alert>
    </div>
  );
};

export default StripePayment;
