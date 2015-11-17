import React from 'react';

import history from '../utils/history';
import firebaseUtils from '../utils/firebaseUtils';

var Register = React.createClass({
  displayName: 'Register',

  handleSubmit: function(e) {
    e.preventDefault();

    var email = this.refs.email.value;
    var pw = this.refs.pw.value;

    firebaseUtils.createUser({email: email, password: pw}, function(result) {
      if (result) {
        history.replaceState(null, '/');
      }
    });
  },

  render: function() {
    return (
      <div className='auth'>
        <h1 className='auth__header'>{'Register'}</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>{'Email:'}</label>
            <input
              placeholder='Email'
              ref='email'
            />
          </div>
          <div>
            <label>{'Password:'}</label>
            <input
              placeholder='Password'
              ref='pw'
              type='password'
            />
          </div>
          <button type='submit'>{'Login'}</button>
        </form>
      </div>
    );
  },
});

export default Register;
