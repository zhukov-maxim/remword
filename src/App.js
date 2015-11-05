import React from 'react';
import NavBar from './NavBar';

var App = React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render: function () {
    return (
      <div>
        <NavBar />
        <hr />
        <div>{this.props.children}</div>
      </div>
    );
  }
});

export default App;
