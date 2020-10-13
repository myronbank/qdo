import React from 'react'
import Cookie from "js-cookie";

const Logout = (props) => {

  const handleClick = () => {
    Cookie.remove('userInfo');
    window.location = "/";
  }

  return (
    <button className="dropdown__btn" onClick={handleClick}>Logout</button>
  );
}

export default Logout;