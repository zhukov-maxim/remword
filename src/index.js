import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';

import history from './utils/history';
import firebaseUtils from './utils/firebaseUtils';

import App from './App';
import About from './About';
import Dashboard from './Dashboard';
import Exercise from './Exercise';
import Words from './Words';

import Login from './login-register/Login';
import Logout from './login-register/Logout';
import Register from './login-register/Register';

function requireAuth(nextState, replaceState) {
  if (!firebaseUtils.isLoggedIn()) {
    Login.attemptedTransition = nextState;
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

function clearAttemptedTransition() {
  Login.attemptedTransition = null;
}

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='words' component={Words} onEnter={requireAuth} />
      <Route path='exercise' component={Exercise} onEnter={requireAuth} />
      <Route path='about' component={About} />
      <Route path='login' component={Login} onLeave={clearAttemptedTransition} />
      <Route path='logout' component={Logout} />
      <Route path='register' component={Register} />
    </Route>
  </Router>
), document.getElementById('viewport'));
