import React from 'react';

var Exercise = React.createClass({
  displayName: 'Exercise',

  propTypes: {
    items: React.PropTypes.arrayOf(Object).isRequired
  },

  getInitialState: function () {
    return {
      question: null,
      answers: []
    };
  },

  componentWillMount: function () {
    var answers = [];

    answers[0] = 0;
    answers[1] = 1;
    answers[2] = 2;
    answers[3] = 3;

    this.setState({answers: answers});
    this.setState({question: answers[3]});
  },

  validateAnswer: function (i) {
    i === this.state.question ? alert('Yep!') : alert('Nope.');
  },

  render: function () {
    var createAnswerButton = i => {
      return (
        <button
          key={i}
          onClick={this.validateAnswer.bind(this, i)}
        >
          {this.props.items[i].translation}
        </button>
      );
    };

    return (
      <div className = 'exercise'>
        <h3>{'Your question: '}{this.props.items[this.state.question].name}</h3>
        {this.state.answers.map(createAnswerButton)}
      </div>
    );
  }
});

export default Exercise;
