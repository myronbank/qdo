import React, { Component } from 'react';

const TableContent = ({ obj }) => {

  return (
    <tbody>
      {obj.map(o =>
        <tr className="shortlisted-display">
          <td><img src={o.image} alt="image"></img></td>
          <td>{o.name}</td>
          <td>{o.brand}</td>
          <td>{o.category}</td>
          <td>{o.description}</td>
          <td>{o.price}</td>
          <td>{o.countInStock}</td>
        </tr>
      )}
    </tbody>
  )
}

export default TableContent;