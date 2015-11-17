import React from 'react';
import { Link } from 'react-router';

import history from '../utils/history';
import firebaseUtils from '../utils/firebaseUtils';

var Login = React.createClass({
  displayName: 'Login',

  statics: {
    attemptedTransition: null,
  },

  getInitialState: function() {
    return {
      error: false,
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var email = this.refs.email.value;
    var pw = this.refs.pw.value;

    firebaseUtils.loginWithPW({email: email, password: pw}, function() {
      if (Login.attemptedTransition) {
        history.replaceState(null, Login.attemptedTransition.location.pathname);
      } else {
        history.replaceState(null, '/');
      }
    });
  },

  render: function() {
    var errors = this.state.error ? <p>{'Error on Login'}</p> : '';

    return (
      <div className='auth'>
        <h1 className='auth__header'>{'Login'}</h1>
        <form className='auth__form' onSubmit={this.handleSubmit}>
          <div>
            <label>{'Email:'}</label>
            <input
              defaultValue='a@b.com'
              placeholder='Email'
              ref='email'
            />
          </div>
          <div>
            <label>{'Password:'}</label>
            <input
              defaultValue='123'
              placeholder='Password'
              ref='pw'
              type='password'
            />
          </div>
          <button className='auth__button' type='submit'>{'Login'}</button>
          {errors}
        </form>
        <p><Link to='Register'>{'Not registered yet?'}</Link></p>
      </div>
    );
  },
});

export default Login;
