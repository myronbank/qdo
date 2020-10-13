import React, { useState, useEffect } from 'react';
// import data from "../data/data.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Slideshow from '../components/slideshow';

const HomeScreen = () => {

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }

    , [])
  // <div className="product-rating">{product.rating} Stars</div>
  return (
    loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :

        <div className="content">
          <Slideshow></Slideshow>
          <ul className="products">
            {
              products.map(product => {
                return <li className="product" key={product._id}>
                  <div className="product__image">
                    <Link to={"/product/" + product._id}><img src={product.image} alt="product"></img></Link>
                  </div>
                  <div className="product__content">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                    <span>${product.price}</span>
                  </div>

                </li>
              })
            }
          </ul>
        </div >
  );
}

export default HomeScreen;


