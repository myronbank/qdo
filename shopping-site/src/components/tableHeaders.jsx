import React, { Component } from 'react';

const TableHeader = ({ titles, displayAll }) => {
  return (
    <thead>
      <tr className="table-heading">
        {/* <tr className={displayAll ? null : "shortlisted-display"}> */}
        <th></th>
        {titles.map(title => <th key={title}>{title}</th>)}
      </tr>
    </thead>
  );
}

export default TableHeader;