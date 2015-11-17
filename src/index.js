import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';

import history from './utils/history';
import firebaseUtils from './utils/firebaseUtils';

import Remword from './Remword';
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
    <Route
      component={Remword}
      path='/'
    >
      <IndexRoute
        component={Dashboard}
        onEnter={requireAuth}
      />
      <Route
        component={Words}
        path='words'
        onEnter={requireAuth}
      />
      <Route
        component={Exercise}
        path='exercise'
        onEnter={requireAuth}
      />
      <Route
        component={Login}
        path='login'
        onLeave={clearAttemptedTransition}
      />
      <Route
        component={Logout}
        path='logout'
      />
      <Route
        component={Register}
        path='register'
      />
    </Route>
  </Router>
), document.getElementById('viewport'));
