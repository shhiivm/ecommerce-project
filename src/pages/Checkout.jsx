import { React, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../style/pages/checkout.css";
import { CheckoutHeader } from "../components/CheckoutHeader";
import dayjs from "dayjs";

import axios from "axios";

export function Checkout({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime"
      )
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  });
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length>0 && cart.map((cartItem) => {

              const selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
                  return deliveryOption.id === cartItem.deliveryOptionId;
              });
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        ₹{(cartItem.product.priceCents * 0.2).toFixed(2)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      {deliveryOptions.map((deliveryOptions) => {
                        let priceString = "Free Shipping";

                        if (deliveryOptions.priceCents > 0) {
                          priceString = `₹${(
                            deliveryOptions.priceCents * 0.2
                          ).toFixed(2)} - Shipping`;
                        }
                        return (
                          <div
                            key={deliveryOptions.id}
                            className="delivery-option"
                          >
                            <input
                              type="radio"
                              checked={
                                deliveryOptions.id === cartItem.deliveryOptionId
                              }
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(
                                  deliveryOptions.estimatedDeliveryTimeMs
                                ).format("dddd,  MMMM D")}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">₹1,800.00</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">₹99.00</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">₹1,899.00</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">₹189.90</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">₹2,088.90</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
