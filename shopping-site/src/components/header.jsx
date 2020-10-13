import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../svg/truck.svg'

class Header extends Component {
  state = {}

  constructor(props) {
    super(props);
    this.prevPoints = window.pageYOffset;
    this.ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleHeader)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleHeader)
  }

  toggleHeader = () => {
    const currentPoints = window.pageYOffset;
    if (this.prevPoints > currentPoints) {
      this.ref.current.style.top = "0";
    } else {
      this.ref.current.style.top = "-70px";
    }
    this.prevPoints = currentPoints;
  }

  render() {
    return (
      <header ref={this.ref}>
        <span>Free Shipping on order over $100</span>
        {/* <Link to="/contactUs"> Contact Us </Link> */}
        <Link to="/cart" ><Logo className="icon"></Logo></Link>
      </header>
    );
  }
}

export default Header;