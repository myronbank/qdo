import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteStock, listProducts } from "../actions/productActions";
import { getStockList } from "../service/stockService";
import { useState } from 'react';

const TableContent = ({ obj, onClick, displayAll }) => {
  let productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  const handleDelete = (object) => {
    dispatch(deleteStock(object._id));
  }

  // useEffect(() => {
  //   dispatch(listProducts());
  // })

  return (
    loading ? <td>Loading...</td> :
      error ? <td>{error}</td> :

        <tbody>
          {false && products.map((o, index) =>
            <tr key={index}>
              {/* <tr key={o._id} className={displayAll ? null : "shortlisted-display"}> */}
              <td>
                <button onClick={() => onClick(o)} className="td-button">Edit</button>
                <button onClick={handleDelete(o)} className="td-button">Delete</button>
              </td>
              <td className="image-table"><img src={o.image} alt="image"></img></td>
              <td data-label="id">{o._id}</td>
              <td data-label="name">{o.name}</td>
              <td data-label="category">{o.category}</td>
              <td data-label="countInStock">{o.countInStock}</td>
              <td data-label="price">{o.price}</td>
              <td data-label="brand">{o.brand}</td>
              <td data-label="description">{o.description}</td>
            </tr>
          )}
        </tbody>
  )
}

export default TableContent;