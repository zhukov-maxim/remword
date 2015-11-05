import React from 'react';
import { Link } from 'react-router';

var Navbar = React.createClass({
  displayName: 'Navbar',

  render: function () {
    return (
      <ul className = 'navbar'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/words'>Words</Link></li>
        <li><Link to='/exercise'>Exercise</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    );
  }
});

export default Navbar;
