import React, { Component } from 'react';
import TableHeader from './tableHeaders';
import TableContent from './tableContent';
import { useState } from "react";

const Table = ({ obj, titles, onClick }) => {

  return (
    <div className="table">
      <table>
        <TableHeader titles={titles} />
        <TableContent obj={obj} onClick={onClick} />
      </table>
    </div>
  );
}

export default Table;