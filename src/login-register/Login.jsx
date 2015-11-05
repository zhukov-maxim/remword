import React from 'react';

import history from '../utils/history';
import firebaseUtils from '../utils/firebaseUtils';

var Login = React.createClass({
  displayName: 'Login',

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var email = this.refs.email.value;
    var pw = this.refs.pw.value;

    firebaseUtils.loginWithPW({email: email, password: pw}, function () {
      if (Login.attemptedTransition) {
        history.replaceState(null, Login.attemptedTransition.location.pathname);
      } else {
        history.replaceState(null, '/');
      }
    });
  },

  render: function () {
    var errors = this.state.error ? <p> Error on Login </p> : '';

    return (
      <div className='login'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input ref='email' placeholder='Email' defaultValue='a@b.com' />
          </div>
          <div>
            <label>Password</label>
            <input ref='pw' type='password' placeholder='Password' defaultValue='123' />
          </div>
          <button type='submit'>Login</button>
          {errors}
        </form>
      </div>
    );
  }
});

export default Login;
