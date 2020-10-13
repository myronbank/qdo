import React from 'react';
import Cookie from "js-cookie";
import { Route, BrowserRouter, Link } from 'react-router-dom';
import HomeScreen from './route/homeScreen';
import ProductScreen from './route/productScreen';
import CartScreen from "./route/cartScreen";
import SignInScreen from "./route/signInScreen";
import { useSelector } from "react-redux";
import RegisterScreen from './route/registerScreen';
import ContactUsScreen from './route/contactUsScreen';
import StockScreen from './route/stockScreen';
import ShippingScreen from './route/shippingScreen';
import PaymentScreen from './route/paymentScreen';
import PlaceOrderScreen from './route/placeOrderScreen';
import Header from './components/header';
import Logout from "./components/logout"
import isLogIn from './util/userLogInStatus';

import './App.css';

function App() {
  // const user = Cookie.getJSON('userInfo') || null;

  const user = isLogIn();

  return (
    <BrowserRouter>
      <div className="container">
        <div className="grid">
          <Header user={user}></Header>
          <nav className="navigation-bar">
            <Link to="/">Qdo Logo</Link>
            <Link to="/">Home</Link>
            <div className="dropdown">
              {user ? <Link to="/profile" className="dropbtn">Welcome back, {user.name} <span>&#x25BC;</span></Link> :
                <Link to="/signin" className="dropbtn">Sign In <span>&#x25BC;</span></Link>
              }
              <div className="dropdown-content">
                <Link className="dropdown__a" to="/stock">Manage Products</Link>
                <Logout user={user} />
              </div>
            </div>
          </nav>
          <main>
            <Route path="/placeOrder" component={PlaceOrderScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/stock" component={StockScreen}></Route>
            <Route path="/contactUs" component={ContactUsScreen}></Route>
            <Route path="/signup" component={RegisterScreen}></Route>
            <Route path="/signin" component={SignInScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/" exact={true} component={HomeScreen}></Route>
          </main>
          <footer>
            <p>All rights reserved.</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>);
}

export default App;
