import React from 'react';
import './Navbar.css';

import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';

const Navbar = () => {
 return (
  <div className='navbar'>
    <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPING</p>
    </div>

  </div>
 )
}

export default Navbar;