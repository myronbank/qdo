import axios from "axios";
import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from '../constants/productConstants';
import Cookie from "js-cookie";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({
      type: ADD_TO_CART, payload: {
        _id: data[0]._id,
        name: data[0].name,
        image: data[0].image,
        price: data[0].price,
        countInStock: data[0].countInStock,
        qty
      }
    })

    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

  } catch (error) {
    console.log(error);
  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM, payload: productId
    });

    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

  } catch (error) {

  }
}

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data })
}

const selectPayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data })
}

export { addToCart, removeFromCart, saveShipping, selectPayment }; 