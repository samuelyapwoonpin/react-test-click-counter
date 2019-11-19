import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        count: 0
      };

      // Binds handleClick method to class App.
      // More context: bind creates a new function that will have this set to
      // the first parameter passed to bind.
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is {this.state.count}
        </h1>
        <button
          data-test="increment-button"
          onClick={this.handleClick}
        >
          Increment counter
        </button>
      </div>
    );
  }
}

export default App;
