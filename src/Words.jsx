import React from 'react';
import ReactFireMixin from 'reactfire';

import firebaseUtils from './utils/firebaseUtils';
import getStore from './utils/store';
import { translate } from './utils/translation';

var Words = React.createClass({
  displayName: 'Words',

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      store: null,
      words: [],
      newWordName: '',
      newWordTranslation: '',
      translatedByYandex: false,
    };
  },

  componentWillMount: function() {
    this.state.store = getStore(firebaseUtils.getUid());
    this.bindAsArray(this.state.store, 'words');
  },

  onChangeName: function(e) {
    this.setState({newWordName: e.target.value});
  },

  onChangeTranslation: function(e) {
    this.setState({
      newWordTranslation: e.target.value,
      translatedByYandex: false,
    });
  },

  handleTranslate: function(e) {
    e.preventDefault();

    const word = this.state.newWordName;
    const minimumWordLength = 2;

    if (word && word.length >= minimumWordLength) {
      translate(word, function(data) {
        this.setState({
          newWordTranslation: data,
          translatedByYandex: true,
        });
      }.bind(this));
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (!this.state.newWordName || this.state.newWordName.trim().length === 0) {
      return;
    }

    if (!this.state.newWordTranslation ||
          this.state.newWordTranslation.trim().length === 0) {
      return;
    }

    let currentTime = (new Date()).getTime(); // Firebase does not support Date objects

    this.firebaseRefs.words.push({
      date: currentTime,
      hits: 0,
      misses: 0,
      name: this.state.newWordName,
      translation: this.state.newWordTranslation,
    });
    this.setState({
      newWordName: '',
      newWordTranslation: '',
      translatedByYandex: false,
    });
  },

  deleteItem: function(key) {
    this.state.store.child(key).remove();
  },

  render: function() {
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
          {String.fromCharCode(10006) /* Cross sign */ }
          </button>
        </li>
      );
    };

    var translatedByYandexNotification = (
      <a
        className='words__powered-by'
        href='http://translate.yandex.com/'
      >
        Powered by Yandex.Translate
      </a>
    );

    return (
      <div className='words'>
        <form onSubmit = {this.handleSubmit}>
          <input
            onChange = {this.onChangeName}
            placeholder = 'Enter new word here...'
            value = {this.state.newWordName}
          />
          <button
            className = 'words__button_translate'
            onClick = {this.handleTranslate}
          >
            Translate
          </button>
          <input
            onChange = {this.onChangeTranslation}
            placeholder = 'Enter translation here...'
            value = {this.state.newWordTranslation}
          />
          {
            this.state.translatedByYandex ?
              translatedByYandexNotification :
              false
          }
          <button className='button-full'>Add word</button>
        </form>
        <ul className='words-list'>
          {this.state.words.map(createItem)}
        </ul>
      </div>
    );
  },
});

export default Words;
