import React from 'react';
import firebaseUtils from '../utils/firebaseUtils';

var Logout = React.createClass({
  displayName: 'Logout',

  componentDidMount: function () {
    firebaseUtils.logout();
  },

  render: function () {
    return (
      <div>
        <h1 className='auth__header'>You are now logged out</h1>
        <p>We hope to see you soon.</p>
      </div>
    );
  }
});

export default Logout;
