import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';

import firebaseUtils from './utils/firebaseUtils';

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
    var path = 'https://remword.firebaseio.com/users/' + firebaseUtils.getUid() + '/words/';
    var firebaseRef = new Firebase(path);

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

  deleteItem: function (key) {
    var path = 'https://remword.firebaseio.com/users/' + firebaseUtils.getUid() + '/words/';
    var firebaseRef = new Firebase(path);

    firebaseRef.child(key).remove();
  },

  render: function () {
    var createItem = (item, index) => {
      return (
        <li
          className = 'word'
          key = {index}
        >
          {item.name} - {item.translation}
          <button
            className = 'button-remove'
            key = {index}
            onClick = {this.deleteItem.bind(null, item['.key'])}
          >
            &#10006;
          </button>
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
            placeholder = 'Enter translation here...'
            value = {this.state.newWordTranslation}
          />
          <button className='button-full'>{'Add word'}</button>
        </form>
        <ul className='words-list'>
          {this.state.items.map(createItem)}
        </ul>
      </div>
    );
  }
});

export default Words;
