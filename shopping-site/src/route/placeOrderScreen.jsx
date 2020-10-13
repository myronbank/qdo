import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/signInAction";
import CheckOutSteps from "../components/checkoutsteps";
import { saveShipping, addToCart } from "../actions/cartActions";
import Joi from "joi";


function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const { products, shipping, payment } = cart;
  if (!shipping) {
    props.history.push("/shipping");
  }
  if (!payment) {
    props.history.push('/payment');
  }

  const dispatch = useDispatch();

  const handleCheckout = () => {
    props.history.push('/shipping');
  }

  return (
    <React.Fragment>
      <div>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      </div>
      <div className="placeorder">
        <div className="placeorder-list">
          <div>
            <h3>
              Shipping Info
          </h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalCode},{cart.shipping.country}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
        </div>
        <div className="placeorder-header">
          <h3>Shopping Cart</h3>
          <h6>Price</h6>

          {cart.cartItems.length === 0 ?
            <div>Cart is empty</div>
            : cart.cartItems.map(item => {
              return (
                <div key={item._id} className="cart-details">
                  <div className="cart-details-image">
                    <img src={item.image} /></div>
                  <div className="cart-details-info">
                    <ul>
                      <li>{item.name}</li>
                      <li>
                        Qty: item.qty
                      </li>
                      <li>{item.price}</li>
                    </ul>

                  </div>
                </div>
              )
            })}
        </div>
        <div className="placeorder-action">
          <h4>Subtotal ({cart.cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
          :$ {cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
          </h4>
          <button onClick={handleCheckout} className="button">Check Out</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PlaceOrderScreen;