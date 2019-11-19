import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        count: 0,
        showErrorMsg: false
      };

      // Binds handleClick method to class App.
      // More context: bind creates a new function that will have this set to
      // the first parameter passed to bind.
      this.handleIncrementClick = this.handleIncrementClick.bind(this);
      this.handleDecrementClick = this.handleDecrementClick.bind(this);
  }

  handleIncrementClick() {
    this.setState({count: this.state.count + 1});
    if (this.state.showErrorMsg) {
      this.setState({showErrorMsg: false});
    }
  }

  handleDecrementClick() {
    if (this.state.count > 0) {
      this.setState({count: this.state.count - 1});
    } else {
      this.setState({showErrorMsg: true});
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is {this.state.count}
        </h1>
        {this.state.showErrorMsg
           &&
         <div
          data-test="error-message"
          style={{color: 'red'}}
         >
          Can't decrement if 0!
         </div>}
        <button
          data-test="increment-button"
          onClick={this.handleIncrementClick}
        >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.handleDecrementClick}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
