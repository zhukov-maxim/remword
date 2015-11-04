import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';

import Exercise from './Exercise';
import Spinner from './Spinner';
import Words from './Words';

var App = React.createClass({
  displayName: 'App',

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      dataLoaded: false,
      items: [],
      name: '',
      translation: ''
    };
  },

  componentWillMount: function () {
    var firebaseRef = new Firebase('https://remword.firebaseio.com/words/');

    this.bindAsArray(firebaseRef, 'items');

    // Fires after all array elements are loaded:
    firebaseRef.on('value', this.handleDataLoaded);
  },

  onChangeName: function (e) {
    this.setState({name: e.target.value});
  },

  onChangeTranslation: function (e) {
    this.setState({translation: e.target.value});
  },

  handleDataLoaded: function () {
    this.setState({dataLoaded: true});
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (!this.state.name || this.state.name.trim().length === 0) {
      return;
    }
    if (!this.state.translation || this.state.translation.trim().length === 0) {
      return;
    }

    this.firebaseRefs['items'].push({
      name: this.state.name,
      translation: this.state.translation
    });
    this.setState({
      name: '',
      translation: ''
    });
  },

  render: function () {
    var exercise;

    if (!this.state.dataLoaded) {
      exercise = <Spinner />;
    } else {
      exercise = <Exercise className = 'exercise' items = {this.state.items} />;
    }

    return (
      <div>
        {exercise}
        <form onSubmit = {this.handleSubmit}>
          <input
            onChange = {this.onChangeName}
            placeholder = 'Enter new word here...'
            value = {this.state.name}
          />
          <input
            onChange = {this.onChangeTranslation}
            placeholder = 'Enter translation word here...'
            value = {this.state.translation}
          />
          <button>{'Add word'}</button>
        </form>
        <h3>{'Words:'}</h3>
        <Words
          className = 'words'
          items = {this.state.items}
        />
      </div>
    );
  }
});

export default App;
