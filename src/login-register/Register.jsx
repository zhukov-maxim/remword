import React from 'react';

import history from '../utils/history';
import firebaseUtils from '../utils/firebaseUtils';

var Register = React.createClass({
  displayName: 'Register',

  handleSubmit: function (e) {
    e.preventDefault();

    var email = this.refs.email.value;
    var pw = this.refs.pw.value;

    firebaseUtils.createUser({email: email, password: pw}, function (result) {
      if (result) {
        history.replaceState(null, '/');
      }
    });
  },

  render: function () {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input ref='email' placeholder='Email'/>
          </div>
          <div>
            <label>Password</label>
            <input ref='pw' type='password' placeholder='Password' />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
});

export default Register;
