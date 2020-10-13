import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/signInAction";
import CheckOutSteps from "../components/checkoutsteps";
import { selectPayment } from "../actions/cartActions";
import Joi from "joi";


function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const cart = useSelector(state => state.cart);
  const { products, shipping, payment } = cart;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(selectPayment(paymentMethod));
    props.history.push('/placeOrder');
  }

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="form">
        <h3>Payment</h3>
        <form className="form-content payment-form" onSubmit={handleSubmit}>
          <input type="radio" id="payment-method" value="paypal" name="paymentMethod"
            onChange={e => setPaymentMethod(e.target.value)}></input>
          <label htmlFor="payment-method">Paypal</label>
          <button className="button" type="submit">Submit</button>
        </form>
      </div >
    </div>

  )
}

export default PaymentScreen;