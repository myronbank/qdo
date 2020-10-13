import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
      ></input>
      {errors && <div className="error-message">{errors}</div>}
    </React.Fragment>
  )
}

export default Input; 