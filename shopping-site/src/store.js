import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { productListReducer } from "./reducer/productReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { productDetailsReducer } from './reducer/productDetailsReucer';
import { cartReducer } from "./reducer/cartReducer";
import { contactFormReducer } from "./reducer/contactUsReducer";
import { userReducer, registerReducer } from "./reducer/userReducer";
import { productStockReducer } from './reducer/productStockReducer';
import { shippingReducer } from './reducer/shippingReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = { cart: { cartItems }, users: { userInfo }, register: { userInfo } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  users: userReducer,
  register: registerReducer,
  contactForm: contactFormReducer,
  shipping: shippingReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store; 