import React from 'react';
import firebaseUtils from '../utils/firebaseUtils';

var Logout = React.createClass({
  displayName: 'Logout',

  componentDidMount: function () {
    firebaseUtils.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

export default Logout;
