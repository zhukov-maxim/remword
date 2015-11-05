import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { IndexRoute, Router, Route } from 'react-router';

import App from './App';
import About from './About';
import Dashboard from './Dashboard';
import Exercise from './Exercise';
import Words from './Words';

render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='words' component={Words} />
      <Route path='exercise' component={Exercise} />
      <Route path='about' component={About} />
    </Route>
  </Router>
), document.getElementById('viewport'));
