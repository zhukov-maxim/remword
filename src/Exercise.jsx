import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';

import Spinner from './Spinner';

var Exercise = React.createClass({
  displayName: 'Exercise',

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      exerciseStarted: false,
      items: [],
      question: null,
      answers: []
    };
  },

  componentWillMount: function () {
    var firebaseRef = new Firebase('https://remword.firebaseio.com/words/');

    this.bindAsArray(firebaseRef, 'items');

    // Fires after all array elements are loaded:
    firebaseRef.on('value', this.handleDataLoaded);
  },

  handleDataLoaded: function () {
    this.startExercise();
  },

  startExercise: function () {
    var answers = [];

    answers[0] = 0;
    answers[1] = 1;
    answers[2] = 2;
    answers[3] = 3;

    this.setState({answers: answers});
    this.setState({question: answers[3]});
    this.setState({exerciseStarted: true});
  },

  validateAnswer: function (i) {
    i === this.state.question ? console.info('Yep!') : console.log('Nope.');
  },

  render: function () {
    var createAnswerButton = i => {
      return (
        <button
          key={i}
          onClick={this.validateAnswer.bind(this, i)}
        >
          {this.state.items[i].translation}
        </button>
      );
    };

    var exercise;

    if (!this.state.exerciseStarted) {
      exercise = <Spinner />;
    } else {
      exercise = (
        <div className = 'exercise'>
          <h3>{'Your question: '}{this.state.items[this.state.question].name}</h3>
          {this.state.answers.map(createAnswerButton)}
        </div>
      );
    }

    return exercise;
  }
});

export default Exercise;
