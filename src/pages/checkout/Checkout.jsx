import { React, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./checkout.css";
import { CheckoutHeader } from "../../components/CheckoutHeader";
import dayjs from "dayjs";

import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function Checkout({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async ()=>{
      let response = await axios
      .get(
        "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime"
      )
      setDeliveryOptions(response.data);

    response = await axios.get("http://localhost:3000/api/payment-summary")
    setPaymentSummary(response.data);

    }
    fetchCheckoutData();
  }, []);
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
