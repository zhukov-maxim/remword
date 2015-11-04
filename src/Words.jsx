import React from 'react';

var Words = React.createClass({
  displayName: 'Words',

  propTypes: {
    items: React.PropTypes.arrayOf(Object).isRequired
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

    return (<ul>{this.props.items.map(createItem)}</ul>);
  }
});

export default Words;
