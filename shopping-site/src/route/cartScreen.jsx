import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productDetailsReducer } from "../reducer/productDetailsReucer";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from "../actions/cartActions";
import Cookie from "js-cookie";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const handelRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const handleCheckout = () => {
    const isAuth = Cookie.getJSON('userInfo');
    isAuth ? props.history.push('/shipping') : props.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
    if (productId)
      dispatch(addToCart(productId, qty));
  }, [])

  return (
    <React.Fragment>
      <div className="cart">
        <div className="cart-list">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <h6>Price</h6>
          </div>
          {cartItems.length === 0 ?
            <div>Cart is empty</div>
            : cartItems.map(item => {
              return (
                <div key={item._id} className="cart-details">
                  <div className="cart-details-image">
                    <img src={item.image} /></div>
                  <div className="cart-details-info">
                    <ul>
                      <li>{item.name}</li>
                      <li>
                        Qty: <select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))} >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </li>
                      <button className="button" onClick={() => handelRemoveCart(item._id)}>Remove item</button>
                      <li>{item.price}</li>
                    </ul>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="cart-action">
          <h4 className="cart-action-item">Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
          :<br />$ {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
          </h4>
          <button onClick={handleCheckout} className="button cart-action-item">Check Out</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartScreen; 