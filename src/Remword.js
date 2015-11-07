import React from 'react';
import { Link } from 'react-router';

import firebaseUtils from './utils/firebaseUtils';

import './Remword.less';

var Remword = React.createClass({
  displayName: 'Remword',

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  getInitialState: function () {
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    };
  },

  handleLogout: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    firebaseUtils.onChange = this.handleLogout;
  },

  render: function () {
    var loginOrOut;

    if (this.state.loggedIn) {
      loginOrOut = <li className='main-menu__item'><Link className='main-menu__link' to='logout'>Logout</Link></li>;
    } else {
      loginOrOut = <li className='main-menu__item'><Link className='main-menu__link' to='login'>Login</Link></li>;
    }

    return (
      <div className='remword'>
        <ul className='main-menu'>
          <li className='main-menu__item'><Link className='main-menu__link' to='/'>Dashboard</Link></li>
          <li className='main-menu__item'><Link className='main-menu__link' to='words'>Words</Link></li>
          <li className='main-menu__item'><Link className='main-menu__link' to='exercise'>Exercise</Link></li>
          {loginOrOut}
        </ul>
        <div className='remword__outlet'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Remword;
