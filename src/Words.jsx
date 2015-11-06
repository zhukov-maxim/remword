import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';

var Words = React.createClass({
  displayName: 'Words',

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      items: [],
      newWordName: '',
      newWordTranslation: ''
    };
  },

  componentWillMount: function () {
    var firebaseRef = new Firebase('https://remword.firebaseio.com/words/');

    this.bindAsArray(firebaseRef, 'items');
  },

  onChangeName: function (e) {
    this.setState({newWordName: e.target.value});
  },

  onChangeTranslation: function (e) {
    this.setState({newWordTranslation: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (!this.state.newWordName || this.state.newWordName.trim().length === 0) {
      return;
    }
    if (!this.state.newWordTranslation || this.state.newWordTranslation.trim().length === 0) {
      return;
    }

    this.firebaseRefs['items'].push({
      name: this.state.newWordName,
      translation: this.state.newWordTranslation
    });
    this.setState({
      newWordName: '',
      newWordTranslation: ''
    });
  },

  render: function () {
    var createItem = function (item, index) {
      return (
        <li
          className = 'word'
          key = {index}
        >
          {item.name} {' - '} {item.translation}
        </li>
      );
    };

    return (
      <div className='words'>
        <form onSubmit = {this.handleSubmit}>
          <input
            onChange = {this.onChangeName}
            placeholder = 'Enter new word here...'
            value = {this.state.newWordName}
          />
          <input
            onChange = {this.onChangeTranslation}
            placeholder = 'Enter translation word here...'
            value = {this.state.newWordTranslation}
          />
          <button>{'Add word'}</button>
        </form>
        <hr />
        <ul>{this.state.items.map(createItem)}
        </ul>
      </div>
    );
  }
});

export default Words;
