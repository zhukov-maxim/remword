import React from 'react';
import ReactFireMixin from 'reactfire';

import {shuffleArray, selectRandomIndexes} from './utils/commonUtils';
import storeWords from './utils/store';

import Spinner from './Spinner';

var Exercise = React.createClass({
  displayName: 'Exercise',

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      store: null,
      words: [],
      answers: [],
      question: null,
      exerciseStarted: false
    };
  },

  componentWillMount: function () {
    this.state.store = storeWords;
    this.bindAsArray(this.state.store, 'words');
    this.state.store.once('value', this.handleDataLoaded);
  },

  componentWillUnmount: function () {
    this.state.store.off('value');
  },

  handleDataLoaded: function () {
    this.startExercise();
  },

  startExercise: function () {
    const wordsNumber = this.state.words.length;
    const answersNumber = 4;

    let answers = selectRandomIndexes(0, wordsNumber - 1, answersNumber);
    let question = shuffleArray(answers)[0];

    this.setState({answers: answers});
    this.setState({question: question});
    this.setState({exerciseStarted: true});
  },

  reshuffleAnswers: function () {
    this.setState({answers: shuffleArray(this.state.answers)});
  },

  validateAnswer: function (i) {
    if (i === this.state.question) {
      const wordIndex = i;
      const key = this.state.words[wordIndex]['.key'];
      const hits = ++this.state.words[wordIndex].hits;

      this.state.store.child(key).update({ hits: hits });
      this.startExercise();
    } else {
      const wordIndex = this.state.question;
      const key = this.state.words[wordIndex]['.key'];
      const misses = ++this.state.words[wordIndex].misses;

      this.state.store.child(key).update({ misses: misses });
      this.reshuffleAnswers();
    }
  },

  render: function () {
    var createAnswerButton = i => {
      return (
        <button
          className='exercise__button'
          key={i}
          onClick={this.validateAnswer.bind(this, i)}
        >
          {this.state.words[i].translation}
        </button>
      );
    };

    var exercise;

    if (!this.state.exerciseStarted) {
      exercise = <Spinner />;
    } else {
      exercise = (
        <div className = 'exercise'>
          <h1 className='exercise__question'>{this.state.words[this.state.question].name}</h1>
          {this.state.answers.map(createAnswerButton)}
        </div>
      );
    }

    return exercise;
  }
});

export default Exercise;
