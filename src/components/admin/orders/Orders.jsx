import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import OrderTable from "./OrderTable";

const Orders = () => {
  const adminOrders = [
    {
      orderId: 3,
      email: "user1@example.com",
      orderItems: [
        {
          orderItemId: 3,
          product: {
            productId: 6,
            productName: "Mechanical Gaming Keyboard",
            image: "31383d24-11c1-44dc-80a2-c697ed4ae9aa.svg",
            description:
              "RGB backlit mechanical keyboard with tactile blue switches and anti-ghosting.",
            quantity: 59,
            price: 85.0,
            discount: 10.0,
            specialPrice: 76.5,
          },
          quantity: 1,
          discount: 10.0,
          orderedProductPrice: 76.5,
        },
      ],
      orderDate: "2026-07-07",
      payment: {
        paymentId: 3,
        paymentMethod: "online",
        pgPaymentId: "pi_3TqNHNF8hmmZM6Pe1IG470TL",
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
        pgName: "Stripe",
      },
      totalAmount: 76.5,
      orderStatus: "Order Accepted !",
      addressId: 4,
    },
    {
      orderId: 4,
      email: "user1@example.com",
      orderItems: [
        {
          orderItemId: 4,
          product: {
            productId: 5,
            productName: "Smartwatch Series X",
            image: "467afed2-19d7-4adb-a5e9-b2a7a60fb941.svg",
            description:
              "Water-resistant fitness tracker with heart rate monitoring, GPS, and sleep analysis.",
            quantity: 52,
            price: 199.0,
            discount: 20.0,
            specialPrice: 159.2,
          },
          quantity: 1,
          discount: 20.0,
          orderedProductPrice: 159.2,
        },
      ],
      orderDate: "2026-07-07",
      payment: {
        paymentId: 4,
        paymentMethod: "online",
        pgPaymentId: "pi_3TqNO3F8hmmZM6Pe2poYdgMP",
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
        pgName: "Stripe",
      },
      totalAmount: 159.2,
      orderStatus: "Order Accepted !",
      addressId: 4,
    },
    {
      orderId: 1,
      email: "user1@example.com",
      orderItems: [
        {
          orderItemId: 1,
          product: {
            productId: 5,
            productName: "Smartwatch Series X",
            image: "467afed2-19d7-4adb-a5e9-b2a7a60fb941.svg",
            description:
              "Water-resistant fitness tracker with heart rate monitoring, GPS, and sleep analysis.",
            quantity: 52,
            price: 199.0,
            discount: 20.0,
            specialPrice: 159.2,
          },
          quantity: 11,
          discount: 20.0,
          orderedProductPrice: 159.2,
        },
      ],
      orderDate: "2026-07-07",
      payment: {
        paymentId: 1,
        paymentMethod: "CARD",
        pgPaymentId: "pi_1FHEhK2eZvKYlo2CcK4UJNdW",
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
        pgName: "Stripe",
      },
      totalAmount: 1751.1999999999998,
      orderStatus: "Order Accepted !",
      addressId: 4,
    },
    {
      orderId: 2,
      email: "user1@example.com",
      orderItems: [
        {
          orderItemId: 2,
          product: {
            productId: 5,
            productName: "Smartwatch Series X",
            image: "467afed2-19d7-4adb-a5e9-b2a7a60fb941.svg",
            description:
              "Water-resistant fitness tracker with heart rate monitoring, GPS, and sleep analysis.",
            quantity: 52,
            price: 199.0,
            discount: 20.0,
            specialPrice: 159.2,
          },
          quantity: 11,
          discount: 20.0,
          orderedProductPrice: 159.2,
        },
      ],
      orderDate: "2026-07-07",
      payment: {
        paymentId: 2,
        paymentMethod: "online",
        pgPaymentId: "pi_3TqN7jF8hmmZM6Pe0vTC382R",
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
        pgName: "Stripe",
      },
      totalAmount: 1751.1999999999998,
      orderStatus: "Order Accepted !",
      addressId: 4,
    },
  ];
  const pagination = {
    pageNumber: 0,
    pageSize: 6,
    totalElements: 4,
    totalPages: 1,
    lastPage: true,
  };

  const emptyOrders = !adminOrders || adminOrders.length === 0;

  return (
    <div className="pb-6 pt-20">
      {emptyOrders ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Orders Placed Yet</h2>
        </div>
      ) : (
        <div>
          <OrderTable adminOrders={adminOrders} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default Orders;
