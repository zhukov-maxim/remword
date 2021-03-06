import React from 'react';
import ReactFireMixin from 'reactfire';

import firebaseUtils from './utils/firebaseUtils';
import getStore from './utils/store';

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      store: null,
      words: [],
    };
  },

  componentWillMount: function() {
    this.setState({
      store: getStore(firebaseUtils.getUid()),
    }, function() {
      this.bindAsArray(this.state.store, 'words');
    });
  },

  render: function() {
    var userEmail = firebaseUtils.getUserEmail();
    var wordsNumber = this.state.words.length;
    var hits = this.state.words.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue.hits;
    }, 0);

    var misses = this.state.words.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue.misses;
    }, 0);

    return (
      <div className = 'dashboard'>
        <h1 className='dashboard__header'>{'Welcome to the Remword'}</h1>
        <p>
          {'Logged in as: '}<span>{userEmail}</span>
        </p>
        <p>
          {'Words number: '}<span className='dashboard__info'>{wordsNumber}</span>
        </p>
        <p>
          {'Correct answers: '}<span className='dashboard__correct'>{hits}</span>
        </p>
        <p>
          {'Wrong answers: '}<span className='dashboard__wrong'>{misses}</span>
        </p>
      </div>
    );
  },
});

export default Dashboard;
