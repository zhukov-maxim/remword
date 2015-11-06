import React from 'react';
import { Link } from 'react-router';

import firebaseUtils from './utils/firebaseUtils';

var App = React.createClass({
  displayName: 'App',

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
    var loggedIn;
    var loginOrOut;
    var register;

    if (this.state.loggedIn) {
      loggedIn = <div>You are logged in as <strong>{firebaseUtils.getUserEmail()}</strong></div>;
      loginOrOut = <li><Link to='logout'>Logout</Link></li>;
      register = null;
    } else {
      loggedIn = <div><em>You are not logged in yet.</em></div>;
      loginOrOut = <li><Link to='login'>Login</Link></li>;
      register = <li><Link to='register'>Register</Link></li>;
    }

    return (
      <div className='app'>
        {loggedIn}
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='words'>Words</Link></li>
          <li><Link to='exercise'>Exercise</Link></li>
          <li><Link to='about'>About</Link></li>
          {register}
          {loginOrOut}
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
});

export default App;
